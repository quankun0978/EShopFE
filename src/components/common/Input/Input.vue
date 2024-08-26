<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-input
      :value="val"
      :placeholder="placeholder"
      :style="style"
      :wrapper-col="{ span: 8 }"
      @change=""
    />
  </a-config-provider>
</template>
<script setup>
import { DownOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
const props = defineProps({
  value: String,
  placeholder: String,
  style: Object,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const val = ref(props.value);
const OnChange = (e) => {
  val.value = e.target.value;
};
console.log(val);
</script>
