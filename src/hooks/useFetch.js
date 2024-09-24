// useFetch.js
import instance from "@/api/axios";
import { getAllProduct } from "@/api/product";
import { onMounted, ref } from "vue";

const useFetch = (url, payload, type) => {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    try {
      loading.value = true;
      const response =
        type === "POST"
          ? await instance.post(url, payload)
          : await instance.get(url);
      data.value = response; // Assign response data to the data ref
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  return { data, error, loading };
};

export default useFetch;
