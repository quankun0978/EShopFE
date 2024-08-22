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
        fontSize: 11,
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
        Thêm mới
      </RouterLink>
      <RouterLink class="item-action">
        <CopyOutlined />
        Nhân bản
      </RouterLink>
      <RouterLink
        :to="{
          name: 'update_product',
        }"
        class="item-action"
      >
        <EditOutlined />
        Sửa
      </RouterLink>
      <div class="item-action">
        <DeleteOutlined />
        Xóa
      </div>
      <div class="item-action">
        <SyncOutlined />
        Nạp
      </div>
    </div>

    <a-table
      :scroll="{ y: '71vh', scrollToFirstRowOnChange: true }"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      }"
      :data-source="items"
      :pagination="{
        pageSize: 50,
      }"
    >
      <a-column
        v-for="column in columns"
        :key="column.dataIndex"
        :dataIndex="column.dataIndex"
      >
        <template #title>
          <div>{{ column.title }}</div>
          <a-input />
        </template>
        <template #bodyCell="{ record }">
          {{ record[column.dataIndex] }}
        </template>
      </a-column>
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
