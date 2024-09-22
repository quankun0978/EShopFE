import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "*/*",
  },
});
const CancelToken = axios.CancelToken;
export const source = CancelToken.source();
// xử lý trước khi gửi request
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// xử lý  khi nhận response

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error);

    return Promise.reject(error);
  }
);

const cancelRequest = () => {};

export default instance;
