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
      <a-checkbox-group
        :tabindex="tabIndex"
        v-model:value="formSate[`${item && item.value && item.value}`]"
        :options="options"
        @change="onChange"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
const props = defineProps({
  defaultValue: String,
  placeholder: String,
  item: Object,
  name: String,
  rules: Array,
  options: Array,
  value: String,
  formSate: Object,
  onChange: Function,
  tabIndex: Number, // Thêm tabIndex vào props
});
</script>
