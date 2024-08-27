<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-input
      :value="value"
      :placeholder="placeholder"
      :style="style"
      :wrapper-col="{ span: 8 }"
      @change="OnChange"
    />
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  value: String,
  placeholder: String,
  style: Object,
  OnChange: Function,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const val = ref(props.value);

const handleChange = (e) => {
  val.value = e.target.value;
};
</script>
