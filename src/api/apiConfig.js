export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  CONFLIC_REQUEST: 409,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  ERROR_NETWORK: "ERR_NETWORK",
};
export const HTTP_PATH_API = {
  PRODUCT_LIST: "/product/list",
  PRODUCT_DETAIL: "/product/detail?id",
  PRODUCT_ADD: "/product/add",
  PRODUCT_UPDATE: "/product/update",
  PRODUCT_DELETE: "/product/delete",
  PRODUCT_GENERATE_SKU: "/product/generate_sku",
  PRODUCT_GENERATE_LIST_SKU: "/product/list_generate_sku",
  PRODUCT_GENERATE_LIST_SKU_UPDATE: "/product/list_generate_sku_update",
  PRODUCT_Is_CODE_SKU: "/product/is_code_sku",
};
