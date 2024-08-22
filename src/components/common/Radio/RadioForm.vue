<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      :name="item.name && item.name"
      :label="item.label && item.label"
      :rules="rules"
    >
      <a-radio-group
        :defaultValue="defaultValue"
        :value="val"
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
import { DownOutlined } from "@ant-design/icons-vue";
import { Item } from "ant-design-vue/es/menu";
import { ref } from "vue";
const props = defineProps({
  defaultValue: String,
  placeholder: String,
  item: Object,
  name: String,
  rules: Array,
  options: Array,
  value: String,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});

const val = ref(props.value);

const handleChange = (event) => {
  val.value = event.target.value;
};
</script>
