import instance from "@/api/axios";
import { onMounted, reactive, ref } from "vue";

export const useFetch = (url, data) => {
  const fetchedData = ref(null);

  const handleGetData = async () => {
    try {
      const res = await instance.post(url, data);
      console.log(res);
      if (res.data.success) {
        fetchedData.value = res.data;
        console.log(fetchedData.value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  onMounted(() => {
    handleGetData();
  });

  return {
    res: fetchedData.value,
    handleGetData,
  };
};
