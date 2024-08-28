<template>
  <a-config-provider
    :theme="{
      token: {
        borderRadius: 0,
      },
    }"
  >
    <a-form-item
      v-if="item.label"
      :label="item.label"
      :name="item.name"
      :rules="rules"
      style="width: 100%"
    >
      <a-table
        bordered
        :pagination="false"
        :columns="columns"
        :data-source="items"
        style="width: 50vw"
        :scroll="{ y: 230, scrollToFirstRowOnChange: true, x: 700 }"
      >
        {{ console.log("oke") }}
        <template v-if="isAction" #bodyCell="{ column, index, record }">
          {{ console.log("oke") }}
          <template v-if="column.key === 'action'">
            <FontAwesomeIcon
              :icon="faTrash"
              style="color: red; cursor: pointer"
            />
          </template>
          <template v-else>
            <div>
              {{ record[column.dataIndex] }}
            </div>
          </template>
        </template>
      </a-table>
    </a-form-item>
  </a-config-provider>
</template>

<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const props = defineProps({
  value: String,
  placeholder: String,
  item: Object,
  rules: Array,
  style: Object,
  columns: Array,
  items: Array,
  isAction: Boolean,
});

const val = ref(props.value);
const handleChange = (event) => {
  val.value = event.target.value;
};
</script>
