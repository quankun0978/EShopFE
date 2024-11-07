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
        :filter-option="filterOption"
        mode="tags"
        :tabindex="tabIndex"
        :open="false"
        @change="(e) => handleChange(e)"
        show-search
      />
      <!-- <a-select
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        :placeholder="placeholder"
        :style="style"
        :options="options"
        :disabled="isDisable"
        :tabindex="tabIndex"
        ref="selectRef"
        :open="dropdownOpen"
        :filter-option="filterOption"
        @keydown.prevent="showDropdown"
        @click="showDropdown"
        @blur="closeDropdown"
        show-search
        @change="(e) => handleChange(e)"
      /> -->
      <a-select
        v-else
        v-model:value="formSate[`${item && item.value && item.value}`]"
        :placeholder="placeholder"
        :style="style"
        :options="options"
        :disabled="isDisable"
        :tabindex="tabIndex"
        :filter-option="filterOption"
        show-search
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
const dropdownOpen = ref(false);

watchEffect(() => {
  if (props.options) {
    items.value = props.options;
  }
});

// xử lý sự kiện change khi người dùng thao tác với select

const handleChange = (e) => {
  dropdownOpen.value = false;
  if (props.OnChange) {
    // Kiểm tra xem onChange có phải là hàm không
    props.OnChange(e); // Gọi hàm onChange với giá trị đã chọn
  }
};

// thực hiện tìm kiếm khi người dùng gõ trên select

const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
