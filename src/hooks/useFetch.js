// useFetch.js
import instance from "@/api/axios";
import { GetAllProduct } from "@/api/product";
import { onMounted, ref } from "vue";

export const useFetch = (url, payload) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    try {
      loading.value = true;
      const response = await GetAllProduct(payload);
      data.value = response.data; // Assign response data to the data ref
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  return { data, error, loading, fetchData };
};
