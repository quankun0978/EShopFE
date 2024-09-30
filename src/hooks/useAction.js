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
  isCodeSKU,
  updateProduct,
} from "@/api/apiProduct";
import { cloneDeep } from "lodash";
import { Notification } from "@/components/common/Notification/Notification";
import { useImageUpload } from "@/hooks/useImagrUpload";
import { useLangStore } from "@/store/lang";
import { getText } from "@/constants/lang";
import { generateRandomId, validateNumber } from "@/helpers/Funcs/helper";

import * as options from "@/constants/options";
import { HTTP_STATUS } from "@/api/apiConfig";

const useAction = (action) => {
  const langStore = useLangStore();

  const formState = reactive({
    status: getText("product", langStore.lang, "IN_BUSINESS"),
    codeSKU: "",
    group: "",
    name: "",
    unit: "",
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
  const error = ref("");
  const isValid = ref(true);
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

  // cập nhật giá mua và giá bán khi có thay đổi

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

  // hàm lấy ra các giá trị ban đầu

  const Init = () => {
    useMenuStore().updateHeader({
      namePath: `${getText("product", langStore.lang, "PRODUCT")} / ${getText(
        "shared",
        langStore.lang,
        "EDIT"
      )}`,
    });
    handleGetData();
  };

  // xử lý lấy ra dữ liệu hàng hóa

  const handleGetData = async () => {
    try {
      const res = await getProductByCodeSku(route.params.id);
      if (res.success) {
        const dataAtributes = res.data.atributes;
        const dt = {
          ...res.data.data,
          sell: `${res.data.sell ? res.data.sell : ""}`,
          price: `${res.data.price ? res.data.price : ""}`,
          unit:
            res.data.data.unit === "double"
              ? getText("shared", langStore.lang, "PAIR")
              : getText("shared", langStore.lang, "SINGLE"),
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
    } catch (error) {}
  };

  // xử lý khi người dùng enter ô nhập tên

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

  // xử lý lấy ra danh sách các mã con

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
    }
  };

  // xử lý lấy ra danh sách mã sku

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

  // xử lý khi người dùng enter ô nhập mã sku

  const handlePressEnterCodeSKU = async (e) => {
    e.preventDefault();
    handleGetListCode();
  };

  // xử lý khi tạo ra mã sku mới dựa vào tên

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

  // trở về màn danh sách hàng hóa

  const onClickExit = () => {
    router.push({
      name: "list_product",
    });
  };

  // xử lý cập nhật hàng hóa

  const onFinish = async () => {
    try {
      if (isValid.value) {
        const payload = [...optionAtributes.value].map((item) => {
          return {
            ...item,
            description: formState.description,
            status: formState.status,
            id: item.id ? item.id : -1,
          };
        });
        const res = await updateProduct({
          listSkuUpdate: {
            ...formState,
            products: payload,
            isHide: "Có",
            image: {
              fileName: imageFile.value.name,
              fileData: imageUrl.value.split(",")[1],
            },
          },
          listSKUsDelete: listDelete.value,
        });
        if (res && res.success) {
          Notification.success(
            getText("shared", langStore.lang, "UPDATE_SUCCESS")
          );
          router.push({
            name: "list_product",
          });
        } else {
          Notification.error(
            getText("product", langStore.lang, "CODE_SKU_IS_EXSITS")
          );
        }
      } else {
        Notification.error(error.value);
      }
    } catch (error) {
      if (error.status === HTTP_STATUS.BAD_REQUEST) {
        Notification.error(
          getText("product", langStore.lang, "CODE_SKU_IS_DUPLICATE")
        );
      }
    }
  };

  // xử lý khi có thay đổi checkbox hiển thị

  const handleChangeIsHide = (values) => {
    formState.isHide = values;
  };

  // xử lý khi có thay đổi trạng thái

  const handleChangeStatus = (e) => {
    formState.status = e.target.value;
  };

  // xử lý khi có thay đổi đơn vị

  const handleChangeUnit = (value) => {
    formState.unit = value;
  };

  // xử lý khi có thay đổi màu sắc

  const handleChangeColor = async (values) => {
    if (values && values.length > 0) {
      dataValues.value = values;
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
              barcode: generateRandomId(),
              price: formState.price ? formState.price : "0",
              sell: formState.sell ? formState.sell : "0",
            };
          });
        const listSkus = items.map((item) => item.codeSKU);
        const dt = [...optionAtributes.value];
        if (dt.length > items.length) {
          const codeSKU = dt.find((item) => !listSkus.includes(item.codeSKU));
          const datas = [...listDelete.value];
          datas.push(codeSKU.id);
          listDelete.value = datas;
          const dataUpdate = dt
            .filter((item) => items.some((k) => k.color === item.color))
            .map((item) => {
              return {
                ...item,
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

  // xử lý khi có xóa 1 hàng của bảng thuộc tính

  const handleDeleteRow = (codeSKU) => {
    if (optionAtributes.value && optionAtributes.value.length > 0) {
      const dtDelete = optionAtributes.value.find(
        (item) => item.codeSKU === codeSKU
      );
      const datas = [...listDelete.value];
      datas.push(codeSKU);
      listDelete.value = datas;
      const dt = optionAtributes.value.filter(
        (item) => item.codeSKU !== codeSKU
      );
      const selectedDelete = selectedRowKeys.value.filter(
        (item) => item.value != dtDelete.color
      );
      optionAtributes.value = dt;
      selectedRowKeys.value = selectedDelete;
    } else {
      isDisable.value = false;
    }
  };

  // xử lý khi người dùng ấn vào 1 ô input để chỉnh sửa của bảng thuộc tính

  const handleEdit = (key, columnKey) => {
    columnValue.value = columnKey;
    editableData[key] = cloneDeep(
      optionAtributes.value.filter((item) => key === item.codeSKU)[0]
    );
  };

  // xử lý khi ấn vào nút lưu

  const handleSave = async (key, column, index) => {
    try {
      const codeSKU = editableData[key].codeSKU;
      const codeSKUCurrent = optionAtributes.value.filter(
        (item) => key === item.codeSKU
      )[0].codeSKU;
      if (column === "codeSKU" && codeSKU && codeSKUCurrent != codeSKU) {
        const isCheckCodeSku = await handleCheckIsCodeSku(codeSKU);
        error.value = getText(
          "product",
          langStore.lang,
          "CODE_SKU_IS_DUPLICATE"
        );
        if (!isCheckCodeSku) {
          Notification.error(
            getText("product", langStore.lang, "CODE_SKU_IS_EXSITS")
          );
        } else if (!handleCheckDuplicateCodeSku(key, index)) {
          isValid.value = false;
          error.value = getText(
            "product",
            langStore.lang,
            "CODE_SKU_IS_DUPLICATE"
          );
          Notification.error(
            getText("product", langStore.lang, "CODE_SKU_IS_DUPLICATE")
          );
          return;
        } else {
          isValid.value = true;
          Object.assign(
            optionAtributes.value.filter((item) => key === item.codeSKU)[0],
            editableData[key]
          );
          delete editableData[key];
        }
      } else {
        isValid.value = true;
        Object.assign(
          optionAtributes.value.filter((item) => key === item.codeSKU)[0],
          editableData[key]
        );
        delete editableData[key];
      }
    } catch (error) {
      isValid.value = true;
      Object.assign(
        optionAtributes.value.filter((item) => key === item.codeSKU)[0],
        editableData[key]
      );
      delete editableData[key];
    }
  };

  // kiểm tra xem mã sku đã tồn tại chưa

  const handleCheckIsCodeSku = async (codeSKU) => {
    try {
      const res = await isCodeSKU(codeSKU);
      if (res.success) {
        isValid.value = false;
        error.value = getText("product", langStore.lang, "CODE_SKU_IS_EXSITS");
        return false;
      }
      return true;
    } catch (error) {
      return true;
    }
  };

  // kiểm tra xem có truyền lên 2 mã trùng nhau không

  const handleCheckDuplicateCodeSku = (codeSKU, index) => {
    if (codeSKU) {
      const dataByCodeSku = optionAtributes.value.filter(
        (item) => editableData[codeSKU].codeSKU === item.codeSKU
      );
      if (
        dataByCodeSku.length > 0 &&
        optionAtributes.value[index].codeSKU !== editableData[codeSKU].codeSKU
      )
        return false;
    }
    return true;
  };

  return {
    formState,
    optionAtributes,
    selectedRowKeys,
    onClickExit,
    onFinish,
    handleChangeIsHide,
    handleImageSelected,
    handlePressEnterName,
    handlePressEnterCodeSKU,
    handleChangeUnit,
    handleChangeColor,
    handleDeleteRow,
    handleEdit,
    handleChangeStatus,
    handleSave,
    Action,
    InputForm,
    TableForm,
    SelectForm,
    isDisable,
    RadioForm,
    CheckboxForm,
    UploadForm,
    validateNumber,
    imageFile,
    imageUrl,
    handleImageSelected,
    Form,
    langStore,
    getText,
    form,
    columnValue,
    editableData,
    options,
  };
};

export default useAction;
