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
                v-if="editableData[record.codeSKU] && column.key === columnKey"
                class="editable-cell-input-wrapper"
              >
                <a-input
                  v-model:value="editableData[record.codeSKU][column.key]"
                  @pressEnter.prevent="
                    handleSave(record.codeSKU, columnKey, index)
                  "
                />
              </div>

              <div
                @click="handleEdit(record.codeSKU, column.key)"
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
});
</script>
