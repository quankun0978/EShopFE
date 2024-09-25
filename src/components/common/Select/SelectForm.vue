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
        v-model:value="items"
        :placeholder="placeholder"
        :style="style"
        :disabled="isDisabledAtribute"
        mode="tags"
        ref="selectRef"
        :tabindex="tabIndex"
        :open="dropdownOpen"
        @blur="closeDropdown"
        @change="(e) => handleChange(e)"
        @keydown.enter.prevent="showDropdown"
        @click="showDropdown"
      />
      <a-select
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        :placeholder="placeholder"
        :style="style"
        :options="options"
        :disabled="isDisable"
        :tabindex="tabIndex"
        ref="selectRef"
        :open="dropdownOpen"
        @keydown.enter.prevent="showDropdown"
        @click="showDropdown"
        @blur="closeDropdown"
        @change="(e) => handleChange(e)"
      />
    </a-form-item>
  </a-config-provider>
</template>
<script setup>
import { ref, watchEffect } from "vue";

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
  isDisable: Boolean,
  isDisabledAtribute: Boolean,
  tabIndex: Number,
});
const items = ref(props.options);
const selectRef = ref(null);
const dropdownOpen = ref(false);

watchEffect(() => {
  if (props.options) {
    items.value = props.options;
  }
});
const showDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value; // Chuyển đổi trạng thái mở dropdown
};
const closeDropdown = () => {
  dropdownOpen.value = false; // Chuyển đổi trạng thái mở dropdown
};

const handleChange = (e) => {
  dropdownOpen.value = false;
  if (props.OnChange) {
    // Kiểm tra xem onChange có phải là hàm không
    props.OnChange(e); // Gọi hàm onChange với giá trị đã chọn
  }
};
</script>
