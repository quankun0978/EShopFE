<template>
  <a-config-provider
    :theme="{
      token: selectTheme,
    }"
  >
    <a-select
      v-model:value="value"
      :placeholder="placeholder"
      :style="style"
      :options="items"
    >
      <!-- <template #dropdownRender="{ menuNode: menu }">
        <v-nodes :vnodes="menu" />
        <a-divider style="margin: 4px 0" />
        <a-space style="padding: 4px 8px">
          <a-input
            ref="inputRef"
            v-model:value="name"
            placeholder="Please enter item"
          />
          <a-button type="text" @click="addItem">
            <template #icon>
              <plus-outlined />
            </template>
            Add item
          </a-button>
        </a-space>
      </template> -->
    </a-select>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";
import selectTheme from "@/config/select";
const props = defineProps({
  options: Array,
  placeholder: String,
  style: Object,
  defaultValue: String,
});
let index = 0;
const items = ref(props.options);
const value = ref([props.defaultValue]);
const inputRef = ref();
const name = ref();
// const addItem = (e) => {
//   e.preventDefault();
//   console.log("addItem");
//   items.value.push(name.value || `New item ${(index += 1)}`);
//   name.value = "";
//   setTimeout(() => {
//     inputRef.value?.focus();
//   }, 0);
// };
</script>
<style></style>
