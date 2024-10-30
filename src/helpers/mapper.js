import { $t } from "@/config/app";
export const statusMapper = (value) => {
  switch (value) {
    case 1:
      return $t("product.ACTION.IN_BUSINESS");
    case 2:
      return $t("product.ACTION.OUT_BUSINESS");
    default:
      break;
  }
};

export const typeMapper = (value) => {
  switch (value) {
    case 1:
      return $t("product.ACTION.PRODUCT");

    default:
      break;
  }
};

export const isHideMapper = (value) => {
  switch (value) {
    case 1:
      return $t("product.ACTION.YES");
    case 2:
      return $t("product.ACTION.NO");
    default:
      break;
  }
};
