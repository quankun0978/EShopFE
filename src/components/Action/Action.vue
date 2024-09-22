<template>
  <div :style="style">
    <a-divider v-if="isFirst" />
    <a-space style="padding: 8px">
      <Button
        :tab-index="tabIndexSave"
        :is-save="true"
        :text="getText('shared', useLang.lang, 'save')"
        :handle-click="handleSave"
      />
      <Button
        :tab-index="tabIndexExit"
        :text="getText('shared', useLang.lang, 'cancel')"
        :is-exit="true"
        :handle-click="handleExit"
      />
    </a-space>
    <a-divider style="margin: 0" />
  </div>
</template>
<script setup>
import { useLangStore } from "@/store/lang";
import Button from "../common/Button/Button.vue";
import { getText } from "@/constants/lang";
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

const useLang = useLangStore();
</script>
