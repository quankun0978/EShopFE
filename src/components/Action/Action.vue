<template>
  <div :style="style" class="action-custom">
    <a-divider v-if="isFirst" />
    <a-space style="padding: 8px">
      <Button
        :tab-index="tabIndexSave"
        :is-save="true"
        :text="$t('product.ACTION.SAVE')"
        :handle-click="handleSave"
      />
      <Button
        :tab-index="tabIndexExit"
        :text="$t('product.ACTION.CANCEL')"
        :is-exit="true"
        :handle-click="handleExit"
      />
    </a-space>
    <a-divider style="margin: 0" />
  </div>
</template>
<script setup>
// component
import Button from "../common/Button/Button.vue";

const props = defineProps({
  options: Array,
  placeholder: String,
  style: Object,
  defaultValue: String,
  isFirst: Boolean,
  tabIndexSave: Number,
  tabIndexExit: Number,
  handleSave: Function,
  handleExit: Function,
});
</script>

<style lang="scss" scoped>
@import "./Action.scss";
</style>
