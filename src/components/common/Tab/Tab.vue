<template>
  <a-config-provider
    :theme="{
      token: {
        cardBg: 'red',
        cardGutter: 0,
        horizontalItemMargin: '0',
        horizontalItemMarginRTL: '0',
        horizontalItemGutter: 0,
      }, // Sử dụng theme từ file config
    }"
  >
    <a-tabs
      v-model:activeKey="activeKey"
      :type="'card'"
      style="display: flex; align-items: center"
    >
      <a-tab-pane v-for="item in items" :key="item.key">
        <template #tab>
          <span
            style="display: flex; align-items: center; justify-content: center"
          >
            <component :is="item.icon" />
            {{ item.name }}
          </span>
        </template>
      </a-tab-pane>
    </a-tabs>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";
import "./Tab.scss";
const props = defineProps({
  activeKey: String,
  items: Array,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const activeKey = ref(props.activeKey);
</script>
