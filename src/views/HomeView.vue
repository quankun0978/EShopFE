<template>
  <a-layout>
    <Sider />
    <a-layout>
      <Header />
      <a-layout-content :style="{ margin: '8px' }">
        <div :style="{ background: '#fff' }">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import Sider from "@/components/layout/Sider.vue";
import Header from "@/components/layout/Header.vue";
</script>
<style scoped></style>
