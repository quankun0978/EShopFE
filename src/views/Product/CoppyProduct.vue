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
    @finishFailed="onFinishFailed"
  >
    <Action :handle-exit="onClickExit" :handle-save="onClickSave" />
    <div style="padding: 8px; height: 76vh; overflow-y: scroll">
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN CƠ BẢN</p>
        <RadioForm
          :is-disable="isDisable"
          :options="optionsStatus"
          :form-state="formState"
          :on-change="handleChangeStatus"
          :item="{
            label: 'Trạng thái kinh doanh',
            value: 'status',
          }"
        />
        <InputForm
          :rules="[{ required: true, message: 'Vui long nhap vao ten!' }]"
          :item="{
            label: 'Tên hàng hóa',
            value: 'name',
          }"
          v-bind:model-value="formState.name"
          :form-sate="formState"
          :on-input="handleChangeName"
          :is-disable="isDisable"
        />
        <!-- <a-form-item
              label="Name"
              name="name"
              :rules="[{ required: true, message: 'Please input your name!' }]"
            >
              <a-input v-model:value="formState.name" />
            </a-form-item> -->
        <SelectForm
          :item="{
            label: 'Nhóm hàng hóa',
            value: 'group',
          }"
          :style="{ width: 200 }"
          :form-sate="formState"
          :options="optionsGroup"
          :is-disable="isDisable"
        />
        <InputForm
          :item="{
            label: 'Mã SKU',
            value: 'codeSKU',
          }"
          :model-value="formState.codeSKU"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="isDisable"
        />
        <InputForm
          :item="{
            label: 'Giá mua',
            value: 'price',
          }"
          :model-value="formState.price"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="true"
        />
        <InputForm
          :item="{
            label: 'Giá bán',
            value: 'sell',
          }"
          :model-value="formState.sell"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="true"
        />
        <SelectForm
          :-on-change="handleChangeUnit"
          :item="{
            label: 'Đơn vị tính',
            value: 'unit',
          }"
          :style="{ width: 200 }"
          :options="optionsUnit"
          :form-sate="formState"
          :is-disable="isDisable"
        />
        <CheckboxForm
          :item="{
            value: 'isHide',
          }"
          :options="optionsiSHide"
          :form-sate="formState"
          :on-change="handleChangeIsHide"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">
          THÔNG TIN THUỘC TÍNH
        </p>
        <SelectForm
          :is-mode-tag="true"
          :-on-change="handleChangeColor"
          :item="{
            label: 'Thuộc tính',
            value: 'color',
          }"
          :options="selectedRowKeys"
          :value="formState.color"
          :style="{ width: 200 }"
          :form-sate="formState"
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
            label: 'Chi tiết thuộc tính',
            name: 'detail',
          }"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN BỔ SUNG</p>
        <InputForm
          :item="{
            label: 'Mô tả',
            value: 'description',
          }"
          :is-textarea="true"
          :max-length="200"
          :placeholder="'Vui long nhap toi da 200 ky tu'"
          :rows="3"
          :model-value="formState.description"
          :form-sate="formState"
          :style="{ width: 200, height: '150px' }"
        />
        <UploadForm
          :item="{
            label: 'Anh hàng hóa',
            value: 'image',
          }"
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
  createProduct,
  GenerateSKU,
  GetProductByCodeSKU,
  updateProduct,
} from "@/api/product";
import { getInitials } from "@/helpers/Funcs/helper";
import { cloneDeep } from "lodash";
import { Notification } from "@/components/common/Notification/Notification";

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

const optionsiSHide = [{ label: "Hiển thị lên màn hình bán hàng", value: "0" }];

const formState = reactive({
  status: "Đang kinh doanh",
  codeSKU: "",
  group: "Bet xuong",
  name: "",
  unit: "Đôi",
  price: "",
  sell: "",
  isHide: "0",
  type: "",
  managerBy: "",
  color: "",
  description: "",
  barcode: "",
  size: 30,
  isParent: 1,
  imageUrl: "",
});
const optionAtributes = ref([]);
const isDisable = ref(false);
const isDisabledAtribute = ref(false);
const router = useRouter();
const form = Form.useForm(formState);
const selectedRowKeys = ref([]);
const listDelete = ref([]);
const editableData = reactive({});
const columnValue = ref("");
const route = useRoute();
onMounted(() => {
  Init();
});

watchEffect(async () => {
  if (formState.name) {
    formState.codeSKU = await handleGenerateCode(formState.name);
    const dataMap = optionAtributes.value.map((item) => {
      return {
        ...item,
        codeSKU: formState.codeSKU + "-" + getInitials(item.color),
      };
    });
    optionAtributes.value = dataMap;
  }
});

const Init = () => {
  useMenuStore().updateHeader({
    namePath: "Hàng hóa / Nhân bản",
  });
  handleGetData();
};

const handleGetData = async () => {
  try {
    const res = await GetProductByCodeSKU(route.params.id);
    if (res.data.success) {
      // const dt =
      //   res.data.data.data &&
      //   res.data.data.data.length > 0 &&
      //   res.data.data.data.map((item) => {
      //     return {
      //       ...item,
      //       isHide: item.isHide === 0 ? "Khong" : "Co",
      //       price: convertNumber(item.price),
      //       key: item.codeSKU,
      //     };
      //   });
      const dataAtributes = res.data.data.atributes;
      console.log(formState.codeSKU);
      const dataMap = dataAtributes.map((item) => {
        return {
          ...item,
          codeSKU: formState.codeSKU + "-" + getInitials(item.color),
        };
      });
      const dt = {
        ...res.data.data.data,
        unit: res.data.data.data.unit === "double" ? "Đôi" : "Đơn",
      };
      if (dataAtributes && dataAtributes.length > 0) {
        optionAtributes.value = dataMap;
        console.log(optionAtributes.value);
        const dataColor = dataAtributes.map((item) => {
          return {
            value: item.color,
            label: item.color,
          };
        });
        console.log(dataColor);
        selectedRowKeys.value = dataColor;
      }
      Object.assign(formState, dt);
    }
  } catch (e) {
    console.error(e);
  }
};

const onClickExit = () => {
  router.push({
    name: "list_product",
  });
};

const onFinish = async (values) => {
  try {
    if (optionAtributes.value && optionAtributes.value.length > 0) {
      const payload = [...optionAtributes.value, formState].map((item) => {
        return {
          ...item,
          description: formState.description,
        };
      });
      const res = await createProduct(payload);

      if (res && res.data && res.data.success) {
        Notification.success("Thêm mới thành công");
        router.push({
          name: "list_product",
        });
      } else {
        Notification.error("Đã có lỗi xảy ra vui lòng thử lại");
      }
    }
  } catch (error) {
    Notification.error("Đã có lỗi xảy ra vui lòng thử lại");
  }
};

const handleChangeName = (e) => {
  if (formState.name) {
    formState.codeSKU = handleGenerateCode(e.target.value);
  } else {
    formState.codeSKU = "";
  }
};

const handleGenerateCode = async (name) => {
  const res = await GenerateSKU(name);
  if (res.data.success) {
    return res.data.data;
  }
  return "";
};

const handleChangeIsHide = (values) => {
  formState.isHide = values.length > 0 ? "0" : "1";
};

const handleChangeStatus = (e) => {
  formState.status = e.target.value;
};

const handleChangeUnit = (value) => {
  formState.unit = value;
};

const handleChangeColor = async (values) => {
  if (values && values.length > 0) {
    isDisable.value = true;
    selectedRowKeys.value = values.map((item) => {
      return {
        value: item,
        label: item,
      };
    });
    const items = values.map((item) => {
      return {
        ...formState,
        isParent: 0,
        isHide: "0",
        color: item,
        name: formState.name + `(${item})`,
        codeSKU: formState.codeSKU + "-" + getInitials(item),
        price: formState.price ? formState.price : "0",
        sell: formState.sell ? formState.sell : "0",
      };
    });
    console.log(1);
    const dt = [...optionAtributes.value];
    if (dt.length > items.length) {
      const codeSKU = dt.find((item) =>
        items.some((k) => k.codeSKU !== item.codeSKU)
      );
      const datas = [...listDelete.value];
      datas.push(codeSKU.codeSKU);
      listDelete.value = datas;
      console.log(listDelete.value);
      const dataUpdate = dt.filter((item) =>
        items.some((k) => k.codeSKU === item.codeSKU)
      );

      optionAtributes.value = dataUpdate;
      console.log(2);
    } else {
      const index = optionAtributes.value.length === 0 ? 0 : values.length - 1;
      dt.push(items[index]);
      optionAtributes.value = dt;
      console.log(3);
    }
  } else {
    isDisable.value = false;
    selectedRowKeys.value = [];
    optionAtributes.value = [];
    console.log(4);
  }
};

const handleDeleteRow = (codeSKU) => {
  if (optionAtributes.value && optionAtributes.value.length > 0) {
    if (optionAtributes.value.length === 1) {
      isDisable.value = false;
    }
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
    console.log(dtDelete.color);
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
</script>
