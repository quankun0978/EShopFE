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
      },
    }"
  >
    <div style="display: flex; flex-direction: column; height: 100%">
      <div style="display: flex; flex: 1">
        <div v-if="isAction" class="table-custom-action">
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
            :class="isDisabled && 'action-disabled'"
            @click.prevent.capture="
              (e) => handlePreventDefault(e, 'copy_product')
            "
            :to="{
              name: 'create_product',
            }"
            class="item-action"
          >
            <CopyOutlined />
            {{ $t("product.LIST.COPPY") }}
          </RouterLink>
          <RouterLink
            :class="isDisabled && 'action-disabled'"
            @click.prevent.capture="
              (e) => handlePreventDefault(e, 'update_product')
            "
            :to="{
              name: 'update_product',
              params: {
                id: idProduct ? idProduct : '#',
              },
            }"
            class="item-action"
          >
            <EditOutlined />
            {{ $t("product.LIST.EDIT") }}
          </RouterLink>
          <div
            class="item-action"
            @click="() => handleDeleteData(state.selectedRowKeys, [idFocus])"
          >
            <DeleteOutlined />
            {{ $t("product.LIST.DELETE") }}
          </div>
          <div class="item-action">
            <SyncOutlined />
            {{ $t("product.LIST.LOAD") }}
          </div>
        </div>
      </div>

      <div style="display: flex; flex: 20">
        <a-table
          v-if="isInput"
          :customRow="customRow"
          class="table-custom"
          :bordered="bordered"
          :scroll="{ y: '76vh', x: 1600 }"
          :row-selection="{
            selectedRowKeys: state.selectedRowKeys,
            onChange: onSelectChange,
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
                  :-on-change="
                    (e) => handleColumnInputChange(e, column.dataIndex)
                  "
                />
              </div>
            </template>
          </a-column>
          <template #bodyCell="{ column, text, record }">
            <RouterLink
              class="item-cell"
              v-if="column.dataIndex === 'name'"
              :to="{
                name: 'update_product',
                params: {
                  id: record.id ? record.id : '#',
                },
              }"
              >{{ record[column.dataIndex] }}</RouterLink
            >
            <div v-else>
              <p class="item-cell">
                {{ record[column.dataIndex] }}
              </p>
            </div>
          </template>
        </a-table>
        <a-table
          v-else
          :data-source="items"
          :scroll="{ y: '76vh', scrollToFirstRowOnChange: true, x: 1000 }"
        />
      </div>

      <div style="display: flex; flex: 1">
        <Pagination
          :pagination-prop="pagination"
          :-handle-click-next-page="HandleClickNextPage"
          :-handle-click-prev-page="HandleClickPrevPage"
          :-handle-click-next-first-page="HandleClickNextFirstPage"
          :-handle-click-next-last-page="HandleClickNextLastPage"
          :-handle-click-refresh-page="HandleClickRefreshPage"
          v-bind:-handle-select-change="HandleChangePageSize"
        />
      </div>
    </div>
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
  state,
  customRow,
  handleColumnInputChange,
  handleColumnSelectChange,
  HandleClickNextLastPage,
  handlePreventDefault,
  onSelectChange,
  idProduct,
  idFocus,
  isDisabled,
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
