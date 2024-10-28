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
  const normalNumber = convertToNormalNumber(number);
  const strRemoveLetter = removeLettersAndSpecialChars(normalNumber);
  if (isNumeric(strRemoveLetter)) {
    return new Intl.NumberFormat("en-US").format(strRemoveLetter).toString();
  }
  return "0";
};

// hàm chuyển đổi ngược lại thành dạng 000000

export const convertToNormalNumber = (value) => {
  return value.replace(/\,/g, "");
};

// hàm xóa ký tự
export const removeLettersAndSpecialChars = (str) => {
  return str.replace(/[^0-9]/g, ""); // Giữ lại chỉ các ký tự số
};

// hàm chuyển đổi số

export const parseFormattedNumber = (formattedNumber) => {
  return parseInt(formattedNumber.replace(/\./g, ""), 10);
};

// export const validateNumber = (rule, value) => {
//   if (!value) {
//     return Promise.reject();
//   } else if (isNaN(value)) {
//     return Promise.reject();
//   } else {
//     return Promise.resolve();
//   }
// };

export const isNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

// lấy ngẫu nhiên mã barcode

// export const generateRandomId = () => {
//   return Math.floor(10000 + Math.random() * 90000).toString();
// };

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
