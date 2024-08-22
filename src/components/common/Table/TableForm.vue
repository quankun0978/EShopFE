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
      style="width: 100%"
    >
      <a-table
        bordered="bordered"
        :columns="columns"
        :items="items"
        style="width: 75vw"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";
import Table from "./Table.vue";
const props = defineProps({
  value: String,
  placeholder: String,
  item: Object,
  rules: Array,
  style: Object,
  columns: Array,
  items: Array,
  // Hoặc định dạng khác tùy thuộc vào dữ liệu bạn muốn nhận
});
const val = ref(props.value);
const handleChange = (event) => {
  val.value = event.target.value;
};
</script>
