<script setup>
import { ref } from "vue";
import menuTheme from "@/config/themes/menu";

const props = defineProps({
  items: Array,
  selectedKeys: Array,
  defaultSelectedKey: String,
  class: String,
  style: Object,
});
const data = ref(props.items);
const value = ref(props.defaultSelectedKey);
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        itemSelectedBg: '#00b96b',
      },
    }"
  >
    <a-segmented
      v-model:value="value"
      :options="data"
      :style="{
        padding: 0,
        borderRadius: '0',
        backgroundColor: '#fff',
      }"
    >
      <template #label="{ value: val, payload = {} }">
        <template v-if="payload.icon">
          <component
            :style="{
              height: '64px',

              padding: 0,
              borderRadius: 0,
            }"
            :is="payload.icon"
          />
        </template>
        {{ payload.name }}
      </template>
    </a-segmented>
  </a-config-provider>
</template>

<style>
.ant-segmented-item-selected {
  border-radius: 0 !important;
}
.ant-segmented-item-selected {
  background-color: #00577b !important;
  color: #fff !important;
}
</style>
