import { $t } from "@/config/app";

// hàm tạo ra chuỗi gồm các chữ cái đầu viết hoa của tên
export const getInitials = (productName) => {
  return productName
    .split(" ")
    .filter((n) => n.trim() !== "")
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
};

// hàm chuyển đổi số thành dạng 000.000
export const convertNumber = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
};

// hàm chuyển đổi số

export const parseFormattedNumber = (formattedNumber) => {
  return parseInt(formattedNumber.replace(/\./g, ""), 10);
};
export const validateNumber = (rule, value) => {
  if (!value) {
    return Promise.reject();
  } else if (isNaN(value)) {
    return Promise.reject();
  } else {
    return Promise.resolve();
  }
};

// lấy ngẫu nhiên mã barcode

export const generateRandomId = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const isStringNumber = (value) => {
  return /^\d+$/.test(value);
};

export const getNamePath = (action) => {
  switch (action) {
    case "create_product":
      return $t("product.ACTION.ADD");
      break;
    case "update_product":
      return $t("product.ACTION.EDIT");
      break;
    case "copy_product":
      return $t("product.ACTION.COPPY");
      break;
    default:
      return "Thêm mới";
  }
};
