import axios from "./axios";
import { source } from "./axios";
// api lấy ra danh sách hàng hóa

export const getAllProduct = async (data) => {
  return await axios.post("/stock/list", data);
};

// api lấy ra  hàng hóa theo mã sku

export const getProductByCodeSku = async (codeSKU) => {
  return await axios.get(`/stock/detail?codeSKU=${codeSKU}`);
};

// api thêm mới ra hàng hóa

export const createProduct = async (data) => {
  return await axios.post("/stock/add", data);
};

// api cập nhật hàng hóa

export const updateProduct = async (data) => {
  return await axios.post("/stock/update", data);
};

// api xóa hàng hóa

export const deleteProduct = async (data) => {
  return await axios.post("/stock/delete", data);
};

// api generate mã sku

export const generateSKU = async (productName) => {
  return await axios.post(
    "/stock/generate_SKU",
    { productName },
    {
      cancelToken: source.token,
    }
  );
};

// api generate danh sách mã sku

export const generateListSKU = async (codeSKUParent, colors) => {
  return await axios.post("/stock/list_generate_SKU", {
    codeSKUParent,
    colors,
  });
};

export const generateListUpdateSKU = async (codeSKUParent, colors, id) => {
  return await axios.post("/stock/list_generate_SKU_update", {
    codeSKUParent,
    colors,
    id,
  });
};
