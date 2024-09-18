<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      :label="item && item.label && item.label"
      :name="item && item.value && item.value"
      :rules="rules"
    >
      <a-textarea
        v-if="isTextarea"
        :placeholder="placeholder"
        :style="style"
        style="resize: none"
        v-model:value="formSate[`${item && item.value && item.value}`]"
        :rows="rows"
        :maxlength="maxLength"
        ref="inputRef"
        :tabindex="tabIndex"
      />
      <a-input
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        @input="onInput"
        @pressEnter="onPressEnter"
        :disabled="isDisable"
        ref="inputRef"
        :tabindex="tabIndex"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { onMounted, ref, watchEffect } from "vue";

const props = defineProps({
  value: String,
  modelValue: String,
  placeholder: String,
  item: Object,
  rules: Array,
  style: Object,
  isTextarea: Boolean,
  rows: Number,
  maxLength: Number,
  formSate: Object,
  onInput: Function,
  onPressEnter: Function,
  isDisable: Boolean,
  inputRef: String,
  tabIndex: Number, // Thêm tabIndex vào props

  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});

// const nameRef = ref(null);
// watchEffect(() => {
//   if (props.item.value === "name") {
//     nameRef.value.focus();
//   }
// });

// Reference to the input element
const inputRef = ref(null);

onMounted(() => {
  // Check if the item is "name"
  if (props.item && props.item.value === "name") {
    // Focus the input element
    inputRef.value?.focus();
  }
});
</script>
