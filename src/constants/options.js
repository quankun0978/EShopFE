import { $t } from "@/config/app";

// option các trạng thái

export const optionsStatus = [
  {
    label: $t("product.ACTION.IN_BUSINESS"),
    value: 1,
  },
  {
    label: $t("product.ACTION.OUT_BUSINESS"),
    value: 2,
  },
];

// option các nhóm

export const optionsGroup = [
  {
    label: $t("product.ACTION.BOAT_PLATFORM"),
    value: $t("product.ACTION.BOAT_PLATFORM"),
  },
  {
    label: $t("product.ACTION.HOUSEHOLD_GOODS"),
    value: $t("product.ACTION.HOUSEHOLD_GOODS"),
  },
];

// option các đơn vị

export const optionsUnit = [
  {
    label: $t("product.ACTION.SINGLE"),
    value: $t("product.ACTION.SINGLE"),
  },
  {
    label: $t("product.ACTION.PAIR"),
    value: $t("product.ACTION.PAIR"),
  },
];

// các cột của bảng thuộc tính

export const columnsAtributes = [
  {
    title: $t("product.ACTION.NAME_PRODUCT"),
    dataIndex: "name",
    width: "30%",
    key: "name",
  },
  {
    title: $t("product.ACTION.CODE_SKU"),
    dataIndex: "codeSKU",
    key: "codeSKU",
  },

  {
    title: $t("product.ACTION.PRICE"),
    dataIndex: "price",
    key: "price",
    isNumber: true,
  },
  {
    title: $t("product.ACTION.SELL"),
    dataIndex: "sell",
    key: "sell",
    isNumber: true,
  },

  {
    width: "5%",
    title: "",
    dataIndex: "action",
    key: "action",
  },
];

// option hiển thị lên màn hình bán hàng

export const optionsiSHide = [
  {
    label: $t("product.ACTION.DISPLAY_ON_SALES_SCREEN"),
    value: 1,
  },
];

// option số bản ghi mỗi trang

export const optionPageSize = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
];
