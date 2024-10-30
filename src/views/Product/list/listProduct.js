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
import { optionPageSize } from "@/constants/options";
import { isHideMapper, statusMapper, typeMapper } from "@/helpers/mapper";

const ListProduct = () => {
  const objectQuery = reactive({
    codeSKU: "",
    name: "",
    group: "",
    unit: "",
    price: "",
    isHide: 0,
    type: 0,
    status: 0,
    pageNumber: "1",
    pageSize: "20",
  });

  const pagination = reactive({
    pageNumber: objectQuery.pageNumber,
    pageSize: objectQuery.pageSize,
    totalPage: "5",
    totalRecord: "96",
    optionPageSize: optionPageSize,
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
            value: 0,
          },
          {
            label: $t("product.LIST.YES"),
            value: 1,
          },
          {
            label: $t("product.LIST.NO"),
            value: 2,
          },
        ],
        defaultValue: 0,
      },
      input: objectQuery.isHide.toString(),
    },
    {
      title: $t("product.LIST.TYPE_PRODUCT"),
      dataIndex: "type",
      isSelect: true,
      input: objectQuery.type.toString(),
      select: {
        options: [
          {
            label: $t("product.LIST.ALL"),
            value: 0,
          },
          {
            label: $t("product.LIST.PRODUCT"),
            value: 1,
          },
        ],
        defaultValue: 0,
      },
    },
    {
      title: $t("product.LIST.STATUS"),
      dataIndex: "status",
      isSelect: true,
      input: objectQuery.status.toString(),
      select: {
        options: [
          {
            label: $t("product.LIST.ALL"),
            value: 0,
          },
          {
            label: $t("product.LIST.IN_BUSINESS"),
            value: 1,
          },
          {
            label: $t("product.LIST.OUT_BUSINESS"),
            value: 2,
          },
        ],
        defaultValue: 0,
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
          res.data.data?.map((item) => {
            return {
              ...item,
              price: convertNumber(item.price.toString()),
              isHide: isHideMapper(item.isHide), // Hiện/Ẩn ngẫu nhiên
              type: typeMapper(item.type), // Loại sản phẩm ngẫu nhiên
              status: statusMapper(item.status), // Trạng thái ngẫu nhiên
              key: item.id,
            };
          }) || [];
        data.value = dt;
      }
    } catch (e) {}
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

  const onClickDelete = (data, dataFocus) => {
    if (data && data.length > 0) {
      showConfirm({
        title: `${$t("product.LIST.DELETE_PRODUCT")} ?`,
        icon: ExclamationCircleOutlined,
        content: "",
        okText: $t("product.LIST.CONFIRM"),
        cancelText: $t("product.LIST.CANCEL"),
        handleOk: () => handleDeleteData(data),
      });
    } else if (dataFocus && dataFocus.length > 0) {
      showConfirm({
        title: `${$t("product.LIST.DELETE_PRODUCT")} ?`,
        icon: ExclamationCircleOutlined,
        content: "",
        okText: $t("product.LIST.CONFIRM"),
        cancelText: $t("product.LIST.CANCEL"),
        handleOk: () => handleDeleteData(dataFocus),
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
