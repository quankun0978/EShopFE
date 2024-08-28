<template>
  <div :style="style">
    <a-divider v-if="isFirst" />
    <a-space style="padding: 8px">
      <Button :is-save="true" :text="'Lưu'" :handle-click="handleSave" />
      <Button :text="'Hủy'" :is-exit="true" :handle-click="handleExit" />
    </a-space>
    <a-divider style="margin: 0" />
  </div>
</template>
<script setup>
import Button from "../common/Button/Button.vue";
const props = defineProps({
  options: Array,
  placeholder: String,
  style: Object,
  defaultValue: String,
  isFirst: String,
  handleSave: Function,
  handleExit: Function,
});
</script>
<style></style>
