<script setup>
import { computed, reactive } from "vue";
import {
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({
  items: Array,
  columns: Array,
  placeholder: String,
  style: Object,
  isAction: Boolean,
});

const state = reactive({
  selectedRowKeys: [],
  // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const start = () => {
  state.loading = true;
  // ajax request after empty completing
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};
const onSelectChange = (selectedRowKeys) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
</script>

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
    <div
      v-if="isAction"
      style="display: flex; width: 100%; background-color: rgb(0, 87, 123)"
    >
      <RouterLink
        :to="{
          name: 'create_product',
        }"
        class="item-action"
      >
        <PlusOutlined />
        Them moi
      </RouterLink>
      <RouterLink class="item-action">
        <CopyOutlined />
        Nhan ban
      </RouterLink>
      <RouterLink
        :to="{
          name: 'update_product',
        }"
        class="item-action"
      >
        <EditOutlined />
        Sua
      </RouterLink>
      <div class="item-action">
        <DeleteOutlined />
        Xoa
      </div>
      <div class="item-action">
        <SyncOutlined />
        Nap
      </div>
    </div>

    <a-table
      :scroll="{ y: '71vh', scrollToFirstRowOnChange: true }"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="columns"
      :data-source="items"
      :pagination="{
        pageSize: 50,
      }"
    >
    </a-table>
  </a-config-provider>
</template>
<style scoped>
.item-action {
  padding: 8px;
  color: #fff;
  border-right: 1px solid black;
}
:root {
  --table-height: 100vh;
}
</style>
