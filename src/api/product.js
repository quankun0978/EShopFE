import axios from "./axios";

export const GetAllProduct = async (data) => {
  return await axios.post("/product/list", data);
};
