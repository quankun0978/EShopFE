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
        <p class="title-form">
          {{ $t("product.ACTION.BASIC_INFOMATION") }}
        </p>
        <RadioForm
          :is-disable="isDisable"
          :options="options.optionsStatus"
          :form-state="formState"
          :on-change="handleChangeStatus"
          :item="{
            label: $t('product.ACTION.BUSINESS_STATUS'),
            value: 'status',
          }"
        />
        <InputForm
          :item="{
            label: $t('product.ACTION.NAME_PRODUCT'),
            value: 'name',
          }"
          @press-enter="handlePressEnterName"
          v-bind:model-value="formState.name"
          :form-sate="formState"
          :is-disable="isDisable"
          :is-required="true"
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
          :is-disable="false"
          :is-required="true"
        />
        <InputForm
          :item="{
            label: $t('product.ACTION.PRICE'),
            value: 'price',
          }"
          :model-value="formState.price"
          :style="{ width: 200 }"
          :form-sate="formState"
          :rules="[
            {
              validator: validateNumber,
              message: $t('product.ACTION.ERROR_VALID_NUMBER'),
            },
          ]"
          :is-disable="false"
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
        />
        <CheckboxForm
          :text="$t('product.ACTION.IS_SHOW_SCREEN')"
          :item="{
            value: $t('product.ACTION.YES'),
          }"
          :options="options.optionsiSHide"
          :form-sate="formState"
          :on-change="handleChangeIsHide"
        />
      </div>
      <div>
        <p class="title-atributes-form">
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
        <p class="title-form">
          {{ $t("product.ACTION.ADDITIONAL_INFOMATION") }}
        </p>
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
        />
        <UploadForm
          :item="{
            label: $t('product.ACTION.IMAGE_PRODUCT'),
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
import actionProduct from "../actionProduct";
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
  isDisabledAtribute,
  handleChangeStatus,
  form,
  columnValue,
  editableData,
  options,
} = actionProduct({ action: "coppy", namePath: "nhân bản" });
</script>
<style lang="scss" scoped>
@import "../ActionProduct.scss";
</style>
