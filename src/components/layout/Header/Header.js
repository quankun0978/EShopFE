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
import { useLangStore } from "@/store/lang";
// hàm bổ trợ
import { getText } from "@/constants/lang";
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
  const langStore = useLangStore();
  return {
    options,
    segments,
    menuStore,
    langStore,
    getText,
    Select,
    Dropdown,
    Segment,
    ArrowLeftOutlined,
    UserOutlined,
  };
};
export default Header;
