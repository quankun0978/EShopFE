<template>
  <a-config-provider
    :theme="{
      token: selectTheme,
    }"
  >
    <a-form-item :label="item.label && item.label">
      <a-form-item :name="item.name && item.name">
        <label :tabindex="tabIndex" for="image-upload" class="upload-custom">
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: 4px;
            "
          >
            <IconPencil /> Bieu tuong
          </div>
          <IconOpenDocument />
          <div
            style="
              width: 40px;
              margin: 0 auto;
              background-color: #026b97;
              padding: 4px;
              color: #fff;
              text-align: center;
            "
          >
            ..
          </div>
          <img
            class="image"
            v-if="imageUrl"
            :src="imageUrl"
            v-show="imageUrl"
            alt="Avatar"
          />
        </label>
      </a-form-item>
    </a-form-item>
    <input
      hidden
      type="file"
      name="image"
      id="image-upload"
      @change="handleImageSelected"
    />
  </a-config-provider>
</template>
<script setup>
// theme
import selectTheme from "@/config/select";
//icon
import IconOpenDocument from "@/components/icons/IconOpenDocument.vue";
import IconPencil from "@/components/icons/IconPencil.vue";
// styles
import "./UploadForm.scss";
const props = defineProps({
  options: Array,
  placeholder: String,
  style: Object,
  defaultValue: String,
  OnChange: Function,
  dragger: Object,
  item: Object,
  handleImageSelected: Function,
  imageUrl: String,
  tabIndex: Number, // Thêm tabIndex vào props
});
</script>
