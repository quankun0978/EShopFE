<template>
  <div>
    <Table
      :bordered="true"
      :isInput="true"
      :items="dt"
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

const dt = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];
</script>
