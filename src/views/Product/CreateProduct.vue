<template>
  <div>hello create product</div>
</template>
<script setup>
import { useMenuStore } from "@/store/menu";
import { onMounted } from "vue";

onMounted(() => {
  Init();
});

const Init = () => {
  useMenuStore().updatePathName("Hang hoa / Them moi");
};
</script>
