<template>
  <div>Hello form update</div>
</template>
<script setup>
import { useMenuStore } from "@/store/menu";
import { onMounted } from "vue";

onMounted(() => {
  Init();
});

const Init = () => {
  useMenuStore().updateHeader({
    namePath: "Hàng hóa / Sửa",
  });
};
</script>
