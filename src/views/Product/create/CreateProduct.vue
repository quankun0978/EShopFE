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
              label: getText('product', langStore.lang, 'business_status'),
              value: 'status',
            }"
          />
          <InputForm
            :rules="[
              { required: true, message: 'Vui long không bỏ trống tên!' },
            ]"
            :item="{
              label: getText('product', langStore.lang, 'name_product'),
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
              label: getText('product', langStore.lang, 'group_product'),
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
              label: getText('product', langStore.lang, 'codeSku'),
              value: 'codeSKU',
            }"
            :model-value="formState.codeSKU"
            @press-enter="handlePressEnterCodeSKU"
            :style="{ width: 200 }"
            :form-sate="formState"
            :is-disable="isDisable"
            :tab-index="4"
            :rules="[
              { required: true, message: 'Vui long không bỏ trống mã SKU!' },
            ]"
          />
          <InputForm
            :item="{
              label: getText('shared', langStore.lang, 'price'),
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
              label: getText('shared', langStore.lang, 'sell'),
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
              label: getText('shared', langStore.lang, 'unit'),
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
            :tab-index="10"
          />
          <UploadForm
            :item="{
              label: getText('product', langStore.lang, 'image_product'),
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
import CreateProduct from "./CreateProduct";

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
  getText,
  isDisabledAtribute,
  langStore,
  inputName,
  isDisable,
  columnValue,
  editableData,
} = CreateProduct();
</script>
