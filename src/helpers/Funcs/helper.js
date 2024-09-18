import { createProduct } from "@/api/product";

export const getInitials = (productName) => {
  return productName
    .split(" ") // Split the string by spaces
    .filter((n) => n.trim() !== "") // Filter out empty strings
    .map((w) => w.charAt(0).toUpperCase()) // Get the first character and convert to uppercase
    .join(""); // Join the initials into a single string
};
export const convertNumber = (number) => {
  return new Intl.NumberFormat("de-DE").format(number);
};

export const parseFormattedNumber = (formattedNumber) => {
  return parseInt(formattedNumber.replace(/\./g, ""), 10);
};

export const validateCodeSKU = async (rule, value) => {
  if (!value) {
    return Promise.reject(new Error("Trường này là bắt buộc!"));
  }

  // Gọi API để kiểm tra tên người dùng
  const response = await createProduct(value);

  if (response.status === 400) {
    return Promise.reject(new Error("Mã SKU đã tồn tại!"));
  }

  return Promise.resolve();
};
