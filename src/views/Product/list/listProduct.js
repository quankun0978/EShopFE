import { reactive, ref, onMounted } from "vue";
// api
import { deleteProduct, getAllProduct } from "@/api/apiProduct";
// hàm hỗ trợ
import { showConfirm } from "@/components/common/Modal/Confirm";
import { convertNumber, parseFormattedNumber } from "@/helpers/Funcs/helper";
//store
import { useMenuStore } from "@/store/menu";
// component
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Notification } from "@/components/common/Notification/Notification";
import Table from "@/components/common/Table/Table.vue";
import { $t } from "@/config/app";

const ListProduct = () => {
  const objectQuery = reactive({
    codeSKU: "",
    name: "",
    group: "",
    unit: "",
    price: "10000000",
    isHide: $t("product.LIST.ALL"),
    type: $t("product.LIST.ALL"),
    managerBy: $t("product.LIST.ALL"),
    status: $t("product.LIST.ALL"),
    pageNumber: "1",
    pageSize: "20",
  });

  const pagination = reactive({
    pageNumber: objectQuery.pageNumber,
    pageSize: objectQuery.pageSize,
    totalPage: "5",
    totalRecord: "96",
    optionPageSize: [
      { label: "5", value: 5 },
      { label: "10", value: 10 },
      { label: "15", value: 15 },
      { label: "20", value: 20 },
      { label: "50", value: 50 },
    ],
  });

  const columns = [
    {
      title: $t("product.LIST.CODE_SKU"),
      dataIndex: "codeSKU",
      input: objectQuery.codeSKU,
    },
    {
      title: $t("product.LIST.NAME_PRODUCT"),
      dataIndex: "name",
      width: "30%",
      input: objectQuery.name,
    },
    {
      title: $t("product.LIST.GROUP_PRODUCT"),
      dataIndex: "group",
      input: objectQuery.group,
    },
    {
      title: $t("product.LIST.UNIT"),
      dataIndex: "unit",
      input: objectQuery.unit,
    },
    {
      title: $t("product.LIST.PRICE"),
      dataIndex: "price",
      input: objectQuery.price,
    },
    {
      title: $t("product.LIST.DISPLAY_ON_SALES_SCREEN"),
      dataIndex: "isHide",
      isSelect: true,
      select: {
        options: [
          {
            label: $t("product.LIST.ALL"),
            value: $t("product.LIST.ALL"),
          },
          {
            label: $t("product.LIST.YES"),
            value: $t("product.LIST.YES"),
          },
          {
            label: $t("product.LIST.NO"),
            value: $t("product.LIST.NO"),
          },
        ],
        defaultValue: $t("product.LIST.ALL"),
      },
      input: objectQuery.isHide,
    },
    {
      title: $t("product.LIST.TYPE_PRODUCT"),
      dataIndex: "type",
      isSelect: true,
      input: objectQuery.type,
      select: {
        options: [
          {
            label: $t("product.LIST.ALL"),
            value: $t("product.LIST.ALL"),
          },
          {
            label: $t("product.LIST.PRODUCT"),
            value: $t("product.LIST.PRODUCT"),
          },
        ],
        defaultValue: $t("product.LIST.ALL"),
      },
    },
    {
      title: $t("product.LIST.MANAGER_BY"),
      dataIndex: "managerBy",
      isSelect: true,
      input: objectQuery.managerBy,
      select: {
        options: [
          {
            label: $t("product.LIST.ALL"),
            value: $t("product.LIST.ALL"),
          },
          {
            label: $t("product.LIST.OTHER"),
            value: $t("product.LIST.OTHER"),
          },
        ],
        defaultValue: $t("product.LIST.ALL"),
      },
    },
    {
      title: $t("product.LIST.STATUS"),
      dataIndex: "status",
      isSelect: true,
      input: objectQuery.status,
      select: {
        options: [
          {
            label: $t("product.LIST.ALL"),
            value: $t("product.LIST.ALL"),
          },
          {
            label: $t("product.LIST.IN_BUSINESS"),
            value: $t("product.LIST.IN_BUSINESS"),
          },
          {
            label: $t("product.LIST.OUT_BUSINESS"),
            value: $t("product.LIST.OUT_BUSINESS"),
          },
        ],
        defaultValue: $t("product.LIST.ALL"),
      },
    },
  ];

  const data = ref([]);

  onMounted(() => {
    Init();
  });

  const Init = () => {
    useMenuStore().updateHeader({
      namePath: $t("product.LIST.PRODUCT"),
      isBack: true,
    });
    handleGetData();
  };

  const handleRefreshQuery = () => {
    handleGetData();
  };

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
            res.data.data?.map((item) => ({
              ...item,
              price: convertNumber(item.price),
              key: item.codeSKU,
            })) || [];
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
      if (res?.success) {
        Notification.success($t("product.LIST.DELETE_SUCCESS"));
        handleGetData();
      } else {
        Notification.error($t("product.LIST.ERROR_OCCURRED_TRY_AGAIN"));
      }
    } catch (error) {
      Notification.error($t("product.LIST.ERROR_OCCURRED_TRY_AGAIN"));
    }
  };

  const onClickDelete = (data) => {
    if (data && data.length > 0) {
      showConfirm({
        title: `Bạn muốn xóa các sản phẩm ?`,
        icon: ExclamationCircleOutlined,
        content: "",
        okText: $t("product.LIST.CONFIRM"),
        cancelText: $t("product.LIST.CANCEL"),
        handleOk: () => handleDeleteData(data),
      });
    }
  };

  return {
    data,
    columns,
    objectQuery,
    pagination,
    handleGetData,
    handleRefreshQuery,
    onClickDelete,
    Table,
  };
};
export default ListProduct;
