<template>
  <div>
    <Table
      :bordered="true"
      :isInput="true"
      :items="data"
      :columns="columns"
      :isAction="true"
      :objectQuery="objectQuery"
      :pagination="pagination"
      :handleSearch="handleGetData"
      :handleRefreshQuery="handleRefreshQuery"
      :handleDeleteData="onClickDelete"
    />
  </div>
</template>

<script setup>
import ListProduct from "./listProduct";
const {
  data,
  Table,
  columns,
  objectQuery,
  pagination,
  handleGetData,
  handleRefreshQuery,
  onClickDelete,
} = ListProduct();
</script>
