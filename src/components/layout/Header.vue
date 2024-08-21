<template>
  <a-layout-header
    :style="{
      background: '#fff',
      paddingLeft: '8px',
      paddingRight: '0px',
    }"
  >
    <div style="display: flex; justify-content: space-between">
      <h3 style="display: flex; align-items: center">
        {{ menuStore.namePath }}
      </h3>
      <a-space style="display: flex; align-items: center; ">
        <a-space
          direction="horizontal"
          style="display: flex; align-items: center"
        >
          <ArrowLeftOutlined />
          <span class="span">Quay lại trang bắt đầu sử dụng</span>
        </a-space>
        <Select
          :options="options"
          :style="{
            width: '100px',
          }"
        />
        <a-avatar :size="24">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <Dropdown name="Hien Nguyen Trong" />
        <Segment :items="segments" :default-selected-key="'user1'" />
      </a-space>
    </div>
  </a-layout-header>
</template>

<script setup>
import Select from "../common/Select/Select.vue";
import Dropdown from "../common/Dropdown/Dropdown.vue";
import Segment from "../common/Segment/Segment.vue";
import {
  ArrowLeftOutlined,
  UserOutlined,
  WhatsAppOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";
import { h, onMounted } from "vue";
import { useMenuStore } from "@/store/menu";
const options = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "disabled",
    label: "Disabled",
    disabled: true,
  },
  {
    value: "yiminghe",
    label: "Yiminghe",
  },
];

const segments = [
  {
    value: "user1",
    payload: {
      icon: WhatsAppOutlined,

      // src: "https://joeschmoe.io/api/v1/random",
      style: {
        // backgroundColor: "#f56a00",
      },
    },
  },
  {
    value: "user2",
    payload: {
      icon: BellOutlined,

      // style: {
      //   backgroundColor: "#f56a00",
      // },
    },
  },
  {
    value: "user3",
    payload: {
      icon: QuestionCircleOutlined,
      // style: {
      //   backgroundColor: "#f56a00",
      // },
    },
  },
];

const menuStore = useMenuStore();
</script>
<style>
.ant-space-item {
  display: flex;
  align-items: center;
}
</style>
