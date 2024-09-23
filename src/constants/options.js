import { useLangStore } from "@/store/lang";
import { getText } from "./lang";
const langStore = useLangStore();
export const optionsStatus = [
  {
    label: getText("product", langStore.lang, "in_business"),
    value: getText("product", langStore.lang, "in_business"),
  },
  {
    label: getText("product", langStore.lang, "out_business"),
    value: getText("product", langStore.lang, "out_business"),
  },
];

export const optionsGroup = [
  {
    label: getText("product", langStore.lang, "boat_platform"),
    value: getText("product", langStore.lang, "boat_platform"),
  },
  {
    label: getText("product", langStore.lang, "household_goods"),
    value: getText("product", langStore.lang, "household_goods"),
  },
];

export const optionsUnit = [
  {
    label: getText("shared", langStore.lang, "single"),
    value: getText("shared", langStore.lang, "single"),
  },
  {
    label: getText("shared", langStore.lang, "pair"),
    value: getText("shared", langStore.lang, "pair"),
  },
];

export const columnsAtributes = [
  {
    title: getText("product", langStore.lang, "name_product"),
    dataIndex: "name",
    width: "30%",
    key: "name",
  },
  {
    title: getText("product", langStore.lang, "codeSku"),
    dataIndex: "codeSKU",
    key: "codeSKU",
  },

  {
    title: getText("shared", langStore.lang, "barcode"),
    dataIndex: "barcode",
    key: "barcode",
  },
  {
    title: getText("shared", langStore.lang, "price"),
    dataIndex: "price",
    key: "price",
  },
  {
    title: getText("shared", langStore.lang, "sell"),
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
    label: getText("product", langStore.lang, "display_on_sales_screen"),
    value: getText("shared", langStore.lang, "yes"),
  },
];
