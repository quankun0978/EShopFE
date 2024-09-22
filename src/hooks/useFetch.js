// useFetch.js
import instance from "@/api/axios";
import { getAllProduct } from "@/api/product";
import { onMounted, ref } from "vue";

export const useFetch = (url, payload) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    try {
      loading.value = true;
      const response = await getAllProduct(payload);
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
