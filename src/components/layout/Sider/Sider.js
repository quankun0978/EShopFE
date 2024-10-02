import { ref, h } from "vue";
// logo
import Logo from "@/assets/imgs/Logo_Full_White.png";
// component
import Menu from "@/components/common/Menu/Menu.vue";
import IconBoxesStacked from "@/components/icons/IconBoxesStacked.vue";
// store
import { useLangStore } from "@/store/lang";
import { $t } from "@/config/app";

// hàm hỗ trợ

const Sider = () => {
  const items = [
    {
      label: $t("product.COPPY.PRODUCT"),
      key: "1",
      icon: () => h(IconBoxesStacked),
    },
    {
      label: "Navigation two",
      key: "2",
    },
    {
      label: "Navigation three",
      key: "3",
    },
  ];
  const onCollapse = (collapsed, type) => {};
  const onBreakpoint = (broken) => {};
  const selectedKeys = ref(["1"]);
  return {
    $t,
    items,
    Logo,
    Menu,
    IconBoxesStacked,
    useLangStore,
    onCollapse,
    onBreakpoint,
    selectedKeys,
  };
};

export default Sider;
