<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      :label="item.label && item.label"
      :name="item.name && item.name"
      :rules="rules"
    >
      <a-select
        v-if="isModeTag"
        :placeholder="placeholder"
        :style="style"
        mode="tags"
      />
      <a-select
        v-else
        v-model:value="val"
        :placeholder="placeholder"
        :style="style"
        :options="options"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { DownOutlined } from "@ant-design/icons-vue";
import { Item } from "ant-design-vue/es/menu";
import { ref } from "vue";

const props = defineProps({
  value: String,
  placeholder: String,
  item: Object,
  rules: Array,
  options: Array,
  style: Object,
  mode: String,
  isModeTag: Boolean,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const val = ref(props.value);
</script>
