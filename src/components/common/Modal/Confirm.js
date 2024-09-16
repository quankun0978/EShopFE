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
