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
      :rules="rulesDefault"
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
        v-else-if="isNumber"
        v-model:value="formSate[`${item && item.value && item.value}`]"
        @keydown="pressKeydown"
        @change="onChangeNumber"
        :disabled="isDisable"
        ref="inputRef"
        :tabindex="tabIndex"
        :style="style"
      />
      <a-input
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        @keydown="pressKeydown"
        @blur="OnBlur"
        :disabled="isDisable"
        ref="inputRef"
        :tabindex="tabIndex"
        :style="style"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { convertNumber } from "@/helpers/Funcs/helper";

const props = defineProps({
  value: String,
  placeholder: String,
  item: Object,
  rules: Array,
  style: Object,
  isTextarea: Boolean,
  isNumber: Boolean,
  rows: Number,
  maxLength: Number,
  modelValue: String,
  formSate: Object,
  onPressKeyDown: Function,
  onBlur: Function,
  isDisable: Boolean,
  tabIndex: Number,
  validator: Function,
  isRequired: Boolean,
});

const pressKeydown = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
  if (e.key === "Tab" || e.key === "Enter") {
    if (props.onPressKeyDown) {
      props.onPressKeyDown(e);
    }
  }
};

const OnBlur = (e) => {
  if (props.onBlur) {
    props.onBlur(e);
  }
};

const rulesDefault =
  props.rules && props.rules.length > 0
    ? props.rules
    : [
        {
          required: props.isRequired,
          message: `Vui lòng không bỏ trống ${props.item.label}!`,
        },
      ];
const onChangeNumber = (e) => {
  props.formSate[props.item.value] = convertNumber(e.target.value);
};
</script>
