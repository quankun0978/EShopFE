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
        {{ getText("shared", useLang.lang, "add") }}
      </RouterLink>
      <RouterLink
        :disabled="state.selectedRowKeys.length === 1 ? null : true"
        @click.prevent.capture="(e) => handlePreventDefault(e, 'copy_product')"
        :to="{
          name: 'create_product',
        }"
        class="item-action"
      >
        <CopyOutlined />
        {{ getText("shared", useLang.lang, "coppy") }}
      </RouterLink>
      <RouterLink
        :disabled="state.selectedRowKeys.length === 1 ? null : true"
        @click.prevent.capture="
          (e) => handlePreventDefault(e, 'update_product')
        "
        :to="{
          name: 'update_product',
          params: {
            id: state.selectedRowKeys[0] ? state.selectedRowKeys[0] : '#',
          },
        }"
        class="item-action"
      >
        <EditOutlined />
        {{ getText("shared", useLang.lang, "edit") }}
      </RouterLink>
      <div
        class="item-action"
        @click="() => handleDeleteData(state.selectedRowKeys)"
      >
        <DeleteOutlined />
        {{ getText("shared", useLang.lang, "delete") }}
      </div>
      <div class="item-action">
        <SyncOutlined />
        {{ getText("shared", useLang.lang, "load") }}
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
              :handle-press-enter="handleSearch"
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

<script setup>
import { reactive } from "vue";
import Input from "../Input/Input.vue";
import Select from "../Select/Select.vue";
import Button from "../Button/Button.vue";
import Pagination from "../Pagination/Pagination.vue";
import { useRouter } from "vue-router";
import {
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
import { useLangStore } from "@/store/lang";
import { getText } from "@/constants/lang";
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
  handleDeleteData: Function,
});

const useLang = useLangStore();
const state = reactive({
  selectedRowKeys: [],
  loading: false,
});
const router = useRouter();
// sự kiện khi thay đổi các combo box
const onSelectChange = (selectedRowKeys) => {
  state.selectedRowKeys = selectedRowKeys;
};
// sự kiện khi thay đổi các select tìm kiếm

const handleColumnInputChange = (event, dataIndex) => {
  props.objectQuery[dataIndex] = event.target.value;
};

// sự kiện khi thay đổi các select tìm kiếm

const handleColumnSelectChange = (value, dataIndex) => {
  props.objectQuery[dataIndex] = value;
  props.handleSearch();
};

// sự kiện khi chuyển sang trang kế tiếp

const HandleClickNextPage = () => {
  +props.objectQuery.pageNumber++;
  props.handleSearch();
};

// sự kiện khi chuyển sang trang trước đó

const HandleClickPrevPage = () => {
  +props.objectQuery.pageNumber--;
  props.handleSearch();
};

// sự kiện khi chuyển sang trang đầu

const HandleClickNextFirstPage = () => {
  props.objectQuery.pageNumber = 1;
  props.handleSearch();
};

// sự kiện khi làm mới lại trang

const HandleClickRefreshPage = () => {
  props.handleRefreshQuery();
  props.handleSearch();
};

// sự kiện khi chuyển sang cuối cùng

const HandleClickNextLastPage = () => {
  props.objectQuery.pageNumber = props.pagination.totalPage;
  props.handleSearch();
};

// sự kiện khi thay đổi số phần tử hiển thị

const HandleChangePageSize = (value) => {
  props.objectQuery.pageSize = value;
  props.handleSearch();
};

// sự kiện khi thực hiện 1 hành động (thêm mới hoặc chỉnh sửa)

const handlePreventDefault = (e, route) => {
  if (state.selectedRowKeys.length > 0) {
    router.push({
      name: route,
      params: {
        id: state.selectedRowKeys[0],
      },
    });
  } else {
    e.preventDefault();
  }
};
</script>

<style lang="scss">
.item-action {
  padding: 8px;
  color: #fff;
  border-right: 1px solid black;
  cursor: pointer;
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
