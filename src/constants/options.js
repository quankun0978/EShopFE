import { useLangStore } from "@/store/lang";
import { $t } from "@/config/app";
export const optionsStatus = [
  {
    label: $t("product.UPDATE.IN_BUSINESS"),
    value: $t("product.UPDATE.IN_BUSINESS"),
  },
  {
    label: $t("product.UPDATE.OUT_BUSINESS"),
    value: $t("product.UPDATE.OUT_BUSINESS"),
  },
];

export const optionsGroup = [
  {
    label: $t("product.UPDATE.BOAT_PLATFORM"),
    value: $t("product.UPDATE.BOAT_PLATFORM"),
  },
  {
    label: $t("product.UPDATE.HOUSEHOLD_GOODS"),
    value: $t("product.UPDATE.HOUSEHOLD_GOODS"),
  },
];

export const optionsUnit = [
  {
    label: $t("product.UPDATE.SINGLE"),
    value: $t("product.UPDATE.SINGLE"),
  },
  {
    label: $t("product.UPDATE.PAIR"),
    value: $t("product.UPDATE.PAIR"),
  },
];

export const columnsAtributes = [
  {
    title: $t("product.UPDATE.NAME_PRODUCT"),
    dataIndex: "name",
    width: "30%",
    key: "name",
  },
  {
    title: $t("product.UPDATE.CODE_SKU"),
    dataIndex: "codeSKU",
    key: "codeSKU",
  },

  {
    title: $t("product.UPDATE.BARCODE"),
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: $t("product.UPDATE.PRICE"),
    dataIndex: "price",
    key: "price",
  },
  {
    title: $t("product.UPDATE.SELL"),
    dataIndex: "sell",
    key: "sell",
  },

  {
    title: "",
    dataIndex: "action",
    key: "action",
  },
];

export const optionsiSHide = [
  {
    label: $t("product.UPDATE.DISPLAY_ON_SALES_SCREEN"),
    value: $t("product.UPDATE.YES"),
  },
];
