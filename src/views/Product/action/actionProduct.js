import { useMenuStore } from "@/store/menu";
import { onMounted, reactive, ref, watchEffect } from "vue";
import Action from "@/components/Action/Action.vue";
import InputForm from "@/components/common/Input/InputForm.vue";
import RadioForm from "@/components/common/Radio/RadioForm.vue";
import SelectForm from "@/components/common/Select/SelectForm.vue";
import CheckboxForm from "@/components/common/checkbox/CheckboxForm.vue";
import TableForm from "@/components/common/Table/TableForm.vue";
import UploadForm from "@/components/common/Upload/UploadForm.vue";
import { useRouter } from "vue-router";
import { Form } from "ant-design-vue";
import {
  createProduct,
  generateListSKU,
  generateListUpdateSKU,
  generateSKU,
  getProductByCodeSku,
  updateProduct,
} from "@/api/apiProduct";
import { cloneDeep } from "lodash";
import { Notification } from "@/components/common/Notification/Notification";
import { useImageUpload } from "@/hooks/useImagrUpload";
import { convertNumber, convertToNormalNumber } from "@/helpers/Funcs/helper";

import * as options from "@/constants/options";
import { $t } from "@/config/app";
import { productRoute } from "@/router/router";

const actionProduct = ({ action, namePath, route }) => {
  const formState = reactive({
    status: "1",
    codeSKU: "",
    group: "",
    name: "",
    unit: "",
    price: "0",
    sell: "0",
    isHide: true,
    type: "",
    color: "",
    description: "",
    isParent: 1,
    id: null,
    imageBlob: "",
    imageUrl: "",
  });
  const optionAtributes = ref([]);
  const dataValues = ref([]);
  const isDisable = ref(false);
  const isDisabledAtribute = ref(true);
  const isValid = ref(true);
  const router = useRouter();
  const form = Form.useForm(formState);
  const selectedRowKeys = ref([]);
  const listDelete = ref([]);
  const editableData = reactive({});
  const columnValue = ref("");
  const indexCurrent = ref();
  let { imageFile, imageUrl, handleImageSelected, clearImage } =
    useImageUpload();
  onMounted(() => {
    Init();
  });

  watchEffect(() => {
    if (formState.codeSKU) {
      isDisabledAtribute.value = false;
    } else {
      isDisabledAtribute.value = true;
    }
  });

  watchEffect(() => {
    formState.imageUrl = imageUrl.value;
  });

  // hàm lấy ra các giá trị ban đầu

  const Init = () => {
    useMenuStore().updateHeader({
      namePath: `${$t("product.ACTION.PRODUCT")} / ${namePath}`,
    });
    if (action !== productRoute.CREATE_PRODUCT) {
      handleGetData();
    }
  };

  // xử lý lấy ra dữ liệu hàng hóa

  const handleGetData = async () => {
    try {
      const res = await getProductByCodeSku(route.params.id);
      if (res.success) {
        const dataAtributes = res.data.atributes.map((item) => {
          const { imageBlob, ...coppy } = item;
          return { ...coppy, price: `${item.price}`, sell: `${item.sell}` };
        });
        const dt = {
          ...res.data.data,
          sell: convertNumber(`${res.data.data.sell}`),
          price: convertNumber(`${res.data.data.price}`),

          isHide: res.data.data.isHide === 1 ? true : false,
        };

        if (dataAtributes && dataAtributes.length > 0) {
          if (action === productRoute.UPDATE_PRODUCT) {
            optionAtributes.value = dataAtributes;
          }
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
        if (action === "coppy_product") {
          formState.codeSKU = await hanldeGetCode(formState.name, "", true);
          handleGetListCoppy(dataAtributes);
        }
      }
    } catch (error) {}
  };

  // xử lý khi người dùng enter ô nhập tên

  const handlePressEnterName = async (e) => {
    if (action === productRoute.CREATE_PRODUCT) {
      if (formState.name) {
        formState.codeSKU = await hanldeGetCode(e.target.value, "", true);
        if (optionAtributes.value.length > 0) {
          handleGetListCodeChild();
        }
      } else {
        formState.codeSKU = "";
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
            index: index,
            name: formState.name + `(${dataValues.value[index]})`,
            codeSKU: res.data[index],
          };
        });
        optionAtributes.value = dataCP;
      }
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
      name: productRoute.LIST_PRODUCT,
    });
  };

  // xử lý cập nhật hàng hóa

  const onFinish = async () => {
    try {
      if (isValid.value) {
        const payload = [...optionAtributes.value].map((item) => {
          return {
            ...item,
            price: item.price ? +convertToNormalNumber(item.price) : 0,
            type: +formState.type,
            sell: item.sell ? +convertToNormalNumber(item.sell) : 0,
            isHide: formState.isHide === true ? 0 : 1,
            description: formState.description,
            status: action !== productRoute.UPDATE_PRODUCT ? 1 : +formState.status,
            id: item.id ? item.id : -1,
          };
        });
        handlePostData(payload);
      }
    } catch (error) {}
  };

  // xử lý thêm mới hoặc cập nhật sản phẩm

  const handlePostData = async (payload) => {
    if (action === productRoute.UPDATE_PRODUCT) {
      const res = await updateProduct({
        listSkuUpdate: {
          ...formState,
          price: formState.price ? +convertToNormalNumber(formState.price) : 0,
          sell: formState.sell ? +convertToNormalNumber(formState.sell) : 0,
          status: +formState.status,
          type: 1,
          products: payload,
          isHide: formState.isHide ? 1 : 2,
          image: {
            fileName: imageFile.value.name,
            fileData: imageUrl.value.split(",")[1],
          },
        },
        listSKUsDelete: listDelete.value,
      });
      if (res && res.success) {
        Notification.success($t("product.ACTION.UPDATE_SUCCESS"));
        router.push({
          name: productRoute.LIST_PRODUCT,
        });
      }
    } else {
      const { id, imageBlob, ...coppy } = formState;

      const res = await createProduct({
        ...coppy,
        price: formState.price ? +convertToNormalNumber(formState.price) : 0,
        sell: formState.sell ? +convertToNormalNumber(formState.sell) : 0,
        type: 1,
        products: payload,
        status: 1,
        image: {
          fileName: imageFile.value.name,
          fileData: imageUrl.value.split(",")[1],
        },
        color: "null",
        isHide: formState.isHide ? 1 : 0,
      });
      if (res && res.success) {
        Notification.success($t("product.ACTION.ADD_NEW_SUCCESS"));
        router.push({
          name: productRoute.LIST_PRODUCT,
        });
      }
    }
  };

  // xử lý khi có thay đổi checkbox hiển thị

  const handleChangeIsHide = (e) => {
    if (e.target !== undefined) {
      formState.isHide = e.target.checked;
    }
  };

  // xử lý khi có thay đổi trạng thái

  const handleChangeStatus = (e) => {
    formState.status = e.target.value;
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
            index: index,
            isParent: 0,
            isHide: $t("product.ACTION.OTHER"),
            color: dataValues.value[index],
            name: formState.name + `(${dataValues.value[index]})`,
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
        dt.push(items[index]);
        optionAtributes.value = dt;
      }
    }
  };

  // xử lý lấy ra các mã sku khi nhân bản

  const handleGetListCoppy = async (dataAtributes) => {
    const res = await generateListSKU(formState.codeSKU, dataValues.value);
    if (res.success) {
      const items =
        res.data && res.data.length > 0
          ? res.data.map((item, index) => {
              return {
                ...formState,
                isParent: 0,
                isHide: 0,
                color: dataValues.value[index],
                name: formState.name + `(${dataValues.value[index]})`,
                codeSKU: item,
                price: dataAtributes[index].price
                  ? `${dataAtributes[index].price}`
                  : "0",
                sell: dataAtributes[index].sell
                  ? `${dataAtributes[index].sell}`
                  : "0",
              };
            })
          : [];

      const dataUpdate = items.map((item) => {
        const value = items.find((i) => i.color === item.color);
        return {
          ...item,
          codeSKU: value.codeSKU,
          price: `${item.price}`,
        };
      });
      optionAtributes.value = dataUpdate;
    }
  };

  // xử lấy ra các mã code sku sẽ cập nhật

  const handleGetListCodeUpdate = async (values) => {
    const res = await generateListUpdateSKU(
      values,
      formState.id,
      listDelete.value
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
  };

  // xử lý khi có thay đổi màu sắc

  const handleChangeColor = async (values) => {
    selectedRowKeys.value = values;
    formState.price = formState.price ? formState.price : 0;
    formState.sell = formState.sell ? formState.sell : 0;
    if (values && values.length > 0) {
      dataValues.value = values;
      if (action === productRoute.UPDATE_PRODUCT) {
        handleGetListCodeUpdate(values);
      } else {
        handleGetListCode();
      }
    } else {
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
        (item) => item != dtDelete.color
      );
      optionAtributes.value = dt;
      selectedRowKeys.value = selectedDelete;
    } else {
      isDisable.value = false;
    }
  };

  // xử lý khi người dùng ấn vào 1 ô input để chỉnh sửa của bảng thuộc tính

  const handleEdit = (key, columnKey, index) => {
    columnValue.value = columnKey;
    indexCurrent.value = index;
    const dataClone = optionAtributes.value
      .map((item) => {
        return {
          ...item,
          price: convertNumber(item.price),
          sell: convertNumber(item.sell),
        };
      })
      .filter((item) => item.codeSKU === key)[0];
    editableData[key] = cloneDeep(dataClone);
  };

  // xử lý khi ấn vào nút lưu

  const handleSave = async (key, column, index) => {
    const temp = optionAtributes.value
      .map((item) => {
        return {
          ...item,
          price: convertNumber(item.price),
          sell: convertNumber(item.sell),
        };
      })
      .filter((item) => key === item.codeSKU)[0];
    if (
      editableData[key][column] !== null &&
      editableData[key][column] !== ""
    ) {
      isValid.value = true;
      Object.assign(
        optionAtributes.value.filter((item) => key === item.codeSKU)[0],
        editableData[key]
      );
      delete editableData[key];
    } else {
      isValid.value = true;
      Object.assign(
        optionAtributes.value.filter(
          (item) => key === item.codeSKU && index === indexCurrent.value
        )[0],
        temp
      );
      delete editableData[key];
    }
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
    imageFile,
    imageUrl,
    handleImageSelected,
    Form,
    form,
    columnValue,
    indexCurrent,
    editableData,
    options,
    clearImage,
  };
};

export default actionProduct;
