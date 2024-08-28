<template>
  <div>
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
          <!-- <RadioForm
            :options="optionsStatus"
            :item="{
              label: 'Trạng thái kinh doanh',
              value: 'status',
            }"
          /> -->
          <InputForm
            :item="{
              label: 'Tên hàng hóa',
              value: 'name',
            }"
            v-bind:model-value="formState.name"
            :form-sate="formState"
            :on-input="handleChangeName"
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
          />
          <InputForm
            :item="{
              label: 'Mã SKU',
              value: 'codeSKU',
            }"
            :model-value="formState.codeSKU"
            :style="{ width: 200 }"
            :form-sate="formState"
          />
          <InputForm
            :item="{
              label: 'Giá mua',
              value: 'price',
            }"
            :model-value="formState.price"
            :style="{ width: 200 }"
            :form-sate="formState"
          />
          <InputForm
            :item="{
              label: 'Giá bán',
              value: 'sell',
            }"
            :model-value="formState.sell"
            :style="{ width: 200 }"
            :form-sate="formState"
          />
          <SelectForm
            :item="{
              label: 'Đơn vị tính',
              value: 'unit',
            }"
            :style="{ width: 200 }"
            :options="optionsUnit"
            :form-sate="formState"
          />
          <CheckboxForm
            :item="{
              value: 'isHide',
            }"
            :options="optionsiSHide"
            :form-sate="formState"
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
            :value="formState.color"
            :style="{ width: 200 }"
            :form-sate="formState"
          />
          <TableForm
            :items="optionAtributes"
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
  </div>
</template>
<script setup>
import { useMenuStore } from "@/store/menu";
import { onMounted, reactive, ref, toRaw } from "vue";
import Action from "@/components/Action/Action.vue";
import InputForm from "@/components/common/Input/InputForm.vue";
import RadioForm from "@/components/common/Radio/RadioForm.vue";
import SelectForm from "@/components/common/Select/SelectForm.vue";
import CheckboxForm from "@/components/common/checkbox/CheckboxForm.vue";
import TableForm from "@/components/common/Table/TableForm.vue";
import UploadForm from "@/components/common/Upload/UploadForm.vue";
import { useRouter } from "vue-router";
import { Form } from "ant-design-vue";
import { GenerateSKU } from "@/api/product";
import { getInitials } from "@/helpers/Funcs/helper";
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

const optionAtributes = ref();

const router = useRouter();
const form = Form.useForm(formState);

onMounted(() => {
  Init();
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

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const handleChangeName = async (e) => {
  if (formState.name) {
    formState.codeSKU = getInitials(e.target.value);
  } else {
    formState.codeSKU = "";
  }
};

const handleChangeColor = async (values) => {
  console.log(values);
  const items =
    values &&
    values.length > 0 &&
    values.map((item) => {
      return {
        name: formState.name + `(${item})`,
        codeSKU: formState.codeSKU + "-" + getInitials(item),
        price: formState.price,
        sell: formState.sell,
      };
    });
  optionAtributes.value = items;
};
</script>
