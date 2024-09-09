import axios from "./axios";
import { source } from "./axios";
export const GetAllProduct = async (data) => {
  return await axios.post("/product/list", data);
};

export const GetProductByCodeSKU = async (codeSKU) => {
  return await axios.get(`/product/detail?codeSKU=${codeSKU}`);
};

export const createProduct = async (data) => {
  return await axios.post("/product/add", data);
};

export const updateProduct = async (data) => {
  return await axios.post("/product/update", data);
};

export const deleteProduct = async (data) => {
  return await axios.post("/product/delete", data);
};

export const GenerateSKU = async (productName) => {
  return await axios.post(
    "/product/generateSKU",
    { productName },
    {
      cancelToken: source.token,
    }
  );
};

export const GenerateListSKU = async (codeSKUParent, colors) => {
  return await axios.post("/product/ListgenerateSKU", {
    codeSKUParent,
    colors,
  });
};

export const GenerateListUpdateSKU = async (codeSKUParent, colors) => {
  return await axios.post("/product/ListgenerateSKUUpdate", {
    codeSKUParent,
    colors,
  });
};
