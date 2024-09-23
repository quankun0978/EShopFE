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
import ListProduct from "./ListProduct";
const {
  data,
  Table,
  columns,
  objectQuery,
  pagination,
  handleGetData,
  handleRefreshQuery,
  onClickDelete,
} = ListProduct(); // Gọi logic
</script>

<style scoped>
/* Optional: Add custom styles here */
</style>
