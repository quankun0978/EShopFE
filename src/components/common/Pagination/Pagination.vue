<template>
  <div class="pagination-custom">
    <div class="pagination-custom-container">
      <a-button
        @click="HandleClickNextFirstPage"
        :disabled="pagination.pageNumber === 1"
      >
        <DoubleLeftOutlined />
      </a-button>
      <a-button
        @click="HandleClickPrevPage"
        :disabled="pagination.pageNumber === 1"
      >
        <LeftOutlined />
      </a-button>
      <span>Trang</span>
      <a-button>{{
        paginationProp.pageNumber && paginationProp.pageNumber
      }}</a-button>
      <span
        >trên {{ paginationProp.totalPage && paginationProp.totalPage }}</span
      >
      <a-button
        @click="HandleClickNextPage"
        :disabled="paginationProp.pageNumber === paginationProp.totalPage"
      >
        <RightOutlined />
      </a-button>
      <a-button
        @click="HandleClickNextLastPage"
        :disabled="paginationProp.pageNumber === paginationProp.totalPage"
      >
        <DoubleRightOutlined />
      </a-button>
      <a-button @click="HandleClickRefreshPage">
        <SyncOutlined />
      </a-button>
      <a-select
        v-model:value="valPageSize"
        @change="HandleSelectChange"
        :options="
          paginationProp.optionPageSize && paginationProp.optionPageSize
            ? paginationProp.optionPageSize
            : []
        "
        style="width: 60px"
      ></a-select>
    </div>
    <div>
      Hiển thị
      {{
        pagination.pageNumber > 1
          ? valPageSize * (pagination.pageNumber - 1) + 1
          : 1
      }}-{{ pagination.pageSize && pagination.pageSize }} trên
      {{ pagination.totalRecord && pagination.totalRecord }} kết quả
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
//icon

import {
  DoubleLeftOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({
  paginationProp: Object,
  HandleSelectChange: Function,
  HandleClickNextPage: Function,
  HandleClickPrevPage: Function,
  HandleClickRefreshPage: Function,
  HandleClickNextLastPage: Function,
  HandleClickNextFirstPage: Function,
});
const pagination = props.paginationProp;
const valPageSize = ref(pagination.pageSize && pagination.pageSize);
</script>
<style lang="scss" scoped>
@import "./Pagination.scss";
</style>
