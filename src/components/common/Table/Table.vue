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
        {{ $t("product.LIST.ADD") }}
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
        {{ $t("product.LIST.COPPY") }}
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
        {{ $t("product.LIST.EDIT") }}
      </RouterLink>
      <div
        class="item-action"
        @click="() => handleDeleteData(state.selectedRowKeys)"
      >
        <DeleteOutlined />
        {{ $t("product.LIST.DELETE") }}
      </div>
      <div class="item-action">
        <SyncOutlined />
        {{ $t("product.LIST.LOAD") }}
      </div>
    </div>

    <a-table
      @row-click="testEvent"
      v-if="isInput"
      class="table-custom"
      :bordered="bordered"
      :scroll="{ y: '76vh', scrollToFirstRowOnChange: true, x: 1520 }"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
        // getCheckboxProps: handleGetCheckboxProps,
      }"
      :data-source="items"
      :style="style"
      :pagination="false"
    >
      <a-column
        v-for="(column, index) in columns"
        :key="column.dataIndex"
        :dataIndex="column.dataIndex"
      >
        <template #title v-if="column.isSelect">
          <h4 style="text-align: center">
            {{ column.title }}
          </h4>
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
          <h4 style="text-align: center">
            {{ column.title }}
          </h4>
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
        <template @click="testEvent" :ref="firstRow" #bodyCell="{ record }">
          <div
            :key="record.name"
            v-if="index === 1"
            ref="firstRow"
            tabindex="1"
          >
            <!-- Thêm ref vào hàng đầu tiên -->
            {{ record[column.dataIndex] }}
          </div>
          <div v-else>
            {{ console.log(index) }}
            {{ record[column.dataIndex] }}
          </div>
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
import "./table.scss";
import Table from "./Table.js";
import { onMounted, ref } from "vue";
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

const testEvent = () => {
  alert("hihi");
};

const {
  Input,
  Select,
  Button,
  Pagination,
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  selectedRowKeys,
  DeleteOutlined,
  SyncOutlined,
  state,
  handleColumnInputChange,
  handleColumnSelectChange,
  HandleClickNextLastPage,
  handlePreventDefault,
  onSelectChange,
  HandleChangePageSize,
  HandleClickNextFirstPage,
  HandleClickNextPage,
  HandleClickPrevPage,
  HandleClickRefreshPage,
} = Table(props);
const firstRow = ref(null);
onMounted(() => {
  if (firstRow.value) {
    firstRow.value.focus(); // Tự động focus vào hàng đầu tiên
  }
});
</script>
<style lang="scss" scoped>
@import "./Table.scss";
</style>
