import { $t } from "@/config/app";
export const optionsStatus = [
  {
    label: $t("product.ACTION.IN_BUSINESS"),
    value: $t("product.ACTION.IN_BUSINESS"),
  },
  {
    label: $t("product.ACTION.OUT_BUSINESS"),
    value: $t("product.ACTION.OUT_BUSINESS"),
  },
];

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
    title: $t("product.ACTION.BARCODE"),
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: $t("product.ACTION.PRICE"),
    dataIndex: "price",
    key: "price",
    isNumber:true,
  },
  {
    title: $t("product.ACTION.SELL"),
    dataIndex: "sell",
    key: "sell",
    isNumber:true,
  },

  {
    title: "",
    dataIndex: "action",
    key: "action",
  },
];

export const optionsiSHide = [
  {
    label: $t("product.ACTION.DISPLAY_ON_SALES_SCREEN"),
    value: $t("product.ACTION.YES"),
  },
];

export const optionPageSize = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
];
