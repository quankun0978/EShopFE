import { HTTP_PATH_API } from "./apiConfig";
import axios from "./axios";
import { source } from "./axios";
// api lấy ra danh sách hàng hóa

export const getAllProduct = async (data) => {
  return await axios.post(HTTP_PATH_API.PRODUCT_LIST, data);
};

// api lấy ra  hàng hóa theo mã sku

export const getProductByCodeSku = async (id) => {
  return await axios.get(`${HTTP_PATH_API.PRODUCT_DETAIL}=${+id}`);
};

// api thêm mới ra hàng hóa

export const createProduct = async (data) => {
  return await axios.post(HTTP_PATH_API.PRODUCT_ADD, data);
};

// api cập nhật hàng hóa

export const updateProduct = async (data) => {
  return await axios.post(HTTP_PATH_API.PRODUCT_UPDATE, data);
};

// api xóa hàng hóa

export const deleteProduct = async (data) => {
  return await axios.post(HTTP_PATH_API.PRODUCT_DELETE, data);
};

// api generate mã sku

export const generateSKU = async (productName) => {
  return await axios.post(
    HTTP_PATH_API.PRODUCT_GENERATE_SKU,
    { productName },
    {
      cancelToken: source.token,
    }
  );
};

// api generate danh sách mã sku

export const generateListSKU = async (codeSKUParent, colors) => {
  return await axios.post(HTTP_PATH_API.PRODUCT_GENERATE_LIST_SKU, {
    codeSKUParent,
    colors,
  });
};

export const generateListUpdateSKU = async (codeSKUParent, colors, id) => {
  return await axios.post(HTTP_PATH_API.PRODUCT_GENERATE_LIST_SKU_UPDATE, {
    codeSKUParent,
    colors,
    id,
  });
};

export const isCodeSKU = async (codeSKU) => {
  return await axios.post(
    HTTP_PATH_API.PRODUCT_Is_CODE_SKU + `?codeSKU=${codeSKU}`
  );
};
