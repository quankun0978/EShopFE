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
        :defaultValue="defaultValue"
        v-model:value="formState[`${item && item.value && item.value}`]"
        @change="handleChange"
        :placeholder="placeholder"
      >
        <a-radio :value="option.value" v-for="option in options">{{
          option.label
        }}</a-radio>
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
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});

const val = ref(props.value);

const handleChange = (event) => {
  val.value = event.target.value;
};
</script>
