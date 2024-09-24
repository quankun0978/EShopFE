<template>
  <a-config-provider
    :theme="{
      components: {
        Button: {
          colorPrimary: '#026b97',
          borderRadius: 0,
          colorPrimaryHover: 'rgb(0, 87, 123)',
        },
      },
    }"
  >
    <a-button
      style="height: 35px"
      v-if="isSave"
      type="primary"
      html-type="submit"
      :tabindex="tabIndex"
    >
      <FontAwesomeIcon :icon="faFloppyDisk" style="margin-right: 4px" />
      {{ text }}
    </a-button>
    <a-button
      :tabindex="tabIndex"
      @click="handleClick"
      style="height: 35px"
      v-else-if="isExit"
    >
      <CloseOutlined />
      {{ text }}
    </a-button>
    <a-button :tabindex="tabIndex" @click="handleClick" v-else>
      {{ text }}
    </a-button>
  </a-config-provider>
</template>
<script setup>
// icon
import { CloseOutlined } from "@ant-design/icons-vue";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  text: String,
  style: Object,
  isSave: Boolean,
  isExit: Boolean,
  handleClick: Function,
  tabIndex: Number,
});
</script>
