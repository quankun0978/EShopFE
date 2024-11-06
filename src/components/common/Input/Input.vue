<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-textarea
      v-if="isTextarea"
      :value="value"
      :placeholder="placeholder"
      :style="style"
      style="resize: none"
      @change="OnChange"
      :rows="rows"
      :maxlength="maxLength"
    />
    <a-input
      v-else-if="isNumber"
      :value="value"
      @pressEnter.prevent="handlePressEnter"
      @change="onChangeNumber"
      :style="style"
    />
    <a-input
      v-else
      :value="value"
      :placeholder="placeholder"
      :style="style"
      @change="OnChange"
      @pressEnter="handlePressEnter"
    />
  </a-config-provider>
</template>
<script setup>
import { convertNumber } from "@/helpers/Funcs/helper";
import { onUpdated, reactive, ref, watchEffect } from "vue";

const props = defineProps({
  value: String,
  placeholder: String,
  style: Object,
  OnChange: Function,
  Change: Function,
  isTextarea: Boolean,
  keyword: String,
  isNumber: Boolean,
  item: Object,
  formSate: Object,
  keyword: String,
  rows: Number,
  maxLength: Number,
  handlePressEnter: Function,
});

const emit = defineEmits(["changeNumber"]);
const onChangeNumber = (e) => {
  emit("changeNumber", e.target.value);
  // Object.assign(props.formSate, cp);
};

// const onChangeNumber = (e) => {
//   valueRefNumber.value = convertNumber(e.target.value);
// };
</script>
