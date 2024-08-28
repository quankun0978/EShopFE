<script setup>
import { computed, reactive } from "vue";
import {
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
import Input from "../Input/Input.vue";
import Select from "../Select/Select.vue";
import Button from "../Button/Button.vue";
import Pagination from "../Pagination/Pagination.vue";
const props = defineProps({
  items: Array,
  columns: Array,
  placeholder: String,
  objectQuery: Object,
  style: Object,
  isAction: Boolean,
  isInput: Boolean,
  bordered: Boolean,
  handleSearch: Function,
  pagination: Object,
  handleRefreshQuery: Function,
});

const state = reactive({
  selectedRowKeys: [],
  // Check here to configure the default column
  loading: false,
});

// const start = () => {
//   state.loading = true;
//   // ajax request after empty completing
//   setTimeout(() => {
//     state.loading = false;
//     state.selectedRowKeys = [];
//   }, 1000);
// };
const onSelectChange = (selectedRowKeys) => {
  state.selectedRowKeys = selectedRowKeys;
};

// const pagination = computed(() => ({
//   position: ["bottomLeft"],
//   pageSize: 50,

//   // itemRender: (_, type, originalElement) => {
//   //   if (type === "prev") {
//   //     console.log("ahihi");
//   //     return () => h(PlusOutlined);
//   //   }
//   //   if (type === "next") {
//   //     return () => h(PlusOutlined);
//   //   }
//   //   return originalElement;
//   // },
// }));
const handleColumnInputChange = (event, dataIndex) => {
  props.objectQuery[dataIndex] = event.target.value;
};
const handleColumnSelectChange = (value, dataIndex) => {
  props.objectQuery[dataIndex] = value;
  props.handleSearch();
};

const HandleClickNextPage = () => {
  +props.objectQuery.pageNumber++;
  props.handleSearch();
};

const HandleClickPrevPage = () => {
  +props.objectQuery.pageNumber--;
  props.handleSearch();
};

const HandleClickNextFirstPage = () => {
  props.objectQuery.pageNumber = 1;
  props.handleSearch();
};

const HandleClickRefreshPage = () => {
  props.handleRefreshQuery();
  props.handleSearch();
};

const HandleClickNextLastPage = () => {
  props.objectQuery.pageNumber = props.pagination.totalPage;
  props.handleSearch();
};
const HandleChangePageSize = (value) => {
  props.objectQuery.pageSize = value;
  props.handleSearch();
};
console.log(state.selectedRowKeys.length);
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
      {{ console.log(state.selectedRowKeys.length) }}
      <RouterLink
        :to="{
          name: 'create_product',
        }"
        class="item-action"
      >
        <PlusOutlined />
        Thêm mới
      </RouterLink>
      <RouterLink
        :disabled="state.selectedRowKeys.length === 1 ? null : true"
        :to="{
          name: 'create_product',
        }"
        class="item-action"
      >
        <CopyOutlined />
        Nhân bản
      </RouterLink>
      <RouterLink
        :disabled="state.selectedRowKeys.length === 1 ? null : true"
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
      v-if="isInput"
      class="table-custom"
      :bordered="bordered"
      :scroll="{ y: '76vh', scrollToFirstRowOnChange: true, x: 1520 }"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      }"
      :data-source="items"
      :style="style"
      :pagination="false"
    >
      <a-column
        v-for="column in columns"
        :key="column.dataIndex"
        :dataIndex="column.dataIndex"
      >
        <template #title v-if="column.isSelect">
          <h3 style="text-align: center">
            {{ column.title }}
          </h3>
          <Select
            :options="column.select.options"
            :-on-change="
              (val) => handleColumnSelectChange(val, column.dataIndex)
            "
            :default-value="objectQuery[column.dataIndex]"
            :style="{
              width: '100%',
            }"
          />
        </template>
        <template #title v-else>
          <h3 style="text-align: center">
            {{ column.title }}
          </h3>
          <div style="display: flex">
            <Button
              :handle-click="handleSearch"
              :text="'≤'"
              v-if="column.dataIndex === 'price'"
            />
            <Button :handle-click="handleSearch" :text="'*'" v-else />
            <Input
              :value="objectQuery[column.dataIndex]"
              :-on-change="(e) => handleColumnInputChange(e, column.dataIndex)"
            />
          </div>
        </template>
        <template #bodyCell="{ record }">
          {{ record[column.dataIndex] }}
        </template>
      </a-column>
    </a-table>
    <a-table
      v-else
      :data-source="items"
      :scroll="{ y: '76vh', scrollToFirstRowOnChange: true, x: 1000 }"
    />
    {{ console.log(pagination) }}
    <Pagination
      :pagination-prop="pagination"
      :-handle-click-next-page="HandleClickNextPage"
      :-handle-click-prev-page="HandleClickPrevPage"
      :-handle-click-next-first-page="HandleClickNextFirstPage"
      :-handle-click-next-last-page="HandleClickNextLastPage"
      :-handle-click-refresh-page="HandleClickRefreshPage"
      v-bind:-handle-select-change="HandleChangePageSize"
    />
  </a-config-provider>
</template>
<style lang="scss">
.item-action {
  padding: 8px;
  color: #fff;
  border-right: 1px solid black;
}
:root {
  --table-height: 100vh;
}
.table-custom {
  .ant-table-thead > tr > .ant-table-cell {
    padding: 0 !important;
  }
}
</style>
