<template>
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
    :state="state"
    :idProduct="idProduct"
    :idFocus="idFocus"
    @changeIdFocus="handleChangeIdFocus"
    @changeIdProduct="handleChangeIdProduct"
  />
</template>

<script setup>
import ListProduct from "./listProduct";
const {
  data,
  state,
  Table,
  columns,
  objectQuery,
  pagination,
  handleGetData,
  handleRefreshQuery,
  idFocus,
  idProduct,
  handleChangeIdFocus,
  handleChangeIdProduct,
  onClickDelete,
} = ListProduct();
</script>
