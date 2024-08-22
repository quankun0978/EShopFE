<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      :label="item.label && item.label"
      :name="item.name && item.name"
      :rules="rules"
    >
      <Input
        :style="style"
        :value="value"
        :placeholder="placeholder"
        @change="handleChange"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { DownOutlined } from "@ant-design/icons-vue";
import { Item } from "ant-design-vue/es/menu";
import { ref } from "vue";
import Input from "./Input.vue";
const props = defineProps({
  value: String,
  placeholder: String,
  item: Object,
  rules: Array,
  style: Object,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const val = ref(props.value);
const handleChange = (event) => {
  val.value = event.target.value;
};
</script>
