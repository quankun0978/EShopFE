import { reactive, ref, onMounted } from "vue";
// api
import { deleteProduct, getAllProduct } from "@/api/apiProduct";
// hàm hỗ trợ
import { showConfirm } from "@/components/common/Modal/Confirm";
import { convertNumber, parseFormattedNumber } from "@/helpers/Funcs/helper";
//store
import { useMenuStore } from "@/store/menu";
import { useLangStore } from "@/store/lang";
// hàm bổ trợ
import { getText } from "@/constants/lang";
// component
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { Notification } from "@/components/common/Notification/Notification";
import Table from "@/components/common/Table/Table.vue";

export default function ListProduct() {
  const langStore = useLangStore();

  const objectQuery = reactive({
    codeSKU: "",
    name: "",
    group: "",
    unit: "",
    price: "10000000",
    isHide: getText("shared", langStore.lang, "ALL"),
    type: getText("shared", langStore.lang, "ALL"),
    managerBy: getText("shared", langStore.lang, "ALL"),
    status: getText("shared", langStore.lang, "ALL"),
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
      title: "",
      dataIndex: "id",
      hidden: true,
      width:"0%"
    },
    {
      title: getText("product", langStore.lang, "CODE_SKU"),
      dataIndex: "codeSKU",
      input: objectQuery.codeSKU,
    },
    {
      title: getText("product", langStore.lang, "NAME_PRODUCT"),
      dataIndex: "name",
      width: "30%",
      input: objectQuery.name,
    },
    {
      title: getText("product", langStore.lang, "GROUP_PRODUCT"),
      dataIndex: "group",
      input: objectQuery.group,
    },
    {
      title: getText("shared", langStore.lang, "UNIT"),
      dataIndex: "unit",
      input: objectQuery.unit,
    },
    {
      title: getText("shared", langStore.lang, "PRICE"),
      dataIndex: "price",
      input: objectQuery.price,
    },
    {
      title: getText("product", langStore.lang, "DISPLAY_ON_SALES_SCREEN"),
      dataIndex: "isHide",
      isSelect: true,
      select: {
        options: [
          {
            label: getText("shared", langStore.lang, "ALL"),
            value: getText("shared", langStore.lang, "ALL"),
          },
          {
            label: getText("shared", langStore.lang, "YES"),
            value: getText("shared", langStore.lang, "YES"),
          },
          {
            label: getText("shared", langStore.lang, "NO"),
            value: getText("shared", langStore.lang, "NO"),
          },
        ],
        defaultValue: getText("shared", langStore.lang, "ALL"),
      },
      input: objectQuery.isHide,
    },
    {
      title: getText("product", langStore.lang, "TYPE_PRODUCT"),
      dataIndex: "type",
      isSelect: true,
      input: objectQuery.type,
      select: {
        options: [
          {
            label: getText("shared", langStore.lang, "ALL"),
            value: getText("shared", langStore.lang, "ALL"),
          },
          {
            label: getText("product", langStore.lang, "PRODUCT"),
            value: getText("product", langStore.lang, "PRODUCT"),
          },
        ],
        defaultValue: getText("shared", langStore.lang, "ALL"),
      },
    },
    {
      title: getText("product", langStore.lang, "MANAGER_BY"),
      dataIndex: "managerBy",
      isSelect: true,
      input: objectQuery.managerBy,
      select: {
        options: [
          {
            label: getText("shared", langStore.lang, "ALL"),
            value: getText("shared", langStore.lang, "ALL"),
          },
          {
            label: getText("shared", langStore.lang, "OTHER"),
            value: getText("shared", langStore.lang, "OTHER"),
          },
        ],
        defaultValue: getText("shared", langStore.lang, "ALL"),
      },
    },
    {
      title: getText("shared", langStore.lang, "STATUS"),
      dataIndex: "status",
      isSelect: true,
      input: objectQuery.status,
      select: {
        options: [
          {
            label: getText("shared", langStore.lang, "ALL"),
            value: getText("shared", langStore.lang, "ALL"),
          },
          {
            label: getText("product", langStore.lang, "IN_BUSINESS"),
            value: getText("product", langStore.lang, "IN_BUSINESS"),
          },
          {
            label: getText("product", langStore.lang, "OUT_BUSINESS"),
            value: getText("product", langStore.lang, "OUT_BUSINESS"),
          },
        ],
        defaultValue: getText("shared", langStore.lang, "ALL"),
      },
    },
  ];

  const data = ref([]);

  onMounted(() => {
    Init();
  });

  const Init = () => {
    useMenuStore().updateHeader({
      namePath: getText("product", langStore.lang, "PRODUCT"),
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
        Notification.success(
          getText("shared", langStore.lang, "DELETE_SUCCESS")
        );
        handleGetData();
      } else {
        Notification.error(
          getText("shared", langStore.lang, "ERROR_OCCURRED_TRY_AGAIN")
        );
      }
    } catch (error) {
      Notification.error(
        getText("shared", langStore.lang, "ERROR_OCCURRED_TRY_AGAIN")
      );
    }
  };

  const onClickDelete = (data) => {
    if (data && data.length > 0) {
      showConfirm({
        title: `Bạn muốn xóa sản phẩm ${data.join(",")}?`,
        icon: ExclamationCircleOutlined,
        content: "",
        okText: getText("shared", langStore.lang, "CONFIRM"),
        cancelText: getText("shared", langStore.lang, "CANCEL"),
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
}
