// component
import Select from "@/components/common/Select/Select.vue";
import Dropdown from "@/components/common/Dropdown/Dropdown.vue";
import Segment from "@/components/common/Segment/Segment.vue";
//icon
import {
  ArrowLeftOutlined,
  UserOutlined,
  WhatsAppOutlined,
  BellOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons-vue";
//store
import { useMenuStore } from "@/store/menu";
const Header = () => {
  const options = [
    {
      value: "jack",
      label: "Jack",
    },
    {
      value: "lucy",
      label: "Lucy",
    },
    {
      value: "disabled",
      label: "Disabled",
      disabled: true,
    },
    {
      value: "yiminghe",
      label: "Yiminghe",
    },
  ];

  const segments = [
    {
      value: "user1",
      payload: {
        icon: WhatsAppOutlined,
        style: {},
      },
    },
    {
      value: "user2",
      payload: {
        icon: BellOutlined,
      },
    },
    {
      value: "user3",
      payload: {
        icon: QuestionCircleOutlined,
      },
    },
  ];
  // store lưu trữ các trạng thái của menu
  const menuStore = useMenuStore();
  return {
    options,
    segments,
    menuStore,
    Select,
    Dropdown,
    Segment,
    ArrowLeftOutlined,
    UserOutlined,
  };
};
export default Header;
