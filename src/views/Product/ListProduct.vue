<template>
  <div>
    <Table
      :bordered="true"
      :isInput="true"
      :items="data"
      :columns="columns"
      :isAction="true"
      :handleSearch="handleGetData"
    />
  </div>
</template>
<script setup>
import { GetAllProduct } from "@/api/product";
import Table from "@/components/common/Table/Table.vue";
import { useFetch } from "@/hooks/useFetch";
import { useMenuStore } from "@/store/menu";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";

const objectQuery = reactive({
  codeSKU: "",
  name: "",
  group: "",
  unit: "",
  price: 10000000,
  isHide: 1,
  type: "",
  managerBy: "",
  status: "",
  pageNumber: 1,
  pageSize: 50,
});
const columns = [
  {
    title: "Mã SKU",
    dataIndex: "codeSKU",
    input: objectQuery.codeSKU,
  },
  {
    title: "Tên hàng hóa",
    dataIndex: "name",
    width: "30%",
    input: objectQuery.name,
  },
  {
    title: "Nhóm hàng hóa",
    dataIndex: "group",
    input: objectQuery.group,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit",
    input: objectQuery.unit,
  },
  {
    title: "Giá bán TB",
    dataIndex: "price",
    input: objectQuery.price,
  },
  {
    title: "Hiển thị trên MH bán hàng",
    dataIndex: "isHide",
    isSelect: true,
    input: objectQuery.isHide,
  },
  {
    title: "Loại hàng hóa",
    dataIndex: "type",
    isSelect: true,
    input: objectQuery.type,
  },
  {
    title: "Quản lý theo",
    dataIndex: "managerBy",
    isSelect: true,
    input: objectQuery.managerBy,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    isSelect: true,
    input: objectQuery.status,
  },
];

const data = ref();
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     codeSKU: `SKU${i + 1}`, // Add codeSKU
//     name: `Edward King ${i}`,
//     group: `Group ${(i % 5) + 1}`, // Add group
//     unit: `Unit ${(i % 3) + 1}`, // Add unit
//     price: Math.floor(Math.random() * 1000) + 1, // Add price
//     isHide: "All", // Add isHide
//     type: `Type ${(i % 4) + 1}`, // Add type
//     managerBy: `Manager ${(i % 3) + 1}`, // Add managerBy
//     status: `Status ${i % 2 === 0 ? "Active" : "Inactive"}`, // Add status
//   });
// }

onMounted(() => {
  Init();
});

const Init = () => {
  useMenuStore().updateHeader({
    namePath: "Hàng hóa",
    isBack: true,
  });
  handleGetData();
};
const handleGetData = async () => {
  try {
    const res = await GetAllProduct(objectQuery);
    console.log(res);
    if (res.data.success) {
      const dt =
        res.data.data.data &&
        res.data.data.data.length > 0 &&
        res.data.data.data.map((item) => {
          return {
            ...item,
            key: item.codeSKU,
          };
        });
      data.value = dt;
      console.log(dt);
    }
    console.log(objectQuery);
  } catch (e) {
    console.error(e);
  }
};
</script>
