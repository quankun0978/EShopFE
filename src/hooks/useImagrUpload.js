import { ref, watch } from "vue";

export function useImageUpload() {
  let imageFile = ref("");
  let imageUrl = ref("");
  // xử lý khi chọn ảnh
  function handleImageSelected(event) {
    if (event.target.files.length === 0) {
      // imageFile.value = "";
      // imageUrl.value = "";
      return;
    }
    imageFile.value = event.target.files[0];
  }

  // xử lý khi xóa ảnh

  function clearImage() {
    imageFile.value = null; // Reset imageFile
    imageUrl.value = ""; // Reset imageUrl
  }

  watch(imageFile, (imageFileNew) => {
    if (!(imageFileNew instanceof File)) {
      return;
    }
    let fileReader = new FileReader();

    fileReader.readAsDataURL(imageFileNew);

    fileReader.addEventListener("load", () => {
      imageUrl.value = fileReader.result;
    });
  });

  return {
    imageFile,
    imageUrl,
    handleImageSelected,
    clearImage,
  };
}
