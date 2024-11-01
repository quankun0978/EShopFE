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
      <a-radio-group
        :disabled="isDisable"
        :defaultValue="+defaultValue"
        v-model:value="formState[`${item && item.value && item.value}`]"
        @change="onChange"
        :placeholder="placeholder"
        :tabindex="tabIndex"
      >
        <a-radio
          :tabindex="option.index"
          :key="option.value"
          @keydown.enter.prevent="() => handleChange(option.value)"
          :value="option.value"
          v-for="option in options"
          >{{ option.label }}</a-radio
        >
      </a-radio-group>
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
  options: Array,
  value: String,
  formState: Object,
  isDisable: Boolean,
  onChange: Function,
  tabIndex: Number,
});

const handleChange = (e) => {
  if (props.onChange) {
    props.onChange(e);
  }
};
</script>
