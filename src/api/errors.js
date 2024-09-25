import { Notification } from "@/components/common/Notification/Notification";
import { HTTP_STATUS } from "./apiConfig";
import { getText, lang } from "@/constants/lang";
const handleError = (error) => {
  const status = error.status ? error.status : error.code;
  switch (status) {
    case HTTP_STATUS.NOT_FOUND:
      showMessageError(getText("shared", lang.vn, "ERROR_NOT_FOUND"));
      break;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      showMessageError(getText("shared", lang.vn, "ERROR_OCCURRED_SERVER"));
    case HTTP_STATUS.ERROR_NETWORK:
      showMessageError(getText("shared", lang.vn, "ERROR_OCCURRED_SERVER"));
      break;
    default:
      break;
  }
};

const showMessageError = (error) => {
  Notification.error(error);
};

export default handleError;
