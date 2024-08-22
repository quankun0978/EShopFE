<template>
  <div :style="style">
    <a-divider v-if="isFirst" />
    <a-space style="padding: 8px">
      <Button :is-save="true" :text="'Luu'" />
      <Button :text="'Huy'" :is-exit="true" />
    </a-space>
    <a-divider style="margin: 0" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import Button from "../common/Button/Button.vue";
const props = defineProps({
  options: Array,
  placeholder: String,
  style: Object,
  defaultValue: String,
  isFirst: String,
});
let index = 0;
const items = ref(props.options);
const value = ref([props.defaultValue]);
const inputRef = ref();
const name = ref();
</script>
<style></style>
