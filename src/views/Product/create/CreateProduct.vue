<template>
  <div>
    <a-form
      :model="formState"
      ref="form_create_data"
      name="basic"
      :form="form"
      autocomplete="off"
      :label-col="{
        style: {
          width: '150px',
          textAlign: 'left',
        },
      }"
      :wrapper-col="{ span: 12, xxl: 6 }"
      @finish="onFinish"
    >
      <Action
        :handle-exit="onClickExit"
        :tab-index-save="13"
        :tab-index-exit="14"
      />
      <div style="padding: 8px; height: 80vh; overflow-y: scroll">
        <div>
          <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN CƠ BẢN</p>
          <RadioForm
            :options="options.optionsStatus"
            :form-state="formState"
            :tab-index="1"
            :item="{
              label: $t('product.ACTION.BUSINESS_STATUS'),
              value: 'status',
            }"
          />
          <InputForm
            :rules="[
              {
                required: true,
                message: 'Vui lòng không bỏ trống dữ liệu dữ liệu tên!',
              },
            ]"
            :item="{
              label: $t('product.ACTION.NAME_PRODUCT'),
              value: 'name',
            }"
            :input-ref="inputName"
            v-bind:model-value="formState.name"
            :form-sate="formState"
            @press-enter.prevent="handlePressEnterName"
            :is-disable="isDisable"
            :tab-index="2"
          />
          <SelectForm
            :item="{
              label: $t('product.ACTION.GROUP_PRODUCT'),
              value: 'group',
            }"
            :style="{ width: 200 }"
            :form-sate="formState"
            :options="options.optionsGroup"
            :is-disable="isDisable"
            :tab-index="3"
          />
          <InputForm
            :item="{
              label: $t('product.ACTION.CODE_SKU'),
              value: 'codeSKU',
            }"
            :model-value="formState.codeSKU"
            @press-enter="handlePressEnterCodeSKU"
            :style="{ width: 200 }"
            :form-sate="formState"
            :is-disable="isDisable"
            :tab-index="4"
            :rules="[
              {
                required: true,
                message: 'Vui lòng không bỏ trống dữ liệu dữ liệu mã SKU!',
              },
            ]"
          />
          <InputForm
            :item="{
              label: $t('product.ACTION.PRICE'),
              value: 'price',
            }"
            :rules="[
              {
                validator: validateNumber,
                message: $t('product.ACTION.ERROR_VALID_NUMBER'),
              },
            ]"
            :model-value="formState.price"
            :style="{ width: 200 }"
            :form-sate="formState"
            :is-disable="false"
            :tab-index="5"
          />
          <InputForm
            :item="{
              label: $t('product.ACTION.SELL'),
              value: 'sell',
            }"
            :model-value="formState.sell"
            :style="{ width: 200 }"
            :form-sate="formState"
            :is-disable="false"
            :tab-index="6"
            :rules="[
              {
                validator: validateNumber,
                message: $t('product.ACTION.ERROR_VALID_NUMBER'),
              },
            ]"
          />
          <SelectForm
            :-on-change="handleChangeUnit"
            :item="{
              label: $t('product.ACTION.UNIT'),
              value: 'unit',
            }"
            :style="{ width: 200 }"
            :options="options.optionsUnit"
            :form-sate="formState"
            :is-disable="isDisable"
            :tab-index="7"
          />
          <CheckboxForm
            :checked="formState.isHide"
            :text="$t('product.ACTION.IS_SHOW_SCREEN')"
            :item="{
              value: 'isHide',
            }"
            :options="options.optionsiSHide"
            v-on:change="handleChangeIsHide"
            :form-sate="formState"
            :tab-index="8"
          />
        </div>
        <div>
          <p style="padding-bottom: 8px; font-weight: 600">
            {{ $t("product.ACTION.INFO_ATRIBUTES") }}
          </p>
          <SelectForm
            :is-mode-tag="true"
            :-on-change="handleChangeColor"
            :item="{
              label: $t('product.ACTION.ATRIBUTES'),
              value: 'color',
            }"
            :options="selectedRowKeys"
            :value="formState.color"
            :style="{ width: 200 }"
            :form-sate="formState"
            :tab-index="9"
            :is-disabled-atribute="isDisabledAtribute"
          />
          <TableForm
            :is-action="true"
            :handle-delete-row="handleDeleteRow"
            :handle-save="handleSave"
            :handle-edit="handleEdit"
            :items="optionAtributes"
            :column-key="columnValue"
            :editable-data="editableData"
            :style="{
              width: '100%',
            }"
            :columns="options.columnsAtributes"
            :item="{
              label: $t('product.ACTION.DETAIL_ATRIBUTES'),
              name: 'detail',
            }"
          />
        </div>
        <div>
          <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN BỔ SUNG</p>
          <InputForm
            :item="{
              label: $t('product.ACTION.DESCRIPTION'),
              value: 'description',
            }"
            :is-textarea="true"
            :max-length="200"
            :placeholder="$t('product.ACTION.ERROR_MAX_LENGTH')"
            :rows="3"
            :model-value="formState.description"
            :form-sate="formState"
            :style="{ width: 200, height: '150px' }"
            :tab-index="10"
          />
          <UploadForm
            :item="{
              label: $t('product.ACTION.IMAGE_PRODUCT'),
              value: 'image',
            }"
            :handle-image-selected="handleImageSelected"
            :image-url="imageUrl"
            :tab-index="10"
          />
        </div>
      </div>

      <Action
        :is-first="true"
        :handle-exit="onClickExit"
        :tab-index-save="11"
        :tab-index-exit="12"
      />
    </a-form>
  </div>
</template>
<script setup>
import actionProduct from "../actionProduct";
const {
  formState,
  options,
  optionAtributes,
  selectedRowKeys,
  onClickExit,
  onFinish,
  handleChangeIsHide,
  handleImageSelected,
  handlePressEnterName,
  handlePressEnterCodeSKU,
  handleChangeUnit,
  handleChangeColor,
  handleDeleteRow,
  handleEdit,
  handleSave,
  Action,
  InputForm,
  TableForm,
  SelectForm,
  RadioForm,
  CheckboxForm,
  UploadForm,
  validateNumber,
  form,
  imageUrl,
  isDisabledAtribute,
  inputName,
  isDisable,
  columnValue,
  editableData,
} = actionProduct({ action: "create", namePath: "Thêm mới" });
</script>
