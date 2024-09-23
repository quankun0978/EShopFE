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
import { deleteProduct, getAllProduct } from "@/api/product";
import { showConfirm } from "@/components/common/Modal/Confirm";
import { Notification } from "@/components/common/Notification/Notification";
import Table from "@/components/common/Table/Table.vue";
import { convertNumber, parseFormattedNumber } from "@/helpers/Funcs/helper";
import { useMenuStore } from "@/store/menu";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { useLangStore } from "@/store/lang";
import { getText } from "@/constants/lang";
const langStore = useLangStore();

const objectQuery = reactive({
  codeSKU: "",
  name: "",
  group: "",
  unit: "",
  price: "10000000",
  isHide: getText("shared", langStore.lang, "all"),
  type: getText("shared", langStore.lang, "all"),
  managerBy: getText("shared", langStore.lang, "all"),
  status: getText("shared", langStore.lang, "all"),
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
    title: getText("product", langStore.lang, "codeSku"),
    dataIndex: "codeSKU",
    input: objectQuery.codeSKU,
  },
  {
    title: getText("product", langStore.lang, "name_product"),
    dataIndex: "name",
    width: "30%",
    input: objectQuery.name,
  },
  {
    title: getText("product", langStore.lang, "group_product"),
    dataIndex: "group",
    input: objectQuery.group,
  },
  {
    title: getText("shared", langStore.lang, "unit"),
    dataIndex: "unit",
    input: objectQuery.unit,
  },
  {
    title: getText("shared", langStore.lang, "price"),
    dataIndex: "price",
    input: objectQuery.price,
  },
  {
    title: getText("product", langStore.lang, "display_on_sales_screen"),
    dataIndex: "isHide",
    isSelect: true,
    select: {
      options: [
        {
          label: getText("shared", langStore.lang, "all"),
          value: getText("shared", langStore.lang, "all"),
        },
        {
          label: getText("shared", langStore.lang, "yes"),
          value: getText("shared", langStore.lang, "yes"),
        },
        {
          label: getText("shared", langStore.lang, "no"),
          value: getText("shared", langStore.lang, "no"),
        },
      ],
      defaultValue: getText("shared", langStore.lang, "all"),
    },
    input: objectQuery.isHide,
  },
  {
    title: getText("product", langStore.lang, "type_product"),
    dataIndex: "type",
    isSelect: true,
    input: objectQuery.type,
    select: {
      options: [
        {
          label: getText("shared", langStore.lang, "all"),
          value: getText("shared", langStore.lang, "all"),
        },
        {
          label: getText("product", langStore.lang, "product"),
          value: getText("product", langStore.lang, "product"),
        },
      ],
      defaultValue: getText("shared", langStore.lang, "all"),
    },
  },
  {
    title: getText("product", langStore.lang, "manager_by"),
    dataIndex: "managerBy",
    isSelect: true,
    input: objectQuery.managerBy,
    select: {
      options: [
        {
          label: getText("shared", langStore.lang, "all"),
          value: getText("shared", langStore.lang, "all"),
        },
        {
          label: getText("shared", langStore.lang, "other"),
          value: getText("shared", langStore.lang, "other"),
        },
      ],
      defaultValue: getText("shared", langStore.lang, "all"),
    },
  },
  {
    title: getText("shared", langStore.lang, "status"),
    dataIndex: "status",
    isSelect: true,
    input: objectQuery.status,
    select: {
      options: [
        {
          label: getText("shared", langStore.lang, "all"),
          value: getText("shared", langStore.lang, "all"),
        },
        {
          label: getText("product", langStore.lang, "in_business"),
          value: getText("product", langStore.lang, "in_business"),
        },
        {
          label: getText("product", langStore.lang, "out_business"),
          value: getText("product", langStore.lang, "out_business"),
        },
      ],
      defaultValue: getText("shared", langStore.lang, "all"),
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

// xử lý làm mới lại trang

const handleRefreshQuery = () => {
  // objectQuery.group = "";
  // objectQuery.name = "";
  // objectQuery.unit = "";
  // objectQuery.price = "10000000";
  // objectQuery.isHide = getText("shared", langStore.lang, "all");
  // objectQuery.type = "";
  // objectQuery.managerBy = "";
  // objectQuery.status = "";
  handleGetData();
};

// xử lý lấy ra danh sách các hàng hóa

const handleGetData = async () => {
  try {
    if (objectQuery.price) {
      const res = await getAllProduct({
        ...objectQuery,
        price: +parseFormattedNumber(objectQuery.price),
        pageNumber: +objectQuery.pageNumber,
        pageSize: +objectQuery.pageSize,
      });
      if (res.success) {
        const copy = {
          totalPage: res.data.totalPage,
          pageNumber: res.data.currentPage,
          totalRecord: res.data.totalRecord,
        };
        Object.assign(pagination, copy);
        const dt =
          res.data.data && res.data.data.length > 0
            ? res.data.data.map((item) => {
                return {
                  ...item,
                  price: convertNumber(item.price),
                  key: item.codeSKU,
                };
              })
            : [];
        data.value = dt;
      }
    }
  } catch (e) {
    console.error(e);
  }
};

// xử lý xóa hàng hóa

const handleDeleteData = async (data) => {
  try {
    const res = await deleteProduct(data);
    if (res && res.success) {
      Notification.success(getText("shared", langStore.lang, "delete_success"));
      handleGetData();
    } else {
      Notification.error(
        getText("shared", langStore.lang, "error_occurred_please_try_again")
      );
    }
  } catch (error) {
    Notification.error(
      getText("shared", langStore.lang, "error_occurred_please_try_again")
    );
  }
};

// xử lý khi nhấn vào nút xóa

const onClickDelete = (data) => {
  if (data && data.length > 0) {
    showConfirm({
      title: "Bạn muốn xóa các sản phẩm này không?",
      icon: ExclamationCircleOutlined,
      content: "",
      okText: getText("shared", langStore.lang, "confirm"),
      cancelText: getText("shared", langStore.lang, "cancel"),
      handleOk: () => handleDeleteData(data),
    });
  } else {
    Notification.warning("Vui long chọn ít nhất 1 sản phẩm !");
  }
};
</script>

<!-- <script sr></script> -->
