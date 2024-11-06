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
  return value.replace(/[^\d]/g, "");
};

// hàm xóa ký tự
export const removeLettersAndSpecialChars = (str) => {
  return str.replace(/[^0-9]/g, ""); // Giữ lại chỉ các ký tự số
};

// hàm chuyển đổi số

export const parseFormattedNumber = (formattedNumber) => {
  return parseInt(formattedNumber.replace(/\./g, ""), 10);
};

// kiểm tra chuỗi số

export const isNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

// lấy ngẫu nhiên mã barcode

// export const generateRandomId = () => {
//   return Math.floor(10000 + Math.random() * 90000).toString();
// };

// kiểm tra chuỗi chữ cái

export const isStringNumber = (value) => {
  return /^\d+$/.test(value);
};

// lấy ra các pathname tương ứng

export const getNamePath = (action) => {
  switch (action) {
    case "create_product":
      return $t("product.ACTION.ADD");
    case "update_product":
      return $t("product.ACTION.EDIT");
    case "copy_product":
      return $t("product.ACTION.COPPY");
    default:
      return "Thêm mới";
  }
};

export const calculateAverage = (numbers, defaultValue) => {
  if (numbers.length === 0) return defaultValue; // Trả về 0 nếu mảng rỗng

  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return sum / numbers.length; // Tính trung bình cộng
};
