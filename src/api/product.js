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

export const deleteProduct = async (data) => {
  return await axios.post("/product/delete", data);
};

export const GenerateSKU = async (name) => {
  return await axios.post(
    "/product/generateSKU",
    { name },
    {
      cancelToken: source.token,
    }
  );
};
