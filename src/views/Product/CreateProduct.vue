<template>
  <div>
    <Action />
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      :label-col="{
        style: {
          width: '150px',
          textAlign: 'left',
        },
      }"
      :wrapper-col="{ span: 6 }"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      style="padding: 8px; height: 76vh; overflow-y: scroll"
    >
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN CƠ BẢN</p>
        <RadioForm
          :value="formState.status"
          :options="optionsStatus"
          :item="{
            label: 'Trạng thái kinh doanh',
            value: 'status',
          }"
        />
        <InputForm
          :item="{
            label: 'Tên hàng hóa',
            value: 'name',
          }"
          :value="formState.name"
          :style="{ width: 200 }"
        />
        <SelectForm
          :item="{
            label: 'Nhóm hàng hóa',
            value: 'group',
          }"
          :value="formState.group"
          :style="{ width: 200 }"
          :options="optionsGroup"
        />
        <InputForm
          :item="{
            label: 'Mã SKU',
            value: 'codeSKU',
          }"
          :value="formState.codeSKU"
          :style="{ width: 200 }"
        />
        <InputForm
          :item="{
            label: 'Giá mua',
            value: 'price',
          }"
          :value="formState.price"
          :style="{ width: 200 }"
        />
        <InputForm
          :item="{
            label: 'Giá bán',
            value: 'sell',
          }"
          :value="formState.sell"
          :style="{ width: 200 }"
        />
        <SelectForm
          :item="{
            label: 'Đơn vị tính',
            value: 'unit',
          }"
          :value="formState.unit"
          :style="{ width: 200 }"
          :options="optionsUnit"
        />
        <CheckboxForm
          :item="{
            value: 'isHide',
          }"
          :value="formState.isHide"
          :options="optionsiSHide"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">
          THÔNG TIN THUỘC TÍNH
        </p>
        <SelectForm
          :is-mode-tag="true"
          :item="{
            label: 'Thuộc tính',
            value: 'color',
          }"
          :value="formState.color"
          :style="{ width: 200 }"
        />
        <TableForm
          :style="{
            width: '100%',
          }"
          :columns="columns"
          888888
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
          :value="formState.description"
          :style="{ width: 200, height: '150px' }"
        />
        <UploadForm
          :item="{
            label: 'Anh hàng hóa',
            value: 'image',
          }"
        />
      </div>
    </a-form>
    <Action :is-first="true" />
  </div>
</template>
<script setup>
import { useMenuStore } from "@/store/menu";
import { onMounted, reactive } from "vue";
import Action from "@/components/Action/Action.vue";
import InputForm from "@/components/common/Input/InputForm.vue";
import RadioForm from "@/components/common/Radio/RadioForm.vue";
import SelectForm from "@/components/common/Select/SelectForm.vue";
import CheckboxForm from "@/components/common/checkbox/CheckboxForm.vue";
import TableForm from "@/components/common/Table/TableForm.vue";
import UploadForm from "@/components/common/Upload/UploadForm.vue";
const optionsStatus = [
  {
    label: "Đang kinh doanh",
    value: "progress",
  },
  {
    label: "Ngừng kinh doanh",
    value: "stop",
  },
];

const optionsGroup = [
  {
    label: "Bet xuong",
    value: "bet",
  },
  {
    label: "Bet xuong",
    value: "stop",
  },
];

const optionsUnit = [
  {
    label: "Đơn",
    value: "first",
  },
  {
    label: "Đôi",
    value: "double",
  },
];

const columns = [
  {
    title: "Tên hàng hóa",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Mã SKU",
    dataIndex: "codeSKU",
  },

  {
    title: "Mã vạch",
    dataIndex: "unit",
  },
  {
    title: "Giá mua",
    dataIndex: "price",
  },
  {
    title: "Giá bán",
    dataIndex: "sell",
  },
  {
    title: "",
    dataIndex: "action",
  },
];

const optionsiSHide = [
  { label: "Hiển thị lên màn hình bán hàng", value: "show" },
];

const formState = reactive({
  status: "progress",
  codeSKU: "",
  group: "bet",
  name: "",
  unit: "double",
  price: "",
  sell: "",
  isHide: "",
  type: "",
  managerBy: "",
  color: "",
  description: "",
  image: "",
});

onMounted(() => {
  Init();
});

const Init = () => {
  useMenuStore().updateHeader({
    namePath: "Hàng hóa / Thêm mới",
  });
};

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
</script>
