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
      @finishFailed="onFinishFailed"
    >
      <Action :handle-exit="onClickExit" />
      <div style="padding: 8px; height: 76vh; overflow-y: scroll">
        <div>
          <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN CƠ BẢN</p>
          <RadioForm
            :options="optionsStatus"
            :form-state="formState"
            :item="{
              label: 'Trạng thái kinh doanh',
              value: 'status',
            }"
          />
          <InputForm
            :rules="[
              { required: true, message: 'Vui long khong bo trong ten!' },
            ]"
            :item="{
              label: 'Tên hàng hóa',
              value: 'name',
            }"
            v-bind:model-value="formState.name"
            :form-sate="formState"
            @press-enter.prevent="handlePressEnterName"
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
            @press-enter="handlePressEnterCodeSKU"
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
            v-on:change="handleChangeIsHide"
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
            :handle-image-selected="handleImageSelected"
            :image-url="imageUrl"
          />
          <!-- <div class="flex justify-center items-center">
            <label
              for="image-upload"
              class="flex justify-center items-center gap-1 p-2"
              style="
                border: 1px solid #d9d9d9;
                border-radius: 8px;
                box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
                background-color: #ffffff;
                cursor: pointer;
              "
            >
              <a-button class="flex items-center">
                  <PlusOutlined />
                  <span style="margin-left: 4px">Chọn ảnh</span>
                </a-button>
              chọn ảnh
            </label>
            <input
              hidden
              type="file"
              name="image"
              id="image-upload"
              @change="handleImageSelected"
            />
            <a-avatar shape="square" style="width: 100%; height: 200px">
              <template #icon>
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  v-show="imageUrl"
                  alt="Avatar"
                />
              </template>
            </a-avatar>
          </div> -->
        </div>
      </div>

      <Action :is-first="true" :handle-exit="onClickExit" />
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
import { createProduct, GenerateListSKU, GenerateSKU } from "@/api/product";
import { cloneDeep } from "lodash";
import { Notification } from "@/components/common/Notification/Notification";
import { useImageUpload } from "@/hooks/useImagrUpload";
import UploadForm from "@/components/common/Upload/UploadForm.vue";

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
  price: "",
  sell: "",
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
const onFinishFailed = (errorInfo) => {};

const handlePressEnterName = async (e) => {
  e.preventDefault();
  if (formState.name) {
    formState.codeSKU = await hanldeGetCode(e.target.value, "", true);
    // handleGetListCode();
    handleGetListCodeChild();
  } else {
    formState.codeSKU = "";
  }
};

const handlePressEnterCodeSKU = async (e) => {
  e.preventDefault();
  if (formState.codeSKU) {
    const res = await GenerateListSKU(formState.codeSKU, dataValues.value);
    if (res.data.success) {
      const dataCP = [...optionAtributes.value].map((item, index) => {
        return {
          ...item,
          codeSKU: res.data.data[index],
        };
      });
      optionAtributes.value = dataCP;
    }
  } else {
  }
};

const handleGetListCodeChild = async () => {
  if (formState.codeSKU) {
    const res = await GenerateListSKU(formState.codeSKU, dataValues.value);
    if (res.data.success) {
      const dataCP = [...optionAtributes.value].map((item, index) => {
        return {
          ...item,
          name: formState.name + `(${dataValues.value[index]})`,
          codeSKU: res.data.data[index],
        };
      });
      optionAtributes.value = dataCP;
    }
  } else {
  }
};

const hanldeGetCode = async (name) => {
  if (name) {
    const res = await GenerateSKU(name);
    if (res.data.success) {
      return res.data.data;
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
  const res = await GenerateListSKU(formState.codeSKU, dataValues.value);

  if (res.data.success) {
    const items =
      res.data.data &&
      res.data.data.length > 0 &&
      res.data.data.map((item, index) => {
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
</script>
