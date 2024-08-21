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
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const props = defineProps({
  activeKey: String,
  items: Array,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const activeKey = ref(props.activeKey);
</script>
<style>
.ant-tabs-tab {
  margin: 0 !important;
  border-radius: 0 !important;
}
.ant-tabs-tab {
  margin: 0 !important;
}
.ant-tabs-tab.ant-tabs-tab-active {
  background-color: #2b3173 !important;
  color: #fff !important;
}
</style>
