<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      :label="item.label && item.label"
      :name="item.value && item.value"
      :rules="rules"
    >
      <a-select
        v-if="isModeTag"
        v-model:value="items"
        :placeholder="placeholder"
        :style="style"
        :disabled="isDisabledAtribute"
        mode="tags"
        @change="OnChange"
      />
      <a-select
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        :placeholder="placeholder"
        :style="style"
        :options="options"
        :disabled="isDisable"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";

const props = defineProps({
  value: String,
  placeholder: String,
  item: Object,
  rules: Array,
  options: Array,
  style: Object,
  mode: String,
  isModeTag: Boolean,
  formSate: Object,
  OnChange: Function,
  isDisable: Boolean,
  isDisabledAtribute: Boolean,

  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const items = ref(props.options);

watchEffect(() => {
  if (props.options) {
    items.value = props.options;
    console.log(items.value);
    console.log(props.options);
  }
});

console.log(items.value);
</script>
