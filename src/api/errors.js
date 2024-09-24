import { Notification } from "@/components/common/Notification/Notification";
import { HTTP_STATUS } from "./apiConfig";
import { getText, lang } from "@/constants/lang";
const handleError = (error) => {
  switch (error.status) {
    case HTTP_STATUS.NOT_FOUND:
      showMessageError(getText("shared", lang.vn, "error_not_found"));
      break;
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      showMessageError(getText("shared", lang.vn, "error_occurred_server"));
      break;
    default:
      break;
  }
};

const showMessageError = (error) => {
  Notification.error(error);
};

export default handleError;
