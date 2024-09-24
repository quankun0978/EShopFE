export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
export const HTTP_PATH_API = {
  PRODUCT_LIST: "/stock/list",
  PRODUCT_DETAIL: "/stock/detail?codeSKU",
  PRODUCT_ADD: "/stock/add",
  PRODUCT_UPDATE: "/stock/update",
  PRODUCT_DELETE: "/stock/delete",
  PRODUCT_GENERATE_SKU: "/stock/generate_SKU",
  PRODUCT_GENERATE_LIST_SKU: "/stock/list_generate_SKU",
  PRODUCT_GENERATE_LIST_SKU_UPDATE: "/stock/list_generate_SKU_update",
};
