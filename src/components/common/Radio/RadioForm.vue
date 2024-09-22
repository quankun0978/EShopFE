<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      :name="item.value && item.value"
      :label="item.label && item.label"
      :rules="rules"
    >
      <a-radio-group
        :disabled="isDisable"
        :defaultValue="defaultValue"
        v-model:value="val"
        @change="onChange"
        :placeholder="placeholder"
        :tabindex="tabIndex"
      >
        <a-radio
          :tabindex="option.index"
          :key="option.value"
          @keydown.enter.prevent="() => handleChange(option.value)"
          :value="option.value"
          v-for="option in options"
          >{{ option.label }}</a-radio
        >
      </a-radio-group>
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  defaultValue: String,
  placeholder: String,
  item: Object,
  name: String,
  rules: Array,
  options: Array,
  value: String,
  formState: Object,
  isDisable: Boolean,
  onChange: Function,
  tabIndex: Number, // Thêm tabIndex vào props
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});

const val = ref(props.formState[props.item.value]);

const handleChange = (e) => {
  if (props.onChange) {
    // Kiểm tra xem onChange có phải là hàm không
    console.log(e);
    props.onChange(e); // Gọi hàm onChange với giá trị đã chọn
  }
};
</script>
