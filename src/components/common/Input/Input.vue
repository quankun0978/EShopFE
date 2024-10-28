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
      v-else-if="isNumber"
      v-model:value="valueRefNumber"
      @pressEnter.prevent="handlePressEnter"
      @change="onChangeNumber"
      :style="style"
    />
    <a-input
      v-else
      :value="value"
      :placeholder="placeholder"
      :style="style"
      @change="OnChange"
      @pressEnter="handlePressEnter"
    />
  </a-config-provider>
</template>
<script setup>
import { convertNumber, isNumeric } from "@/helpers/Funcs/helper";
import { ref } from "vue";

const props = defineProps({
  value: String,
  placeholder: String,
  style: Object,
  OnChange: Function,
  isTextarea: Boolean,
  isNumber: Boolean,
  rows: Number,
  maxLength: Number,
  handlePressEnter: Function,
});

const valueRefNumber = ref(props.value);

const onChangeNumber = (e) => {
  valueRefNumber.value = convertNumber(e.target.value);
};
</script>
