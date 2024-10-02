<template>
  <a-form
    :model="formState"
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
          :is-disable="isDisable"
          :options="options.optionsStatus"
          :form-state="formState"
          :on-change="handleChangeStatus"
          :item="{
            label: $t('product.CREATE.BUSINESS_STATUS'),
            value: 'status',
          }"
        />
        <InputForm
          :rules="[{ required: true, message: 'Vui long nhap vao ten!' }]"
          :item="{
            label: $t('product.CREATE.NAME_PRODUCT'),
            value: 'name',
          }"
          :tab-index="2"
          @press-enter="handlePressEnterName"
          v-bind:model-value="formState.name"
          :form-sate="formState"
          :is-disable="isDisable"
        />
        <SelectForm
          :item="{
            label: $t('product.CREATE.GROUP_PRODUCT'),
            value: 'group',
          }"
          :tab-index="3"
          :style="{ width: 200 }"
          :form-sate="formState"
          :options="options.optionsGroup"
          :is-disable="isDisable"
        />
        <InputForm
          :item="{
            label: $t('product.CREATE.CODE_SKU'),
            value: 'codeSKU',
          }"
          :model-value="formState.codeSKU"
          @press-enter="handlePressEnterCodeSKU"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="false"
          :tab-index="4"
          :rules="[
            { required: true, message: 'Vui long không bỏ trống mã SKU!' },
          ]"
        />
        <InputForm
          :item="{
            label: $t('product.CREATE.PRICE'),
            value: 'price',
          }"
          :model-value="formState.price"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="false"
          :tab-index="5"
          :rules="[
            {
              validator: validateNumber,
              message: 'Vui lòng nhập một số hợp lệ!',
            },
          ]"
        />
        <InputForm
          :item="{
            label: $t('product.CREATE.SELL'),
            value: 'sell',
          }"
          :rules="[
            {
              validator: validateNumber,
              message: 'Vui lòng nhập một số hợp lệ!',
            },
          ]"
          :model-value="formState.sell"
          :style="{ width: 200 }"
          :form-sate="formState"
          :tab-index="6"
        />
        <SelectForm
          :-on-change="handleChangeUnit"
          :item="{
            label: $t('product.CREATE.UNIT'),
            value: 'unit',
          }"
          :style="{ width: 200 }"
          :options="options.optionsUnit"
          :form-sate="formState"
          :is-disable="isDisable"
          :tab-index="7"
        />
        <CheckboxForm
          :item="{
            value: $t('product.UPDATE.YES'),
          }"
          :options="options.optionsiSHide"
          :form-sate="formState"
          :on-change="handleChangeIsHide"
          :tab-index="8"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">
          {{ $t("product.CREATE.INFO_ATRIBUTES") }}
        </p>
        <SelectForm
          :is-mode-tag="true"
          :-on-change="handleChangeColor"
          :item="{
            label: $t('product.CREATE.ATRIBUTES'),
            value: 'color',
          }"
          :tab-index="9"
          :options="selectedRowKeys"
          :value="formState.color"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disabled-atribute="formState.isParent !== 1"
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
            label: $t('product.CREATE.DETAIL_ATRIBUTES'),
            name: 'detail',
          }"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN BỔ SUNG</p>
        <InputForm
          :item="{
            label: $t('product.CREATE.DESCRIPTION'),
            value: 'description',
          }"
          :is-textarea="true"
          :max-length="200"
          :placeholder="'Vui long nhập tối đa 200 ký tự'"
          :rows="3"
          :model-value="formState.description"
          :form-sate="formState"
          :style="{ width: 200, height: '150px' }"
          :tab-index="10"
        />
        <UploadForm
          :item="{
            label: $t('product.CREATE.IMAGE_PRODUCT'),
            value: 'image',
          }"
          :handle-image-selected="handleImageSelected"
          :image-url="imageUrl"
        />
      </div>
    </div>

    <Action :is-first="true" :handle-exit="onClickExit" />
  </a-form>
</template>
<script setup>
import UpdateProduct from "./updateProduct";
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
  isDisable,
  columnValue,
  handleChangeStatus,
  editableData,
} = UpdateProduct();
</script>
