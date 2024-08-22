<template></template>
<script setup>
import { useMenuStore } from "@/store/menu";
import { onMounted } from "vue";

onMounted(() => {
  Init();
});

const Init = () => {
  useMenuStore().updatePathName("Hàng hóa / Thêm mới");
};
</script>
