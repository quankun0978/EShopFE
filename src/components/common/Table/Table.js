import { onMounted, reactive, ref, watchEffect } from "vue";
//componeny
import Input from "../Input/Input.vue";
import Select from "../Select/Select.vue";
import Button from "../Button/Button.vue";
import Pagination from "../Pagination/Pagination.vue";
import { useRouter } from "vue-router";
//icon
import {
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";
//store
// hàm bổ trợ
const Table = (props) => {
  const idProduct = ref();
  const state = reactive({
    selectedRowKeys: [],
    loading: false,
  });
  const router = useRouter();
  const isDisabled = ref(false);

  watchEffect(() => {
    if (state.selectedRowKeys.length === 1) {
      isDisabled.value = false;
    } else {
      isDisabled.value = true;
    }
  });

  watchEffect(() => {
    if (props.items && props.items.length > 0) {
      idProduct.value = props.items[0].id;
      state.selectedRowKeys = [props.items[0].id];
    }
  });

  // sự kiện khi thay đổi các combo box
  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      idProduct.value = selectedRowKeys[0];
    }
  };
  // sự kiện khi thay đổi các select tìm kiếm

  const handleColumnInputChange = (event, dataIndex) => {
    props.objectQuery[dataIndex] = event.target.value;
  };

  // sự kiện khi thay đổi các select tìm kiếm

  const handleColumnSelectChange = (value, dataIndex) => {
    props.objectQuery[dataIndex] = value;
    props.handleSearch();
  };

  // sự kiện khi chuyển sang trang kế tiếp

  const HandleClickNextPage = () => {
    +props.objectQuery.pageNumber++;
    props.handleSearch();
  };

  // sự kiện khi chuyển sang trang trước đó

  const HandleClickPrevPage = () => {
    +props.objectQuery.pageNumber--;
    props.handleSearch();
  };

  // sự kiện khi chuyển sang trang đầu

  const HandleClickNextFirstPage = () => {
    props.objectQuery.pageNumber = 1;
    props.handleSearch();
  };

  // sự kiện khi làm mới lại trang

  const HandleClickRefreshPage = () => {
    props.handleRefreshQuery();
    props.handleSearch();
  };

  // sự kiện khi chuyển sang cuối cùng

  const HandleClickNextLastPage = () => {
    props.objectQuery.pageNumber = props.pagination.totalPage;
    props.handleSearch();
  };

  // sự kiện khi thay đổi số phần tử hiển thị

  const HandleChangePageSize = (value) => {
    props.objectQuery.pageSize = value;
    props.handleSearch();
  };

  // sự kiện khi thực hiện 1 hành động (thêm mới hoặc chỉnh sửa)

  const handlePreventDefault = (e, route) => {
    if (state.selectedRowKeys.length > 0) {
      router.push({
        name: route,
        params: {
          id: idProduct.value,
        },
      });
    } else {
      e.preventDefault();
    }
  };

  return {
    Input,
    Select,
    Button,
    Pagination,
    PlusOutlined,
    CopyOutlined,
    EditOutlined,
    DeleteOutlined,
    SyncOutlined,
    state,
    handleColumnInputChange,
    handleColumnSelectChange,
    HandleClickNextLastPage,
    handlePreventDefault,
    onSelectChange,
    HandleChangePageSize,
    HandleClickNextFirstPage,
    HandleClickNextPage,
    HandleClickPrevPage,
    HandleClickRefreshPage,
    isDisabled,
  };
};

export default Table;
