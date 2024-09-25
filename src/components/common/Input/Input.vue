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
      @pressEnter="handlePressEnter"
    />
  </a-config-provider>
</template>
<script setup>
const props = defineProps({
  value: String,
  placeholder: String,
  style: Object,
  OnChange: Function,
  isTextarea: Boolean,
  rows: Number,
  maxLength: Number,
  handlePressEnter: Function,
});
</script>
