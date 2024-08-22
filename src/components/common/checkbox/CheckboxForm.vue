<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      :name="item.name && item.name"
      :label="item.label && item.label"
      :rules="rules"
    >
      <a-checkbox-group v-model:value="val" :options="options" />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { Item } from "ant-design-vue/es/menu";
import { ref } from "vue";
const props = defineProps({
  defaultValue: String,
  placeholder: String,
  item: Object,
  name: String,
  rules: Array,
  options: Array,
  value: String,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});

const val = ref(props.value);
</script>
