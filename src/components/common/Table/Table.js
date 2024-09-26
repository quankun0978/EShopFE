import { reactive, ref } from "vue";
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
import { useLangStore } from "@/store/lang";
// hàm bổ trợ
import { getText } from "@/constants/lang";
const Table = (props) => {
  const langStore = useLangStore();
  const idProduct = ref();
  const state = reactive({
    selectedRowKeys: [],
    listId: [],
    loading: false,
  });
  const router = useRouter();
  // sự kiện khi thay đổi các combo box
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    state.selectedRowKeys = selectedRowKeys;
    if (selectedRows && selectedRows.length > 0 && selectedRows[0].id) {
      state.listId.push(selectedRows[0].id);
      idProduct.value = selectedRows[0].id;
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

  // const handleGetCheckboxProps = (record) => {
  //   idProduct.value = record.id;
  //   console.log(idProduct.value);
  // };

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
    langStore,
    state,
    handleColumnInputChange,
    getText,
    handleColumnSelectChange,
    HandleClickNextLastPage,
    handlePreventDefault,
    onSelectChange,
    HandleChangePageSize,
    HandleClickNextFirstPage,
    HandleClickNextPage,
    HandleClickPrevPage,
    HandleClickRefreshPage,
  };
};

export default Table;
