import { useMenuStore } from "@/store/menu";
import { onMounted, reactive, ref, watchEffect } from "vue";

import { useRouter } from "vue-router";
import { Form } from "ant-design-vue";
import {
  createProduct,
  generateListSKU,
  generateSKU,
  isCodeSKU,
} from "@/api/apiProduct";
import { cloneDeep } from "lodash";
import { Notification } from "@/components/common/Notification/Notification";
import { useImageUpload } from "@/hooks/useImagrUpload";
import Action from "@/components/Action/Action.vue";
import InputForm from "@/components/common/Input/InputForm.vue";
import RadioForm from "@/components/common/Radio/RadioForm.vue";
import SelectForm from "@/components/common/Select/SelectForm.vue";
import CheckboxForm from "@/components/common/checkbox/CheckboxForm.vue";
import TableForm from "@/components/common/Table/TableForm.vue";
import UploadForm from "@/components/common/Upload/UploadForm.vue";
import { getText } from "@/constants/lang";
import { useLangStore } from "@/store/lang";
import { generateRandomId, validateNumber } from "@/helpers/Funcs/helper";
import * as options from "@/constants/options";
import { HTTP_STATUS } from "@/api/apiConfig";
import { $t } from "@/config/app";
const CreateProduct = () => {
  const langStore = useLangStore();

  const formState = reactive({
    status: $t("product.CREATE.IN_BUSINESS"),
    codeSKU: "",
    group: "",
    name: "",
    unit: "",
    price: "",
    sell: "",
    isHide: false,
    type: "",
    managerBy: "",
    color: "",
    description: "",
    barcode: "",
    isParent: 1,
    imageUrl: "",
  });

  const optionAtributes = ref([]);
  const isDisable = ref(false);
  const error = ref("");
  const indexCurrent = ref(0);
  const isValid = ref(true);
  const isDisabledAtribute = ref(true);
  const inputName = ref(null);
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

  // cập nhật tên dựa trên các thay đổi

  watchEffect(() => {
    if (formState.codeSKU) {
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
      formState.sell = `${Math.floor(sell / optionAtributes.value.length)}`;
      formState.price = `${Math.floor(price / optionAtributes.value.length)}`;
    }
  });

  // hàm lấy ra các giá trị ban đầu

  const Init = () => {
    useMenuStore().updateHeader({
      namePath: `${$t("product.COPPY.PRODUCT")} / ${getText(
        "shared",
        langStore.lang,
        "ADD"
      )}`,
    });
  };

  // trở về màn danh sách hàng hóa

  const onClickExit = () => {
    router.push({
      name: "list_product",
    });
  };

  // xử lý thêm mới hàng hóa

  const onFinish = async () => {
    try {
      if (isValid.value) {
        let payload = [];
        if (optionAtributes.value && optionAtributes.value.length > 0) {
          payload = [...optionAtributes.value].map((item) => {
            if (item.isParent !== 1) {
              return {
                ...item,
                isHide:
                  formState.isHide === true
                    ? $t("product.CREATE.NO")
                    : $t("product.CREATE.YES"),
                description: formState.description,
              };
            }
            return {
              ...item,
              isHide: $t("product.CREATE.NO"),
              description: formState.description,
            };
          });
        }
        const res = await createProduct({
          ...formState,
          products: payload,
          image: {
            fileName: imageFile.value.name,
            fileData: imageUrl.value.split(",")[1],
          },
          color: "null",
          isHide:
            formState.isHide.length > 0
              ? $t("product.CREATE.YES")
              : $t("product.CREATE.NO"),
        });
        if (res && res.success) {
          Notification.success(
            getText("shared", langStore.lang, "ADD_NEW_SUCCESS")
          );
          router.push({
            name: "list_product",
          });
        } else {
          Notification.error($t("product.LIST.ERROR_OCCURRED_TRY_AGAIN"));
        }
      } else {
        Notification.error(error.value);
      }
    } catch (error) {
      if (error.status === HTTP_STATUS.BAD_REQUEST) {
        Notification.error($t("product.CREATE.CODE_SKU_IS_EXSITS"));
      }
      if (error.status === HTTP_STATUS.CONFLIC_REQUEST) {
        Notification.error($t("product.CREATE.CODE_SKU_IS_DUPLICATE"));
      }
    }
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

  // xử lý khi người dùng enter ô nhập mã sku

  const handlePressEnterCodeSKU = async (e) => {
    e.preventDefault();
    await handleGetListCode1();
  };

  const handleGetListCode1 = async () => {
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

  // xử lý khi có thay đổi checkbox hiển thị

  const handleChangeIsHide = (e) => {
    formState.isHide = e.target.checked;
  };

  // xử lý khi có thay đổi đơn vị

  const handleChangeUnit = (value) => {
    formState.unit = value;
  };

  // xử lý lấy ra danh sách mã sku

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
            isHide: $t("product.CREATE.NO"),
            color: dataValues.value[index],
            name: formState.name + `(${dataValues.value[index]})`,
            barcode: generateRandomId(),
            codeSKU: item,
            price: formState.price ? `${formState.price}` : "0",
            sell: formState.sell ? `${formState.sell}` : "0",
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
        indexCurrent.value = index;

        dt.push(items[index]);
        optionAtributes.value = dt;
      }
    }
  };

  // xử lý khi có thay đổi màu sắc

  const handleChangeColor = async (values) => {
    selectedRowKeys.value = values;
    if (values && values.length > 0) {
      dataValues.value = values;
      handleGetListCode();
    } else {
      optionAtributes.value = [];
    }
  };

  // xử lý khi có xóa 1 hàng của bảng thuộc tính

  const handleDeleteRow = (codeSKU) => {
    if (optionAtributes.value && optionAtributes.value.length > 0) {
      if (optionAtributes.value.length === 1) {
      }
      const dtDelete = optionAtributes.value.find(
        (item) => item.codeSKU === codeSKU
      );
      const dt = optionAtributes.value.filter(
        (item) => item.codeSKU !== codeSKU
      );
      const selectedDelete = selectedRowKeys.value.filter(
        (item) => item != dtDelete.color
      );
      optionAtributes.value = dt;
      selectedRowKeys.value = selectedDelete;
    } else {
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
      if (
        editableData[key][column] !== null &&
        editableData[key][column] !== ""
      ) {
        const codeSKU = editableData[key].codeSKU;
        const codeSKUCurrent = optionAtributes.value.filter(
          (item) => key === item.codeSKU
        )[0].codeSKU;

        if (column === "codeSKU" && codeSKU && codeSKUCurrent != codeSKU) {
          const isCheckCodeSku = await handleCheckIsCodeSku(codeSKU);
          error.value = $t("product.CREATE.CODE_SKU_IS_DUPLICATE");
          if (!isCheckCodeSku) {
            Notification.error($t("product.CREATE.CODE_SKU_IS_EXSITS"));
          } else if (!handleCheckDuplicateCodeSku(key, index)) {
            isValid.value = false;
            error.value = getText(
              "product",
              langStore.lang,
              "CODE_SKU_IS_DUPLICATE"
            );
            Notification.error($t("product.CREATE.CODE_SKU_IS_DUPLICATE"));
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
      } else {
        isValid.value = false;
        error.value = $t("product.CREATE.ERROR_REQUIRED");
        Notification.error($t("product.CREATE.ERROR_REQUIRED"));
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
        error.value = $t("product.CREATE.CODE_SKU_IS_EXSITS");
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
    isDisabledAtribute,
    getText,
    form,
    inputName,
    columnValue,
    editableData,
    options,
  };
};

export default CreateProduct;
