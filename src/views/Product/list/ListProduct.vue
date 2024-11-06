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
  />
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

// const fakeData = [];

// for (let i = 0; i < 50; i++) {
//   fakeData.push({
//     id: i,
//     key: i,
//     codeSKU: Math.random().toString(36).substring(2, 12).toUpperCase(), // Mã sản phẩm ngẫu nhiên
//     name: `Product ${i + 1}`, // Tên sản phẩm
//     group: `${i}`, // Nhóm sản phẩm ngẫu nhiên
//     unit: `${i}`, // Đơn vị ngẫu nhiên
//     price: "1", // Giá sản phẩm ngẫu nhiên
//     isHide: isHideMapper(1), // Hiện/Ẩn ngẫu nhiên
//     type: typeMapper(1), // Loại sản phẩm ngẫu nhiên
//     status: statusMapper(1), // Trạng thái ngẫu nhiên
//   });
// }
</script>
