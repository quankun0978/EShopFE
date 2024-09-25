import { notification } from "ant-design-vue";

const openNotificationWithIcon = function (
  type,
  title,
  description,
  confirmBtn,
  onClick
) {
  const handleOnClickBtn = () => {
    if (onClick) {
      onClick();
    }
    notification.destroy(); // Close the notification
  };

  return notification[type]({
    message: title,
    description: description,
    btn: confirmBtn
      ? h("span", { onClick: handleOnClickBtn }, confirmBtn)
      : null,
  });
};

export const Notification = {
  // Thành công
  success(title, description, confirmBtn, onClick) {
    openNotificationWithIcon(
      "success",
      title,
      description,
      confirmBtn,
      onClick
    );
  },
  // Chi tiết
  info(title, description, confirmBtn, onClick) {
    openNotificationWithIcon("info", title, description, confirmBtn, onClick);
  },

  // cảnh báo
  warning(title, description, confirmBtn, onClick) {
    openNotificationWithIcon(
      "warning",
      title,
      description,
      confirmBtn,
      onClick
    );
  },

  // lỗi
  error(title, description, confirmBtn, onClick) {
    openNotificationWithIcon("error", title, description, confirmBtn, onClick);
  },
};
