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
      :name="item.value && item.value"
      :rules="rules"
    >
      <a-select
        v-if="isModeTag"
        :placeholder="placeholder"
        :style="style"
        mode="tags"
        @change="OnChange"
      />
      <a-select
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        :placeholder="placeholder"
        :style="style"
        :options="options"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
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
  formSate: Object,
  OnChange: Function,

  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const val = ref(props.value);
</script>
