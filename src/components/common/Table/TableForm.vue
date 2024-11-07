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
        <template v-if="isAction" #bodyCell="{ column, text, record, index }">
          <template v-if="column.key === 'action'">
            <FontAwesomeIcon
              @click="() => handleDeleteRow(record.codeSKU)"
              :icon="faTrash"
              style="color: red; cursor: pointer"
            />
          </template>
          <template v-else>
            <div class="editable-cell">
              <div
                v-if="
                  editableData[record.codeSKU] &&
                  column.key === columnKey &&
                  indexCurrent === index
                "
                class="editable-cell-input-wrapper"
              >
                <a-input
                  v-if="column.key !== 'price' && column.key !== 'sell'"
                  v-model:value="editableData[record.codeSKU][column.key]"
                  @pressEnter.prevent="
                    handleSave(record.codeSKU, columnKey, index)
                  "
                />
                <Input
                  @changeNumber="
                    (v) => handleChangeNumber(v, record.codeSKU, column.key)
                  "
                  v-else
                  :is-number="true"
                  :form-sate="editableData"
                  :item="{
                    value: column.key,
                  }"
                  :keyword="record.codeSKU"
                  :value="editableData[record.codeSKU][column.key]"
                  :handle-press-enter="
                    () => handleSave(record.codeSKU, columnKey, index)
                  "
                />
              </div>

              <div
                @click="handleEdit(record.codeSKU, column.key, index)"
                v-else
                class="editable-cell-text-wrapper"
              >
                {{
                  column.isNumber
                    ? convertNumber(record[column.dataIndex])
                    : record[column.dataIndex]
                }}
              </div>
            </div>
          </template>
        </template>
      </a-table>
    </a-form-item>
  </a-config-provider>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { convertNumber } from "@/helpers/Funcs/helper";
import Input from "../Input/Input.vue";

const props = defineProps({
  value: String,
  placeholder: String,
  item: Object,
  rules: Array,
  style: Object,
  columns: Array,
  items: Array,
  isAction: Boolean,
  handleDeleteRow: Function,
  handleSave: Function,
  handleEdit: Function,
  editableData: Object,
  columnKey: String,
  indexCurrent: Number,
});

// xử lý format dữ liệu

const handleChangeNumber = (v, key, column) => {
  if (v === "") {
    Object.assign(
      props.items.filter((item) => key === item.codeSKU)[0],
      props.editableData[key]
    );
  } else {
    props.editableData[key][column] = convertNumber(v);
    Object.assign(
      props.items.filter((item) => key === item.codeSKU)[0],
      props.editableData[key]
    );
  }
};
</script>
