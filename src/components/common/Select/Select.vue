<template>
  <a-config-provider
    :theme="{
      token: selectTheme,
    }"
  >
    <a-select
      v-model:value="value"
      :placeholder="placeholder"
      :style="style"
      :options="items"
      :filter-option="filterOption"
      show-search
      @change="OnChange"
    >
    </a-select>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";
// theme
import selectTheme from "@/config/select";
const props = defineProps({
  options: Array,
  placeholder: String,
  style: Object,
  defaultValue: Number,
  OnChange: Function,
});
const items = ref(props.options);
const value = ref([props.defaultValue]);
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
