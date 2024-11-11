import { onUpdated, ref, watchEffect } from "vue";
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
import { productRoute } from "@/router/router";

// hàm bổ trợ
const Table = (props, emit) => {
  const router = useRouter();
  const isDisabled = ref(false);
  // cập nhật khi id focus vào thay đổi

  // thực hiện disable action nhân bản và chỉnh sửa khi người dùng chọn nhiểu hơn 1 sản phẩm

  // onUpdated(() => {
  //   if (props.items && props.items.length > 0) {
  //     emit("changeIdFocus", props.items[0].id);
  //   }
  // });

  watchEffect(() => {
    if (props.state.selectedRowKeys.length === 1) {
      isDisabled.value = false;
    } else {
      if (props.state.selectedRowKeys.length > 1) {
        isDisabled.value = true;
      } else if ([props.idFocus].length === 1) {
        isDisabled.value = false;
      }
    }
  });

  // sự kiện khi thay đổi các combo box
  const onSelectChange = (selectedRowKeys) => {
    props.state.selectedRowKeys = selectedRowKeys;
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      emit("changeIdProduct", selectedRowKeys[0]);
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
    if (props.state.selectedRowKeys.length > 0 || [props.idFocus].length > 0) {
      const id = props.idProduct ? props.idProduct : props.idFocus;
      router.push({
        name: route,
        params: {
          id: id,
        },
      });
    } else {
      e.preventDefault();
    }
  };

  // custom lại hàng của bảng

  const customRow = (record) => {
    const idCurrent = record.key ? record.key : props.idFocus;
    const isFocused = props.idFocus === idCurrent;
    return {
      onClick: () => {
        emit("changeIdFocus", record.key);
      },
      onDblclick: (e) => {
        if (!e.target.value) {
          router.push({
            name: productRoute.UPDATE_PRODUCT,
            params: {
              id: record.id,
            },
          });
        }
      },
      className: isFocused ? "focused-row" : "",
    };
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
    customRow,
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
