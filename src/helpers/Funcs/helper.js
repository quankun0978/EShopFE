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
