<template>
  <a-config-provider
    :theme="{
      token: selectTheme,
    }"
  >
    <a-form-item :label="item.label && item.label">
      <a-form-item :name="item.name && item.name">
        <label
          :tabindex="tabIndex"
          for="image-upload"
          class="upload-custom"
          @keydown.enter.prevent="handleOpen"
        >
          <div
            style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: 4px;
            "
          >
            <IconPencil /> {{ text }}
          </div>
          <IconOpenDocument />
          <div class="upload-custom-box">..</div>
          <img
            class="image"
            v-if="imageUrl"
            :src="imageUrl"
            v-show="imageUrl"
            alt="ảnh hàng hóa"
          />
          <!-- <div v-if="imageUrl" class="action-upload">
            <a-button @click="handleOpen" type="primary">...</a-button>
            <a-button @click="handleCancel" type="primary" danger>x</a-button>
          </div> -->
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
  text: String,
  placeholder: String,
  style: Object,
  defaultValue: String,
  dragger: Object,
  item: Object,
  handleImageSelected: Function,
  handleCancel: Function,
  isImage: {
    type: Boolean,
    default: false,
  },
  imageUrl: String,
  tabIndex: Number, // Thêm tabIndex vào props
});

// xử lý mở cửa sổ chọn file
const handleOpen = () => {
  document.getElementById("image-upload").click();
};
</script>
