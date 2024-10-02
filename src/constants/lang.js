export const texts = {
  shared: {
    en: {
      SAVE: "Save",
      ID: "ID",
      STT: "STT",
      ALL: "All",
      CANCEL: "Cancel",
      ADD: "Add new",
      EDIT: "Edit",
      COPPY: "Coppy",
      DELETE: "Delete",
      LOAD: "Load",
      BACK_TO_START_PAGE: "Back to start page",
      PRICE: "Price",
      SELL: "Sell",
      UNIT: "Unit",
      YES: "Yes",
      OTHER: "Other",
      NO: "No",
      ATRIBUTES: "Atributes",
      DESCRIPTION: "Description",
      STATUS: "Status",
      SINGLE: "Single",
      PAIR: "Pair",
      BARCODE: "Barcode",
      ADD_NEW_SUCCESS: "Add new is successfull",
      UPDATE_SUCCESS: "Update is successfull",
      DELETE_SUCCESS: "Delete is successfull",
      CONFIRM: "Confirm",
      ERROR_REQUIRED: "Please required",
      ERROR_OCCURRED_TRY_AGAIN: "An error occurred please try again",
      ERROR_OCCURRED_SERVER:
        "An error occurred on the server, please check the server.",
      ERROR_BAD_REQUEST: "There was an error in the request sent.",
      ERROR_NOT_FOUND:
        "The request sent is for a record that does not exist and the server is down.",
    },
    vn: {
      SAVE: "Lưu",
      ALL: "Tất cả",
      ID: "ID",
      STT: "STT",
      CANCEL: "Hủy",
      ADD: "Thêm mới",
      EDIT: "Chỉnh sửa",
      STATUS: "Trạng thái",
      COPPY: "Nhân bản",
      DELETE: "Xóa",
      LOAD: "Nạp",
      BACK_TO_START_PAGE: " Quay lại trang bắt đầu sử dụng",
      PRICE: "Giá mua",
      SELL: "Giá bán",
      UNIT: "Đơn vị",
      YES: "Có",
      NO: "Không",
      ATRIBUTES: "Thuộc tính",
      DESCRIPTION: "Mô tả",
      OTHER: "Khác",
      SINGLE: "Đơn",
      PAIR: "Đôi",
      BARCODE: "Mã vạch",
      ADD_NEW_SUCCESS: "Thêm mới thành công",
      DELETE_SUCCESS: "Xóa thành công",
      UPDATE_SUCCESS: "Cập nhật thành công",
      CONFIRM: "Xác nhận",
      ERROR_OCCURRED_TRY_AGAIN: "Đã có lỗi xảy ra vui lòng thử lại",
      ERROR_OCCURRED_SERVER:
        "Đã xảy ra lỗi trên máy chủ, vui lòng kiểm tra máy chủ.",
      ERROR_BAD_REQUEST: "Đã có lỗi trong yêu cầu được gửi",
      ERROR_REQUIRED: "Vui lòng không bỏ trống dữ liệu dữ liệu",
      ERROR_NOT_FOUND:
        "Yêu cầu được gửi là về một bản ghi không tồn tại và máy chủ không hoạt động",
    },
  },
  product: {
    en: {
      PRODUCT: "Product",
      BUSINESS_STATUS: "Business status",
      NAME_PRODUCT: "Name Product",
      GROUP_PRODUCT: "Group Product",
      TYPE_PRODUCT: "Type Product",
      MANAGER_BY: "Manager By",
      CODE_SKU: "Code sku",
      IMAGE_PRODUCT: "Image Product",
      IN_BUSINESS: "In business",
      OUT_BUSINESS: "Out business",
      BOAT_PLATFORM: "Boat platform",
      HOUSEHOLD_GOODS: "Household goods",
      DISPLAY_ON_SALES_SCREEN: "Display on sales screen",
      INFO_ATRIBUTES: "INFOMATION ATRIBUTES",
      DETAIL_ATRIBUTES: "Detail Atributes",
      CODE_SKU_IS_EXSITS: "Code sku is exsits",
      CODE_SKU_IS_DUPLICATE: "Code sku is duplicate",
    },
    vn: {
      PRODUCT: "Hàng hóa",
      BUSINESS_STATUS: "Trạng thái kinh doanh",
      NAME_PRODUCT: "Tên hàng hóa",
      GROUP_PRODUCT: "Nhóm hàng hóa",
      TYPE_PRODUCT: "Loại hàng hóa",
      MANAGER_BY: "Quản lý theo",
      CODE_SKU: "Mã sku",
      IMAGE_PRODUCT: "Ảnh hàng hóa",
      IN_BUSINESS: "Đang kinh doanh",
      OUT_BUSINESS: "Ngừng kinh doanh",
      BOAT_PLATFORM: "Bệt xuồng",
      HOUSEHOLD_GOODS: "Đồ gia dụng",
      DISPLAY_ON_SALES_SCREEN: "Hiển thị lên màn hình bán hàng",
      INFO_ATRIBUTES: "THÔNG TIN THUỘC TÍNH",
      DETAIL_ATRIBUTES: "Chi tiết thuộc tính",
      CODE_SKU_IS_EXSITS: "Đã có mã SKU tồn tại trong hệ thống",
      CODE_SKU_IS_DUPLICATE: "Đã có mã sku trùng nhau vui lòng thử lại",
    },
  },
};

export const getText = (type, lang, key) => {
  return texts[type][lang][key] || key; // Trả về key nếu không tìm thấy
};

export const lang = {
  vn: "vn",
  en: "en",
};
