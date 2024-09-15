import axios from "./axios";
import { source } from "./axios";
export const GetAllProduct = async (data) => {
  return await axios.post("/stock/list", data);
};

export const GetProductByCodeSKU = async (codeSKU) => {
  return await axios.get(`/stock/detail?codeSKU=${codeSKU}`);
};

export const createProduct = async (data) => {
  return await axios.post("/stock/add", data);
};

export const updateProduct = async (data) => {
  return await axios.post("/stock/update", data);
};

export const deleteProduct = async (data) => {
  return await axios.post("/stock/delete", data);
};

export const GenerateSKU = async (productName) => {
  return await axios.post(
    "/stock/generate_SKU",
    { productName },
    {
      cancelToken: source.token,
    }
  );
};

export const GenerateListSKU = async (codeSKUParent, colors) => {
  return await axios.post("/stock/list_generate_SKU", {
    codeSKUParent,
    colors,
  });
};

export const GenerateListUpdateSKU = async (codeSKUParent, colors, id) => {
  return await axios.post("/stock/list_generate_SKU_update", {
    codeSKUParent,
    colors,
    id,
  });
};
