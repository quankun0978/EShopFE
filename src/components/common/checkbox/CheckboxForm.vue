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
      <a-checkbox
        :tabindex="'7'"
        @change="onChange"
        @keydown.enter.prevent="toggleCheckbox"
        v-model:checked="formSate[`${item && item.value && item.value}`]"
        >{{ text && text }}</a-checkbox
      >
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { ref, watchEffect } from "vue";

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
watchEffect(() => {
  checked.value = props.checked;
});
const toggleCheckbox = () => {
  // Đảo ngược giá trị checkbox hiện tại
  const currentValue = props.formSate[props.item.value];
  props.formSate[props.item.value] = !currentValue;
  // Gọi hàm onChange nếu nó đã được cung cấp
  if (props.onChange) {
    props.onChange(props.formSate[props.item.value]);
  }
};
</script>
