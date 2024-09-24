<template>
  <div :style="style">
    <a-divider v-if="isFirst" />
    <a-space style="padding: 8px">
      <Button
        :tab-index="tabIndexSave"
        :is-save="true"
        :text="getText('shared', langStore.lang, 'save')"
        :handle-click="handleSave"
      />
      <Button
        :tab-index="tabIndexExit"
        :text="getText('shared', langStore.lang, 'cancel')"
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

// strore
import { useLangStore } from "@/store/lang";

// hàm bổ trợ
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

const langStore = useLangStore();
</script>
