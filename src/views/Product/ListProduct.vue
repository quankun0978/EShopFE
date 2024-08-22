<template>
  <div>
    <Table :items="data" :columns="columns" :isAction="true" />
  </div>
</template>
<script setup>
import Table from "@/components/common/Table/Table.vue";
import TableTest from "@/components/common/Table/TableTest.vue";
import { useMenuStore } from "@/store/menu";
import { h, onMounted, reactive, render } from "vue";

const columns = [
  {
    title: "Mã SKU",
    dataIndex: "codeSKU",
  },
  {
    title: "Tên hàng hóa",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Nhóm hàng hóa",
    dataIndex: "group",
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit",
  },
  {
    title: "Giá bán TB",
    dataIndex: "price",
  },
  {
    title: "Hiển thị trên MH bán hàng",
    dataIndex: "isHide",
  },
  {
    title: "Loại hàng hóa",
    dataIndex: "type",
  },
  {
    title: "Quản lý theo",
    dataIndex: "managerBy",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    codeSKU: `SKU${i + 1}`, // Add codeSKU
    name: `Edward King ${i}`,
    group: `Group ${(i % 5) + 1}`, // Add group
    unit: `Unit ${(i % 3) + 1}`, // Add unit
    price: Math.floor(Math.random() * 1000) + 1, // Add price
    isHide: "All", // Add isHide
    type: `Type ${(i % 4) + 1}`, // Add type
    managerBy: `Manager ${(i % 3) + 1}`, // Add managerBy
    status: `Status ${i % 2 === 0 ? "Active" : "Inactive"}`, // Add status
  });
}

const objectQuery = reactive({
  codeSKU: "",
  name: "",
  group: "",
  unit: "",
  price: "",
  isHide: "",
  type: "",
  managerBy: "",
  status: "",
});

onMounted(() => {
  Init();
});

const Init = () => {
  useMenuStore().updatePathName("Hàng hóa");
};
</script>
