import { useLangStore } from "@/store/lang";
import { getText } from "./lang";
const langStore = useLangStore();
export const optionsStatus = [
  {
    label: getText("product", langStore.lang, "IN_BUSINESS"),
    value: getText("product", langStore.lang, "IN_BUSINESS"),
  },
  {
    label: getText("product", langStore.lang, "OUT_BUSINESS"),
    value: getText("product", langStore.lang, "OUT_BUSINESS"),
  },
];

export const optionsGroup = [
  {
    label: getText("product", langStore.lang, "BOAT_PLATFORM"),
    value: getText("product", langStore.lang, "BOAT_PLATFORM"),
  },
  {
    label: getText("product", langStore.lang, "HOUSEHOLD_GOODS"),
    value: getText("product", langStore.lang, "HOUSEHOLD_GOODS"),
  },
];

export const optionsUnit = [
  {
    label: getText("shared", langStore.lang, "SINGLE"),
    value: getText("shared", langStore.lang, "SINGLE"),
  },
  {
    label: getText("shared", langStore.lang, "PAIR"),
    value: getText("shared", langStore.lang, "PAIR"),
  },
];

export const columnsAtributes = [
  {
    title: getText("product", langStore.lang, "NAME_PRODUCT"),
    dataIndex: "name",
    width: "30%",
    key: "name",
  },
  {
    title: getText("product", langStore.lang, "CODE_SKU"),
    dataIndex: "codeSKU",
    key: "codeSKU",
  },

  {
    title: getText("shared", langStore.lang, "BARCODE"),
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: getText("shared", langStore.lang, "PRICE"),
    dataIndex: "price",
    key: "price",
  },
  {
    title: getText("shared", langStore.lang, "SELL"),
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
    label: getText("product", langStore.lang, "DISPLAY_ON_SALES_SCREEN"),
    value: getText("shared", langStore.lang, "YES"),
  },
];
