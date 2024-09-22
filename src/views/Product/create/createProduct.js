import { useMenuStore } from "@/store/menu";
import { onMounted, reactive, ref, toRaw, watch, watchEffect } from "vue";
import Action from "@/components/Action/Action.vue";
import InputForm from "@/components/common/Input/InputForm.vue";
import RadioForm from "@/components/common/Radio/RadioForm.vue";
import SelectForm from "@/components/common/Select/SelectForm.vue";
import CheckboxForm from "@/components/common/checkbox/CheckboxForm.vue";
import TableForm from "@/components/common/Table/TableForm.vue";
import { useRouter } from "vue-router";
import { Form } from "ant-design-vue";
import { createProduct, generateListSKU, generateSKU } from "@/api/product";
import { cloneDeep } from "lodash";
import { Notification } from "@/components/common/Notification/Notification";
import { useImageUpload } from "@/hooks/useImagrUpload";
import UploadForm from "@/components/common/Upload/UploadForm.vue";
const inputName = ref(null);

const optionsStatus = [
  {
    label: "Đang kinh doanh",
    value: "Đang kinh doanh",
    index: 14,
  },
  {
    label: "Ngừng kinh doanh",
    value: "Ngừng kinh doanh",
    index: 15,
  },
];

const optionsGroup = [
  {
    label: "Bet xuong",
    value: "Bet xuong",
  },
  {
    label: "Do gia dung",
    value: "Do gia dung",
  },
];

const optionsUnit = [
  {
    label: "Đơn",
    value: "Đơn",
  },
  {
    label: "Đôi",
    value: "Đôi",
  },
];

const columns = [
  {
    title: "Tên hàng hóa",
    dataIndex: "name",
    width: "30%",
    key: "name",
  },
  {
    title: "Mã SKU",
    dataIndex: "codeSKU",
    key: "codeSKU",
  },

  {
    title: "Mã vạch",
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: "Giá mua",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Giá bán",
    dataIndex: "sell",
    key: "sell",
  },

  {
    title: "",
    dataIndex: "action",
    key: "action",
  },
];

const optionsiSHide = [
  { label: "Hiển thị lên màn hình bán hàng", value: "Có" },
];

const formState = reactive({
  status: "Đang kinh doanh",
  codeSKU: "",
  group: "Bet xuong",
  name: "",
  unit: "Đôi",
  price: "0",
  sell: "0",
  isHide: [],
  type: "Hàng hóa",
  managerBy: "khác",
  color: "",
  description: "",
  barcode: "",
  isParent: 1,
  imageUrl: "",
});

const optionAtributes = ref([]);
const isDisable = ref(false);
const isDisabledAtribute = ref(true);
const router = useRouter();
const form = Form.useForm(formState);
const selectedRowKeys = ref([]);
const editableData = reactive({});
const columnValue = ref("");
let { imageFile, imageUrl, handleImageSelected } = useImageUpload();
const dataValues = ref([]);
onMounted(() => {
  Init();
});

watchEffect(() => {
  if (formState.name) {
    isDisabledAtribute.value = false;
  } else {
    isDisabledAtribute.value = true;
  }
});

watchEffect(() => {
  if (optionAtributes.value.length > 0) {
    const price = optionAtributes.value.reduce((accumulator, currrent) => {
      return accumulator + +currrent.price;
    }, 0);
    const sell = optionAtributes.value.reduce((accumulator, currrent) => {
      return accumulator + +currrent.sell;
    }, 0);
    formState.sell = Math.floor(sell / optionAtributes.value.length);
    formState.price = Math.floor(price / optionAtributes.value.length);
  }
});

const Init = () => {
  useMenuStore().updateHeader({
    namePath: "Hàng hóa / Thêm mới",
  });
};

const onClickExit = () => {
  router.push({
    name: "list_product",
  });
};

const onFinish = async () => {
  try {
    let payload = [];
    if (optionAtributes.value && optionAtributes.value.length > 0) {
      payload = [...optionAtributes.value].map((item) => {
        if (item.isParent !== 1) {
          return {
            ...item,
            isHide: formState.isHide.length > 0 ? "Có" : "Không",
            description: formState.description,
          };
        }
        return {
          ...item,
          isHide: "Không",
          description: formState.description,
        };
      });
    }
    const res = await createProduct({
      ...formState,
      stocks: payload,
      image: {
        fileName: imageFile.value.name,
        fileData: imageUrl.value.split(",")[1],
      },
      color: "null",
      isHide: "Có",
    });
    if (res && res.data && res.success) {
      Notification.success("Thêm mới thành công");
      router.push({
        name: "list_product",
      });
    } else {
      Notification.error("Đã có lỗi xảy ra vui lòng thử lại");
    }
  } catch (error) {
    if (error.status === 400) {
      Notification.error("Mã SKU đã tồn tại");
    } else {
      Notification.error("Đã có lỗi xảy ra vui lòng thử lại");
    }
  }
};
const onFinishFailed = (errorInfo) => {};

const handlePressEnterName = async (e) => {
  e.preventDefault();
  if (formState.name) {
    formState.codeSKU = await hanldeGetCode(e.target.value, "", true);
    // handleGetListCode();
    if (optionAtributes.value.length > 0) {
      handleGetListCodeChild();
    }
  } else {
    formState.codeSKU = "";
  }
};

const handlePressEnterCodeSKU = async (e) => {
  e.preventDefault();
  if (formState.codeSKU) {
    const res = await generateListSKU(formState.codeSKU, dataValues.value);
    if (res.success) {
      const dataCP = [...optionAtributes.value].map((item, index) => {
        return {
          ...item,
          codeSKU: res.data[index],
        };
      });
      optionAtributes.value = dataCP;
    }
  } else {
  }
};

const handleGetListCodeChild = async () => {
  if (formState.codeSKU) {
    const res = await generateListSKU(formState.codeSKU, dataValues.value);
    if (res.success) {
      const dataCP = [...optionAtributes.value].map((item, index) => {
        return {
          ...item,
          name: formState.name + `(${dataValues.value[index]})`,
          codeSKU: res.data[index],
        };
      });
      optionAtributes.value = dataCP;
    }
  } else {
  }
};

const hanldeGetCode = async (name) => {
  if (name) {
    const res = await generateSKU(name);
    if (res.success) {
      return res.data;
    }
    return name;
  }
  return name;
};

const handleChangeIsHide = (values) => {
  formState.isHide = values;
};

const handleChangeUnit = (value) => {
  formState.unit = value;
};
const handleGetListCode = async () => {
  const res = await generateListSKU(formState.codeSKU, dataValues.value);

  if (res.success) {
    const items =
      res.data &&
      res.data.length > 0 &&
      res.data.map((item, index) => {
        return {
          ...formState,
          isParent: 0,
          isHide: "Không",
          color: dataValues.value[index],
          name: formState.name + `(${dataValues.value[index]})`,
          codeSKU: item,
          price: formState.price ? formState.price : "0",
          sell: formState.sell ? formState.sell : "0",
        };
      });
    const dt = [...optionAtributes.value];
    if (dt.length > items.length) {
      const dataUpdate = dt
        .filter((item) => items.some((k) => k.color === item.color))
        .map((item) => {
          const value = items.find((i) => i.color === item.color);
          return {
            ...item,
            codeSKU: value.codeSKU,
            price: `${item.price}`,
          };
        });

      optionAtributes.value = dataUpdate;
    } else {
      const index =
        optionAtributes.value.length === 0 ? 0 : dataValues.value.length - 1;
      dt.push(items[index]);
      optionAtributes.value = dt;
    }
  }
};

const handleChangeColor = async (values) => {
  selectedRowKeys.value = values;
  if (values && values.length > 0) {
    dataValues.value = values;
    handleGetListCode();
  } else {
    optionAtributes.value = [];
  }
};

const handleDeleteRow = (codeSKU) => {
  if (optionAtributes.value && optionAtributes.value.length > 0) {
    if (optionAtributes.value.length === 1) {
    }
    const dtDelete = optionAtributes.value.find(
      (item) => item.codeSKU === codeSKU
    );
    const dt = optionAtributes.value.filter((item) => item.codeSKU !== codeSKU);
    const selectedDelete = selectedRowKeys.value.filter(
      (item) => item != dtDelete.color
    );
    optionAtributes.value = dt;
    selectedRowKeys.value = selectedDelete;
  } else {
  }
};

const handleEdit = (key, columnKey) => {
  columnValue.value = columnKey;
  editableData[key] = cloneDeep(
    optionAtributes.value.filter((item) => key === item.codeSKU)[0]
  );
};

const handleSave = (key) => {
  Object.assign(
    optionAtributes.value.filter((item) => key === item.codeSKU)[0],
    editableData[key]
  );
  delete editableData[key];
};
