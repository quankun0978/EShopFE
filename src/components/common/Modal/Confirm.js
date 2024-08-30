import { Modal } from "ant-design-vue"; // Import Ant Design Vue notification
import { createVNode } from "vue";
export const showConfirm = ({
  title,
  icon,
  content,
  okText,
  okType,
  cancelText,
  handleOk,
  handleCancel,
  ...rest
}) => {
  Modal.confirm({
    ...rest,
    title: title,
    icon: createVNode(icon),
    content: content,
    okText: okText,
    okType: okType,
    cancelText: cancelText,
    onOk() {
      handleOk();
    },
    onCancel() {},
  });
};
// const openNotificationWithIcon = function (
//   type,
//   title,
//   description,
//   confirmBtn,
//   onClick
// ) {
//   const handleOnClickBtn = () => {
//     if (onClick) {
//       onClick();
//     }
//     notification.destroy(); // Close the notification
//   };

//   return notification[type]({
//     message: title,
//     description: description,
//     btn: confirmBtn
//       ? h("span", { onClick: handleOnClickBtn }, confirmBtn)
//       : null,
//   });
// };

// export const Notification = {
//     Modal.({
//         title: 'Are you sure delete this task?',
//         icon: createVNode(ExclamationCircleOutlined),
//         content: 'Some descriptions',
//         okText: 'Yes',
//         okType: 'danger',
//         cancelText: 'No',
//         onOk() {
//           console.log('OK');
//         },
//         onCancel() {
//           console.log('Cancel');
//         },
//       });
// };
