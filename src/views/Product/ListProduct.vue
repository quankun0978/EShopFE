<template>
  <div>
    <Table :columns="columns" :items="data" :is-action="true" />
  </div>
</template>
<script setup>
import Table from "@/components/common/Table/Table.vue";
import { useMenuStore } from "@/store/menu";
import { h, onMounted, reactive, render } from "vue";

const columns = [
  {
    title: "Ma SKU",
    dataIndex: "codeSKU",
  },
  {
    title: "Ten hang hoa",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Nhom hang hoa",
    dataIndex: "group",
  },
  {
    title: "Don vi tinh",
    dataIndex: "unit",
  },
  {
    title: "Gia ban TB",
    dataIndex: "price",
  },
  {
    title: "Hien thi tren MH ban hang",
    dataIndex: "isHide",
  },
  {
    title: "Loai hang hoa",
    dataIndex: "type",
  },
  {
    title: "Quan ly theo",
    dataIndex: "managerBy",
  },
  {
    title: "Trang thai",
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
  useMenuStore().updatePathName("Hang hoa");
};
</script>
