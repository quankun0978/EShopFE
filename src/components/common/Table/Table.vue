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
        {{ getText("shared", langStore.lang, "ADD") }}
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
        {{ getText("shared", langStore.lang, "COPPY") }}
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
        {{ getText("shared", langStore.lang, "EDIT") }}
      </RouterLink>
      <div
        class="item-action"
        @click="() => handleDeleteData(state.selectedRowKeys)"
      >
        <DeleteOutlined />
        {{ getText("shared", langStore.lang, "DELETE") }}
      </div>
      <div class="item-action">
        <SyncOutlined />
        {{ getText("shared", langStore.lang, "LOAD") }}
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

        <template #title v-else-if="column.hidden"> </template>

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
        <template v-if="!column.hidden" #bodyCell="{ record }">
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
import "./table.scss";
import Table from "./Table.js";
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

const {
  Input,
  Select,
  Button,
  Pagination,
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  langStore,
  state,
  handleColumnInputChange,
  getText,
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
</script>
<style lang="scss" scoped>
@import "./Table.scss";
</style>
