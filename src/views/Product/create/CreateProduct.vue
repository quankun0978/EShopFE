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
              label: $t('product.CREATE.BUSINESS_STATUS'),
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
              label: $t('product.CREATE.NAME_PRODUCT'),
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
              label: $t('product.CREATE.GROUP_PRODUCT'),
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
              label: $t('product.CREATE.CODE_SKU'),
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
              label: $t('product.CREATE.PRICE'),
              value: 'price',
            }"
            :rules="[
              {
                validator: validateNumber,
                message: 'Vui lòng nhập một số hợp lệ!',
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
              label: $t('product.CREATE.SELL'),
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
                message: 'Vui lòng nhập một số hợp lệ!',
              },
            ]"
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
            :text="'Hiển thị lên màn hình bán hàng'"
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
            {{ $t("product.CREATE.INFO_ATRIBUTES") }}
          </p>
          <SelectForm
            :is-mode-tag="true"
            :-on-change="handleChangeColor"
            :item="{
              label: $t('product.CREATE.ATRIBUTES'),
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
            :placeholder="'Vui lòng nhập tối đa 200 ký tự'"
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
import CreateProduct from "./createProduct.js";

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
} = CreateProduct();
</script>
