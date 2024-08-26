<template>
  <a-config-provider
    :theme="{
      token: {
        defaultBg: '#00b96b',
      },
    }"
  >
    <a-button
      @click="handleClick"
      style="background-color: rgb(0, 87, 123); color: #fff; height: 35px"
      v-if="isSave"
    >
      <MessageOutlined />
      {{ text }}
    </a-button>
    <a-button
      @click="handleClick"
      style="background-color: rgb(0, 87, 123); color: #fff; height: 35px"
      v-else-if="isExit"
    >
      <CloseOutlined />
      {{ text }}
    </a-button>
    <a-button @click="handleClick" style="border-radius: 0" v-else>
      {{ text }}
    </a-button>
  </a-config-provider>
</template>
<script setup>
import { ref } from "vue";

import { MessageOutlined, CloseOutlined } from "@ant-design/icons-vue";

const props = defineProps({
  text: String,
  style: Object,
  isSave: Boolean,
  isExit: Boolean,
  handleClick: Function,
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
<style>
/* .ant-btn-default {
  background-color: rgb(0, 87, 123);
  color: #fff;
  height: 35px;
} */
</style>
