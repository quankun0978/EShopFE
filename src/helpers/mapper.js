import { $t } from "@/config/app";

// thực hiện map các option của các trạng thái

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

// thực hiện map các option của loại sản phẩm

export const typeMapper = (value) => {
  switch (value) {
    case 1:
      return $t("product.ACTION.PRODUCT");

    default:
      break;
  }
};

// thực hiện map các option của checkbox ẩn hiện lên màn hình bán hàng

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
