import axios from "./axios";
import { source } from "./axios";
export const GetAllProduct = async (data) => {
  return await axios.post("/product/list", data);
};

export const createProduct = async (data) => {
  return await axios.post("/product/add", data);
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
