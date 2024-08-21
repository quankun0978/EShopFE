<script setup>
import { ref } from "vue";
import menuTheme from "@/config/themes/menu";
const props = defineProps({
  items: Array,
  selectedKeys: Array,
  class: String,
  style: Object,
});
const keySelect = ref(props.selectedKeys);

const onChange = (key) => {
  keySelect.value = key.keyPath;
};
</script>
<template>
  <a-config-provider
    :theme="{
      token: menuTheme,
    }"
  >
    <a-menu
      style="background-color: #00577b"
      :class="class"
      :selectedKeys="keySelect"
      theme="dark"
      mode="inline"
      :items="props.items"
      @click="onChange"
    >
    </a-menu>
  </a-config-provider>
</template>
<style></style>
