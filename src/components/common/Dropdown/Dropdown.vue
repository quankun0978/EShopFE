<template>
  <a-config-provider
    :theme="{
      token: {}, // Sử dụng theme từ file config
    }"
  >
    <a-dropdown :trigger="['click']">
      <a
        style="color: black; font-weight: bold; font-size: smaller"
        class="ant-dropdown-link h4"
        @click.prevent
      >
        {{ name }}
        <DownOutlined />
      </a>

      <template #overlay>
        <a-menu>
          <a-menu-item v-for="item in items" :key="item.key">
            <a :href="item.href">{{ item.name }}</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-config-provider>
</template>
<script setup>
import { DownOutlined } from "@ant-design/icons-vue";
const props = defineProps({
  items: Array,
  name: String,
});
</script>
