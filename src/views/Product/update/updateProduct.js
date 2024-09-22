import { useMenuStore } from "@/store/menu";
import { onMounted, reactive, ref, watchEffect } from "vue";
import Action from "@/components/Action/Action.vue";
import InputForm from "@/components/common/Input/InputForm.vue";
import RadioForm from "@/components/common/Radio/RadioForm.vue";
import SelectForm from "@/components/common/Select/SelectForm.vue";
import CheckboxForm from "@/components/common/checkbox/CheckboxForm.vue";
import TableForm from "@/components/common/Table/TableForm.vue";
import UploadForm from "@/components/common/Upload/UploadForm.vue";
import { useRoute, useRouter } from "vue-router";
import { Form } from "ant-design-vue";
import {
  generateListSKU,
  generateListUpdateSKU,
  generateSKU,
  getProductByCodeSku,
  updateProduct,
} from "@/api/product";
import { cloneDeep } from "lodash";
import { Notification } from "@/components/common/Notification/Notification";
import { useImageUpload } from "@/hooks/useImagrUpload";

const optionsStatus = [
  {
    label: "Đang kinh doanh",
    value: "Đang kinh doanh",
  },
  {
    label: "Ngừng kinh doanh",
    value: "Ngừng kinh doanh",
  },
];

const optionsGroup = [
  {
    label: "Bet xuong",
    value: "Bet xuong",
  },
  {
    label: "Do da dung",
    value: "Do da dung",
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
  price: "",
  sell: "",
  isHide: [],
  type: "",
  managerBy: "",
  color: "",
  description: "",
  barcode: "",
  size: 30,
  isParent: 1,
  imageUrl: "",
  id: null,
});
const optionAtributes = ref([]);
const dataValues = ref([]);
const isDisable = ref(false);
const isDisabledAtribute = ref(false);
const router = useRouter();
const form = Form.useForm(formState);
const selectedRowKeys = ref([]);
const listDelete = ref([]);
const editableData = reactive({});
const columnValue = ref("");
let { imageFile, imageUrl, handleImageSelected } = useImageUpload();
const route = useRoute();
onMounted(() => {
  Init();
});

// watchEffect(() => {
//   if (formState.name) {
//     isDisabledAtribute.value = false;
//   } else {
//     isDisabledAtribute.value = true;
//   }
// });

const Init = () => {
  useMenuStore().updateHeader({
    namePath: "Hàng hóa / Sửa",
  });
  handleGetData();
};

// watchEffect(() => {
//   if (optionAtributes.value.length === 0) {
//     isDisabledAtribute.value = true;
//   } else {
//     isDisabledAtribute.value = false;
//   }
// });

// watchEffect(() => {
//   if (formState.name) {
//     isDisabledAtribute.value = false;
//   } else {
//     isDisabledAtribute.value = true;
//   }
// });

watchEffect(() => {
  if (optionAtributes.value.length > 0) {
    const price = optionAtributes.value.reduce((accumulator, currrent) => {
      return accumulator + +currrent.price;
    }, 0);
    const sell = optionAtributes.value.reduce((accumulator, currrent) => {
      return accumulator + +currrent.sell;
    }, 0);
    formState.sell = `${Math.floor(+sell / optionAtributes.value.length)}`;
    formState.price = `${Math.floor(+price / optionAtributes.value.length)}`;
  }
});

const handleGetData = async () => {
  try {
    const res = await getProductByCodeSku(route.params.id);
    if (res.success) {
      // const dt =
      //   res.data &&
      //   res.data.length > 0 &&
      //   res.data.map((item) => {
      //     return {
      //       ...item,
      //       isHide: item.isHide === 0 ? "Không" : "Có",
      //       price: convertNumber(item.price),
      //       key: item.codeSKU,
      //     };
      //   });
      const dataAtributes = res.data.atributes;
      const dt = {
        ...res.data,
        sell: `${res.data.sell}`,
        price: `${res.data.price}`,
        unit: res.data.unit === "double" ? "Đôi" : "Đơn",
      };
      if (dataAtributes && dataAtributes.length > 0) {
        optionAtributes.value = dataAtributes;
        const dataColor = dataAtributes.map((item) => {
          return {
            value: item.color,
            label: item.color,
          };
        });
        dataValues.value = dataColor.map((item) => item.value);
        selectedRowKeys.value = dataColor;
      }
      Object.assign(formState, dt);
      imageUrl.value = formState.imageUrl;
    }
  } catch (error) {
    Notification.error("Đã có lỗi xảy ra vui lòng thử lại");
  }
};

const handlePressEnterName = async (e) => {
  e.preventDefault();
  if (formState.name) {
    formState.codeSKU = await hanldeGetCode(e.target.value, "", true);
    if (optionAtributes.value.length > 0) {
      handleGetListCodeChild();
    }
  } else {
    formState.codeSKU = "";
  }
};

const handleGetListCode = async () => {
  if (formState.codeSKU) {
    const res = await generateListSKU(formState.codeSKU, dataValues.value);
    if (res.success) {
      const dataCP = [...optionAtributes.value].map((item, index) => {
        return {
          ...item,
          codeSKU: res.data[index],
          name: formState.name + `(${dataValues.value[index]})`,
        };
      });
      optionAtributes.value = dataCP;
    }
  } else {
  }
};

const handlePressEnterCodeSKU = async (e) => {
  e.preventDefault();
  handleGetListCode();
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

const onClickExit = () => {
  router.push({
    name: "list_product",
  });
};

const onFinish = async () => {
  try {
    const payload = [...optionAtributes.value].map((item) => {
      return {
        ...item,
        description: formState.description,
        status: formState.status,
      };
    });

    const res = await updateProduct({
      listSKUsUpdate: {
        ...formState,
        stocks: payload,
        isHide: "Có",
        image: {
          fileName: imageFile.value.name,
          fileData: imageUrl.value.split(",")[1],
        },
      },
      listSKUsDelele: listDelete.value,
    });
    if (res && res.data && res.success) {
      Notification.success("Cập nhật thành công");
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

// const handleChangeName = (e) => {
//   if (formState.name) {
//     formState.codeSKU = getInitials(e.target.value);
//   } else {
//     formState.codeSKU = "";
//   }
// };

const handleChangeIsHide = (values) => {
  formState.isHide = values;
};

const handleChangeStatus = (e) => {
  formState.status = e.target.value;
};

const handleChangeUnit = (value) => {
  formState.unit = value;
};

const handleChangeColor = async (values) => {
  if (values && values.length > 0) {
    dataValues.value = values;
    // isDisable.value = true;
    selectedRowKeys.value = values.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    const res = await generateListUpdateSKU(
      formState.codeSKU,
      values,
      formState.id
    );
    if (res.success) {
      const items =
        res.data &&
        res.data.length > 0 &&
        res.data.map((item, index) => {
          return {
            ...formState,
            isParent: 0,
            isHide: "Không",
            color: values[index],
            name: formState.name + `(${values[index]})`,
            codeSKU: item,
            price: formState.price ? formState.price : "0",
            sell: formState.sell ? formState.sell : "0",
          };
        });
      const listSkus = items.map((item) => item.codeSKU);
      const dt = [...optionAtributes.value];
      if (dt.length > items.length) {
        const codeSKU = dt.find((item) => !listSkus.includes(item.codeSKU));
        const datas = [...listDelete.value];
        datas.push(codeSKU.codeSKU);
        listDelete.value = datas;
        const dataUpdate = dt
          .filter((item) => items.some((k) => k.color === item.color))
          .map((item) => {
            const value = items.find((i) => i.color === item.color);
            return {
              ...item,
              codeSKU: value.codeSKU,
            };
          });

        optionAtributes.value = dataUpdate;
      } else {
        const index =
          optionAtributes.value.length === 0 ? 0 : values.length - 1;
        dt.push({ ...items[index], id: null });
        optionAtributes.value = dt;
      }
    }
  } else {
    isDisable.value = false;
    selectedRowKeys.value = [];
    optionAtributes.value = [];
  }
};

const handleDeleteRow = (codeSKU) => {
  if (optionAtributes.value && optionAtributes.value.length > 0) {
    // if (optionAtributes.value.length === 1) {
    //   isDisable.value = false;
    // }
    const dtDelete = optionAtributes.value.find(
      (item) => item.codeSKU === codeSKU
    );
    const datas = [...listDelete.value];
    datas.push(codeSKU);
    listDelete.value = datas;
    const dt = optionAtributes.value.filter((item) => item.codeSKU !== codeSKU);
    const selectedDelete = selectedRowKeys.value.filter(
      (item) => item.value != dtDelete.color
    );
    optionAtributes.value = dt;
    selectedRowKeys.value = selectedDelete;
  } else {
    isDisable.value = false;
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
