import { Notification } from "@/components/common/Notification/Notification";
import { HTTP_STATUS } from "./apiConfig";
import { $t } from "@/config/app";
const handleError = (error) => {
  const status = error.status ? error.status : error.code;
  switch (status) {
    case HTTP_STATUS.NOT_FOUND:
      showMessageError($t("product.ACTION.ERROR_NOT_FOUND"));
      break;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      showMessageError($t("product.ACTION.ERROR_OCCURRED_SERVER"));
      break;
    case HTTP_STATUS.ERROR_NETWORK:
      showMessageError($t("product.ACTION.ERROR_OCCURRED_SERVER"));
      break;
    default:
      break;
  }
};

const showMessageError = (error) => {
  Notification.error(error);
};

export default handleError;
