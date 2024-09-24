<template>
  <a-layout>
    <Sider />
    <a-layout>
      <Header />
      <a-layout-content :style="{ margin: '8px', height: '80vh' }">
        <div :style="{ background: '#fff' }">
          <RouterView />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import Sider from "@/components/layout/Sider/Sider.vue";
import Header from "@/components/layout/Header/Header.vue";
</script>
