<template>
  <a-config-provider
    :theme="{
      token: selectTheme,
    }"
  >
    <a-form-item :label="item.label && item.label">
      <a-form-item :name="item.name && item.name" no-style>
        <a-space>
          <a-upload-dragger
            v-model:fileList="val"
            name="files"
            action="/upload.do"
          >
            <p class="ant-upload-drag-icon">
              <InboxOutlined />
            </p>

            <p class="ant-upload-hint">
              - Lựa chọn biểu tượng để thấy nếu không có ảnh
            </p>
            <p class="ant-upload-hint">
              - Định dạng ảnh(.jpg,.jepg,.png,.gif) va dung lượng < 5MB
            </p>
          </a-upload-dragger>
        </a-space>
      </a-form-item>
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import selectTheme from "@/config/select";
import { ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
const props = defineProps({
  options: Array,
  placeholder: String,
  style: Object,
  defaultValue: String,
  dragger: Object,
  item: Object,
});
const val = ref(props.dragger);
// const addItem = (e) => {
//   e.preventDefault();
//   console.log("addItem");
//   items.value.push(name.value || `New item ${(index += 1)}`);
//   name.value = "";
//   setTimeout(() => {
//     inputRef.value?.focus();
//   }, 0);
// };
</script>
<style></style>
