<template>
  <a-form
    :model="formState"
    name="basic"
    style="display: flex; flex-direction: column; height: 90vh"
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
    <div style="padding: 8px; overflow-y: auto">
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
          :is-required="true"
          :tab-index="2"
          @press-key-down="handlePressEnterName"
          :form-sate="formState"
          :is-disable="isDisable"
        />
        <SelectForm
          :item="{
            label: $t('product.ACTION.GROUP_PRODUCT'),
            value: 'group',
          }"
          :tab-index="3"
          :form-sate="formState"
          :options="options.optionsGroup"
          :is-disable="isDisable"
        />
        <InputForm
          :item="{
            label: $t('product.ACTION.CODE_SKU'),
            value: 'codeSKU',
          }"
          @press-enter="handlePressEnterCodeSKU"
          :form-sate="formState"
          :is-disable="false"
          :tab-index="4"
          :is-required="true"
        />
        <InputForm
          :item="{
            label: $t('product.ACTION.PRICE'),
            value: 'price',
          }"
          :style="{ textAlign: 'end' }"
          :form-sate="formState"
          :is-disable="optionAtributes.length > 0"
          :is-number="true"
          :tab-index="5"
        />
        <InputForm
          :item="{
            label: $t('product.ACTION.SELL'),
            value: 'sell',
          }"
          :style="{ textAlign: 'end' }"
          :form-sate="formState"
          :is-disable="optionAtributes.length > 0"
          :is-number="true"
          :tab-index="6"
        />
        <SelectForm
          :-on-change="handleChangeUnit"
          :item="{
            label: $t('product.ACTION.UNIT'),
            value: 'unit',
          }"
          :options="options.optionsUnit"
          :form-sate="formState"
          :is-disable="isDisable"
          :tab-index="7"
        />
        <CheckboxForm
          :text="$t('product.ACTION.IS_SHOW_SCREEN')"
          :item="{
            value: 'isHide',
          }"
          :options="options.optionsiSHide"
          :form-sate="formState"
          :on-change="handleChangeIsHide"
          :tab-index="8"
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
          :tab-index="9"
          :options="selectedRowKeys"
          :value="formState.color"
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
        />
      </div>
    </div>

    <Action
      :style="{
        position: 'fixed',
        bottom: '0',
      }"
      :handle-exit="onClickExit"
      :tab-index-save="13"
      :tab-index-exit="14"
    />
  </a-form>
</template>
<script setup>
import { useRoute } from "vue-router";
import actionProduct from "./actionProduct";
import { getNamePath } from "@/helpers/Funcs/helper";
const route = useRoute();
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
  form,
  imageUrl,
  isDisable,
  columnValue,
  handleChangeStatus,
  editableData,
} = actionProduct({
  action: route.name,
  namePath: getNamePath(route.name),
  route: route,
});
</script>
<style lang="scss" scoped>
@import "./ActionProduct.scss";
</style>
