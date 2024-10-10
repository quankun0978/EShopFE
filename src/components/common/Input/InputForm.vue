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
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        @input="onInput"
        @pressEnter="onPressEnter"
        @keydown="pressTab"
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
  onPressTab: Function,
  isDisable: Boolean,
  inputRef: String,
  tabIndex: Number,
  validator: Function,
  isRequired: Boolean,
});

const pressTab = (e) => {
  if (e.key === "Tab") {
    if (props.onPressTab) {
      props.onPressTab(e);
    }
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
</script>
