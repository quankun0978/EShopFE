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
      />
      <a-input
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        @input="onInput"
        @pressEnter="onPressEnter"
        :disabled="isDisable"
        ref="inputRef"
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
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});

// const nameRef = ref(null);
// watchEffect(() => {
//   if (props.item.value === "name") {
//     nameRef.value.focus();
//   }
// });
</script>
