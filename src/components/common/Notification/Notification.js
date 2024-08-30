import { notification } from "ant-design-vue"; // Import Ant Design Vue notification

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
  success(title, description, confirmBtn, onClick) {
    openNotificationWithIcon(
      "success",
      title,
      description,
      confirmBtn,
      onClick
    );
  },
  info(title, description, confirmBtn, onClick) {
    openNotificationWithIcon("info", title, description, confirmBtn, onClick);
  },
  warning(title, description, confirmBtn, onClick) {
    openNotificationWithIcon(
      "warning",
      title,
      description,
      confirmBtn,
      onClick
    );
  },
  error(title, description, confirmBtn, onClick) {
    openNotificationWithIcon("error", title, description, confirmBtn, onClick);
  },
};
