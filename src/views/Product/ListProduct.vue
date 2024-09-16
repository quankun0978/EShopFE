<template>
  <div>
    <Table
      :bordered="true"
      :isInput="true"
      :items="data"
      :columns="columns"
      :isAction="true"
      :objectQuery="objectQuery"
      :pagination="pagination"
      :handleSearch="handleGetData"
      :handleRefreshQuery="handleRefreshQuery"
      :handleDeleteData="onClickDelete"
    />
  </div>
</template>

<script setup>
import { deleteProduct, GetAllProduct } from "@/api/product";
import { showConfirm } from "@/components/common/Modal/Confirm";
import { Notification } from "@/components/common/Notification/Notification";
import Table from "@/components/common/Table/Table.vue";
import { convertNumber, parseFormattedNumber } from "@/helpers/Funcs/helper";
import { useFetch } from "@/hooks/useFetch";
import { useMenuStore } from "@/store/menu";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

const objectQuery = reactive({
  codeSKU: "",
  name: "",
  group: "",
  unit: "",
  price: "10000000",
  isHide: "Tất cả",
  type: "Tất cả",
  managerBy: "Tất cả",
  status: "Tất cả",
  pageNumber: "1",
  pageSize: "20",
});

const pagination = reactive({
  pageNumber: objectQuery.pageNumber,
  pageSize: objectQuery.pageSize,
  totalPage: "5",
  totalRecord: "96",
  optionPageSize: [
    {
      label: "5",
      value: 5,
    },
    {
      label: "10",
      value: 10,
    },
    {
      label: "15",
      value: 15,
    },
    {
      label: "20",
      value: 20,
    },
    {
      label: "50",
      value: 50,
    },
  ],
});

const columns = [
  {
    title: "Mã SKU",
    dataIndex: "codeSKU",
    input: objectQuery.codeSKU,
  },
  {
    title: "Tên hàng hóa",
    dataIndex: "name",
    width: "30%",
    input: objectQuery.name,
  },
  {
    title: "Nhóm hàng hóa",
    dataIndex: "group",
    input: objectQuery.group,
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit",
    input: objectQuery.unit,
  },
  {
    title: "Giá bán TB",
    dataIndex: "price",
    input: objectQuery.price,
  },
  {
    title: "Hiển thị trên MH bán hàng",
    dataIndex: "isHide",
    isSelect: true,
    select: {
      options: [
        {
          label: "Tất cả",
          value: "Tất cả",
        },
        {
          label: "Có",
          value: "Có",
        },
        {
          label: "Không",
          value: "Không",
        },
      ],
      defaultValue: "Tất cả",
    },
    input: objectQuery.isHide,
  },
  {
    title: "Loại hàng hóa",
    dataIndex: "type",
    isSelect: true,
    input: objectQuery.type,
    select: {
      options: [
        {
          label: "Tất cả",
          value: "Tất cả",
        },
        {
          label: "Hàng hóa",
          value: "Hàng hóa",
        },
      ],
      defaultValue: "Tất cả",
    },
  },
  {
    title: "Quản lý theo",
    dataIndex: "managerBy",
    isSelect: true,
    input: objectQuery.managerBy,
    select: {
      options: [
        {
          label: "Tất cả",
          value: "Tất cả",
        },
        {
          label: "Khác",
          value: "Khác",
        },
      ],
      defaultValue: "Tất cả",
    },
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    isSelect: true,
    input: objectQuery.status,
    select: {
      options: [
        {
          label: "Tất cả",
          value: "Tất cả",
        },
        {
          label: "Đang kinh doanh",
          value: "Đang kinh doanh",
        },
        {
          label: "Ngừng kinh doanh",
          value: "Ngừng kinh doanh",
        },
      ],
      defaultValue: "Tất cả",
    },
  },
];

const data = ref();
onMounted(() => {
  Init();
});

const Init = () => {
  useMenuStore().updateHeader({
    namePath: "Hàng hóa",
    isBack: true,
  });
  handleGetData();
};

const handleRefreshQuery = () => {
  objectQuery.codeSKU = "";
  objectQuery.group = "";
  objectQuery.name = "";
  objectQuery.unit = "";
  objectQuery.price = "10000000";
  objectQuery.isHide = "Tất cả";
  objectQuery.type = "";
  objectQuery.managerBy = "";
  objectQuery.status = "";
};

// const isNull = () => {
//   for (let item in objectQuery) {
//     if (!objectQuery[item]) {
//       return false;
//     }
//   }
//   return true;
// };
const handleGetData = async () => {
  try {
    if (objectQuery.price) {
      const res = await GetAllProduct({
        ...objectQuery,
        price: +parseFormattedNumber(objectQuery.price),
        pageNumber: +objectQuery.pageNumber,
        pageSize: +objectQuery.pageSize,
      });
      if (res.data.success) {
        const copy = {
          totalPage: res.data.data.totalPage,
          pageNumber: res.data.data.currentPage,
          totalRecord: res.data.data.totalRecord,
        };
        Object.assign(pagination, copy);
        const dt =
          res.data.data.data &&
          res.data.data.data.length > 0 &&
          res.data.data.data.map((item) => {
            return {
              ...item,
              price: convertNumber(item.price),
              key: item.codeSKU,
            };
          });
        data.value = dt;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const handleDeleteData = async (data) => {
  try {
    const res = await deleteProduct(data);
    if (res && res.data && res.data.success) {
      Notification.success("Xóa thành công");
      handleGetData();
    } else {
      Notification.error("Đã có lỗi xảy ra vui lòng thử lại");
    }
  } catch (error) {
    Notification.error("Đã có lỗi xảy ra vui lòng thử lại");
  }
};

const onClickDelete = (data) => {
  if (data && data.length > 0) {
    showConfirm({
      title: "Ban muon xoa cac san pham nay khong?",
      icon: ExclamationCircleOutlined,
      content: "",
      okText: "Xac nhan",
      cancelText: "Huy",
      handleOk: () => handleDeleteData(data),
    });
  } else {
    Notification.warning("Vui long chon it nhat 1 san pham !");
  }
};
</script>
