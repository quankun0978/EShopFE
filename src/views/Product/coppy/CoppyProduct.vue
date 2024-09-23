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
    <Action :handle-exit="onClickExit" />
    <div style="padding: 8px; height: 80vh; overflow-y: scroll">
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN CƠ BẢN</p>
        <RadioForm
          :is-disable="isDisable"
          :options="options.optionsStatus"
          :form-state="formState"
          :on-change="handleChangeStatus"
          :item="{
            label: getText('product', langStore.lang, 'business_status'),
            value: 'status',
          }"
        />
        <InputForm
          :rules="[{ required: true, message: 'Vui long nhap vao ten!' }]"
          :item="{
            label: getText('product', langStore.lang, 'name_product'),
            value: 'name',
          }"
          @press-enter="handlePressEnterName"
          v-bind:model-value="formState.name"
          :form-sate="formState"
          :is-disable="isDisable"
        />
        <SelectForm
          :item="{
            label: getText('product', langStore.lang, 'group_product'),
            value: 'group',
          }"
          :style="{ width: 200 }"
          :form-sate="formState"
          :options="options.optionsGroup"
          :is-disable="isDisable"
        />
        <InputForm
          :item="{
            label: getText('product', langStore.lang, 'codeSku'),
            value: 'codeSKU',
          }"
          :model-value="formState.codeSKU"
          @press-enter="handlePressEnterCodeSKU"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="false"
          :rules="[
            { required: true, message: 'Vui long không bỏ trống ma SKU!' },
          ]"
        />
        <InputForm
          :item="{
            label: getText('shared', langStore.lang, 'price'),
            value: 'price',
          }"
          :model-value="formState.price"
          :style="{ width: 200 }"
          :form-sate="formState"
          :rules="[
            {
              validator: validateNumber,
              message: 'Vui lòng nhập một số hợp lệ!',
            },
          ]"
          :is-disable="false"
        />
        <InputForm
          :item="{
            label: getText('shared', langStore.lang, 'sell'),
            value: 'sell',
          }"
          :model-value="formState.sell"
          :style="{ width: 200 }"
          :form-sate="formState"
          :is-disable="false"
          :rules="[
            {
              validator: validateNumber,
              message: 'Vui lòng nhập một số hợp lệ!',
            },
          ]"
        />
        <SelectForm
          :-on-change="handleChangeUnit"
          :item="{
            label: getText('shared', langStore.lang, 'unit'),
            value: 'unit',
          }"
          :style="{ width: 200 }"
          :options="options.optionsUnit"
          :form-sate="formState"
          :is-disable="isDisable"
        />
        <CheckboxForm
          :item="{
            value: getText('shared', langStore.lang, 'yes'),
          }"
          :options="options.optionsiSHide"
          :form-sate="formState"
          :on-change="handleChangeIsHide"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">
          {{ getText("product", langStore.lang, "info_atributes") }}
        </p>
        <SelectForm
          :is-mode-tag="true"
          :-on-change="handleChangeColor"
          :item="{
            label: getText('shared', langStore.lang, 'atributes'),
            value: 'color',
          }"
          :options="selectedRowKeys"
          :value="formState.color"
          :style="{ width: 200 }"
          :form-sate="formState"
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
          :columns="columns"
          :item="{
            label: getText('product', langStore.lang, 'detail_atributes'),
            name: 'detail',
          }"
        />
      </div>
      <div>
        <p style="padding-bottom: 8px; font-weight: 600">THÔNG TIN BỔ SUNG</p>
        <InputForm
          :item="{
            label: getText('shared', langStore.lang, 'description'),
            value: 'description',
          }"
          :is-textarea="true"
          :max-length="200"
          :placeholder="'Vui long nhap toi da 200 ky tu'"
          :rows="3"
          :model-value="formState.description"
          :form-sate="formState"
          :style="{ width: 200, height: '150px' }"
        />
        <UploadForm
          :item="{
            label: getText('product', langStore.lang, 'image_product'),
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
import CoppyProduct from "./coppyProduct.js";
const {
  formState,
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
  isDisable,
  RadioForm,
  CheckboxForm,
  UploadForm,
  validateNumber,
  imageUrl,
  langStore,
  isDisabledAtribute,
  getText,
  form,
  columnValue,
  editableData,
  options,
} = CoppyProduct();
</script>
