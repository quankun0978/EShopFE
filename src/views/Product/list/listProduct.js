import { reactive, ref, onMounted } from "vue";
// api
import { deleteProduct, getAllProduct } from "@/api/product";
// hàm hỗ trợ
import { showConfirm } from "@/components/common/Modal/Confirm";
import { convertNumber, parseFormattedNumber } from "@/helpers/Funcs/helper";
// store
import { useMenuStore } from "@/store/menu";
import { useLangStore } from "@/store/lang";
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
      { label: "5", value: 5 },
      { label: "10", value: 10 },
      { label: "15", value: 15 },
      { label: "20", value: 20 },
      { label: "50", value: 50 },
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

  const data = ref([]);

  onMounted(() => {
    Init();
  });

  const Init = () => {
    useMenuStore().updateHeader({
      namePath: getText("product", langStore.lang, "product"),
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
          getText("shared", langStore.lang, "delete_success")
        );
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
      Notification.warning("Vui lòng chọn ít nhất 1 sản phẩm !");
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
