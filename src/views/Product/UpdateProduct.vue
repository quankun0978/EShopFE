<template>
  <a-form
    :model="formState"
    name="basic"
    :form="form"
    autocomplete="off"
    :label-col="{
      style: {
        width: '150px',
        textAlign: 'left',
      },
    }"
    :wrapper-col="{ span: 12, xxl: 6 }"
    @finish="onFinish"
  >
    <Action
      :handle-exit="onClickExit"
      :tab-index-save="13"
      :tab-index-exit="14"
    />
    <div style="padding: 8px; height: 80vh; overflow-y: scroll">
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN CƠ BẢN</p>
        <RadioForm
          :is-disable="isDisable"
          :options="optionsStatus"
          :form-state="formState"
          :on-change="handleChangeStatus"
          :item="{
            label: getText('product', langStore.lang, 'business_status'),
            value: 'status',
          }"
        />
        <InputForm
          :rules="[{ required: true, message: 'Vui long nhap vao ten!' }]"
          :item="{
            label: getText('product', langStore.lang, 'name_product'),
            value: 'name',
          }"
          :tab-index="2"
          @press-enter="handlePressEnterName"
          v-bind:model-value="formState.name"
          :form-sate="formState"
          :is-disable="isDisable"
        />
        <SelectForm
          :item="{
            label: getText('product', langStore.lang, 'group_product'),
            value: 'group',
          }"
          :tab-index="3"
          :style="{ width: 200 }"
          :form-sate="formState"
          :options="optionsGroup"
          :is-disable="isDisable"
        />
        <InputForm
          :item="{
            label: getText('product', langStore.lang, 'codeSku'),
            value: 'codeSKU',
          }"
          :model-value="formState.codeSKU"
          @press-enter="handlePressEnterCodeSKU"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="false"
          :tab-index="4"
          :rules="[
            { required: true, message: 'Vui long không bỏ trống ma SKU!' },
          ]"
        />
        <InputForm
          :item="{
            label: getText('shared', langStore.lang, 'price'),
            value: 'price',
          }"
          :model-value="formState.price"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="formState.isParent === 1"
          :tab-index="5"
        />
        <InputForm
          :item="{
            label: getText('shared', langStore.lang, 'sell'),
            value: 'sell',
          }"
          :model-value="formState.sell"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="formState.isParent === 1"
          :tab-index="6"
        />
        <SelectForm
          :-on-change="handleChangeUnit"
          :item="{
            label: getText('shared', langStore.lang, 'unit'),
            value: 'unit',
          }"
          :style="{ width: 200 }"
          :options="optionsUnit"
          :form-sate="formState"
          :is-disable="isDisable"
          :tab-index="7"
        />
        <CheckboxForm
          :item="{
            value: getText('shared', langStore.lang, 'yes'),
          }"
          :options="optionsiSHide"
          :form-sate="formState"
          :on-change="handleChangeIsHide"
          :tab-index="8"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">
          {{ getText("product", langStore.lang, "info_atributes") }}
        </p>
        <SelectForm
          :is-mode-tag="true"
          :-on-change="handleChangeColor"
          :item="{
            label: getText('shared', langStore.lang, 'atributes'),
            value: 'color',
          }"
          :tab-index="9"
          :options="selectedRowKeys"
          :value="formState.color"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disabled-atribute="formState.isParent !== 1"
        />
        <TableForm
          :is-action="true"
          :handle-delete-row="handleDeleteRow"
          :handle-save="handleSave"
          :handle-edit="handleEdit"
          :items="optionAtributes"
          :column-key="columnValue"
          :editable-data="editableData"
          :style="{
            width: '100%',
          }"
          :columns="columns"
          :item="{
            label: getText('product', langStore.lang, 'detail_atributes'),
            name: 'detail',
          }"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN BỔ SUNG</p>
        <InputForm
          :item="{
            label: getText('shared', langStore.lang, 'description'),
            value: 'description',
          }"
          :is-textarea="true"
          :max-length="200"
          :placeholder="'Vui long nhap toi da 200 ky tu'"
          :rows="3"
          :model-value="formState.description"
          :form-sate="formState"
          :style="{ width: 200, height: '150px' }"
          :tab-index="10"
        />
        <UploadForm
          :item="{
            label: getText('product', langStore.lang, 'image_product'),
            value: 'image',
          }"
          :handle-image-selected="handleImageSelected"
          :image-url="imageUrl"
        />
      </div>
    </div>

    <Action :is-first="true" :handle-exit="onClickExit" />
  </a-form>
</template>
<script setup>
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
import { useLangStore } from "@/store/lang";
import { getText } from "@/constants/lang";
const langStore = useLangStore();

const optionsStatus = [
  {
    label: getText("product", langStore.lang, "in_business"),
    value: getText("product", langStore.lang, "in_business"),
  },
  {
    label: getText("product", langStore.lang, "out_business"),
    value: getText("product", langStore.lang, "out_business"),
  },
];

const optionsGroup = [
  {
    label: getText("product", langStore.lang, "boat_platform"),
    value: getText("product", langStore.lang, "boat_platform"),
  },
  {
    label: getText("product", langStore.lang, "household_goods"),
    value: getText("product", langStore.lang, "household_goods"),
  },
];

const optionsUnit = [
  {
    label: getText("shared", langStore.lang, "single"),
    value: getText("shared", langStore.lang, "single"),
  },
  {
    label: getText("shared", langStore.lang, "pair"),
    value: getText("shared", langStore.lang, "pair"),
  },
];

const columns = [
  {
    title: getText("product", langStore.lang, "name_product"),
    dataIndex: "name",
    width: "30%",
    key: "name",
  },
  {
    title: getText("product", langStore.lang, "codeSku"),
    dataIndex: "codeSKU",
    key: "codeSKU",
  },

  {
    title: getText("shared", langStore.lang, "barcode"),
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: getText("shared", langStore.lang, "price"),
    dataIndex: "price",
    key: "price",
  },
  {
    title: getText("shared", langStore.lang, "sell"),
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
  {
    label: getText("product", langStore.lang, "display_on_sales_screen"),
    value: getText("shared", langStore.lang, "yes"),
  },
];

const formState = reactive({
  status: getText("product", langStore.lang, "in_business"),
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

// hàm lấy ra các giá trị ban đầu

const Init = () => {
  useMenuStore().updateHeader({
    namePath: `${getText("product", langStore.lang, "product")} / ${getText(
      "shared",
      langStore.lang,
      "update"
    )}`,
  });
  handleGetData();
};

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

// xử lý lấy ra dữ liệu hàng hóa

const handleGetData = async () => {
  try {
    const res = await getProductByCodeSku(route.params.id);
    if (res.success) {
      const dataAtributes = res.data.atributes;
      const dt = {
        ...res.data.data,
        sell: `${res.data.sell}`,
        price: `${res.data.price}`,
        unit:
          res.data.data.unit === "double"
            ? getText("shared", langStore.lang, "pair")
            : getText("shared", langStore.lang, "single"),
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
    Notification.error(
      getText("shared", langStore.lang, "error_occurred_please_try_again")
    );
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
    if (res && res.success) {
      Notification.success(getText("shared", langStore.lang, "update_success"));
      router.push({
        name: "list_product",
      });
    } else {
      Notification.error(
        getText("product", langStore.lang, "code_sku_is_exsists")
      );
    }
  } catch (error) {
    if (error.status === 400) {
      Notification.error("Mã SKU đã tồn tại");
    } else {
      Notification.error(
        getText("product", langStore.lang, "code_sku_is_exsists")
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

// xử lý khi có xóa 1 hàng của bảng thuộc tính

const handleDeleteRow = (codeSKU) => {
  if (optionAtributes.value && optionAtributes.value.length > 0) {
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

// xử lý khi người dùng ấn vào 1 ô input để chỉnh sửa của bảng thuộc tính

const handleEdit = (key, columnKey) => {
  columnValue.value = columnKey;
  editableData[key] = cloneDeep(
    optionAtributes.value.filter((item) => key === item.codeSKU)[0]
  );
};

// xử lý khi ấn vào nút lưu

const handleSave = (key) => {
  Object.assign(
    optionAtributes.value.filter((item) => key === item.codeSKU)[0],
    editableData[key]
  );
  delete editableData[key];
};
</script>
