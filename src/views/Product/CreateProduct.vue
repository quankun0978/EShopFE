<template>
  <div>
    <a-form
      :model="formState"
      ref="form_create_data"
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
            :options="optionsStatus"
            :form-state="formState"
            :tab-index="1"
            :item="{
              label: getText('product', langStore.lang, 'business_status'),
              value: 'status',
            }"
          />
          <InputForm
            :rules="[
              { required: true, message: 'Vui long không bỏ trống tên!' },
            ]"
            :item="{
              label: getText('product', langStore.lang, 'name_product'),
              value: 'name',
            }"
            :input-ref="inputName"
            v-bind:model-value="formState.name"
            :form-sate="formState"
            @press-enter.prevent="handlePressEnterName"
            :is-disable="isDisable"
            :tab-index="2"
          />
          <SelectForm
            :item="{
              label: getText('product', langStore.lang, 'group_product'),
              value: 'group',
            }"
            :style="{ width: 200 }"
            :form-sate="formState"
            :options="optionsGroup"
            :is-disable="isDisable"
            :tab-index="3"
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
            :is-disable="isDisable"
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
            :is-disable="true"
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
            :is-disable="true"
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
              value: 'isHide',
            }"
            :options="optionsiSHide"
            v-on:change="handleChangeIsHide"
            :form-sate="formState"
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
            :options="selectedRowKeys"
            :value="formState.color"
            :style="{ width: 200 }"
            :form-sate="formState"
            :tab-index="9"
            :is-disabled-atribute="isDisabledAtribute"
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
            :tab-index="10"
          />
        </div>
      </div>

      <Action
        :is-first="true"
        :handle-exit="onClickExit"
        :tab-index-save="11"
        :tab-index-exit="12"
      />
    </a-form>
  </div>
</template>
<script setup>
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
import { getText } from "@/constants/lang";
import { useLangStore } from "@/store/lang";
const langStore = useLangStore();
const inputName = ref(null);

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
  price: "0",
  sell: "0",
  isHide: [],
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

// cập nhật tên dựa trên các thay đổi

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
    formState.sell = `${Math.floor(sell / optionAtributes.value.length)}`;
    formState.price = `${Math.floor(price / optionAtributes.value.length)}`;
  }
});

// hàm lấy ra các giá trị ban đầu

const Init = () => {
  useMenuStore().updateHeader({
    namePath: `${getText("product", langStore.lang, "product")} / ${getText(
      "shared",
      langStore.lang,
      "add"
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
    let payload = [];
    if (optionAtributes.value && optionAtributes.value.length > 0) {
      payload = [...optionAtributes.value].map((item) => {
        if (item.isParent !== 1) {
          return {
            ...item,
            isHide:
              formState.isHide.length > 0
                ? getText("shared", langStore.lang, "yes")
                : getText("shared", langStore.lang, "no"),
            description: formState.description,
          };
        }
        return {
          ...item,
          isHide: getText("shared", langStore.lang, "no"),
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
      isHide: getText("shared", langStore.lang, "yes"),
    });
    if (res && res.success) {
      Notification.success(
        getText("shared", langStore.lang, "add_new_success")
      );
      router.push({
        name: "list_product",
      });
    } else {
      Notification.error(
        getText("shared", langStore.lang, "error_occurred_please_try_again")
      );
    }
  } catch (error) {
    if (error.status === 400) {
      Notification.error("Mã SKU đã tồn tại");
    } else {
      console.log(error);
      Notification.error(
        getText("shared", langStore.lang, "error_occurred_please_try_again")
      );
    }
  }
};

// xử lý khi người dùng enter ô nhập tên

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

// xử lý khi người dùng enter ô nhập mã sku

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

const handleChangeIsHide = (values) => {
  formState.isHide = values;
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
          isHide: getText("shared", langStore.lang, "no"),
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
    const dt = optionAtributes.value.filter((item) => item.codeSKU !== codeSKU);
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

const handleSave = (key) => {
  Object.assign(
    optionAtributes.value.filter((item) => key === item.codeSKU)[0],
    editableData[key]
  );
  delete editableData[key];
};
</script>
