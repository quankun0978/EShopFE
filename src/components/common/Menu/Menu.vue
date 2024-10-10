<template>
  <a-config-provider
    :theme="{
      token: menuTheme,
    }"
  >
    <a-menu
      :style="style"
      class="menu-custom"
      :class="className"
      :selectedKeys="keySelect"
      theme="dark"
      mode="inline"
      :items="props.items"
      @click="onChange"
    >
    </a-menu>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";
// theme
import menuTheme from "@/config/themes/menu";

const props = defineProps({
  items: Array,
  selectedKeys: Array,
  className: String,
  style: Object,
});

const keySelect = ref(props.selectedKeys);

const onChange = (key) => {
  keySelect.value = key.keyPath;
};
</script>
<style lang="scss" scoped>
@import "./Menu.scss";
</style>
