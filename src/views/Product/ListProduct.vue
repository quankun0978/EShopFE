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
    customRender: (text, record, index) => {
      // Custom rendering logic for 'codeSKU' column
      return h("div", { class: "bar" }, [
        h("span", {}, text), // Display the 'codeSKU' value
        h("a-input", { placeholder: "Basic usage" }), // Add an input
      ]);
    },
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
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
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
