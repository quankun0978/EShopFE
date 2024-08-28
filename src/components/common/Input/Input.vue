<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-textarea
      v-if="isTextarea"
      :value="value"
      :placeholder="placeholder"
      :style="style"
      style="resize: none"
      @change="OnChange"
      :rows="rows"
      :maxlength="maxLength"
    />
    <a-input
      v-else
      :value="value"
      :placeholder="placeholder"
      :style="style"
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
  isTextarea: Boolean,
  rows: Number,
  maxLength: Number,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const val = ref(props.value);

const handleChange = (e) => {
  val.value = e.target.value;
};
</script>
