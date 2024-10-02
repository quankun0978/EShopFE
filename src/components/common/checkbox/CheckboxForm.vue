<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      :name="item.value && item.value"
      :label="item.label && item.label"
      :rules="rules"
    >
      <a-checkbox @change="onChange" v-model:checked="checked">{{
        text && text
      }}</a-checkbox>
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
  defaultValue: String,
  placeholder: String,
  item: Object,
  name: String,
  rules: Array,
  text: String,
  options: Array,
  value: String,
  formSate: Object,
  onChange: Function,
  checked: Boolean,
  tabIndex: Number, // Thêm tabIndex vào props
});
const checked = ref(props.checked);
</script>
