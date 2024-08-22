<template>
  <a-config-provider
    :theme="{
      token: {
        cardBg: 'red',
        cardGutter: 0,
        horizontalItemMargin: '0',
        horizontalItemMarginRTL: '0',
        horizontalItemGutter: 0,
      }, // Sử dụng theme từ file config
    }"
  >
    <div
      v-if="isAction"
      style="display: flex; width: 100%; background-color: rgb(0, 87, 123)"
    >
      <RouterLink
        :to="{
          name: 'create_product',
        }"
        class="item-action"
      >
        <PlusOutlined />
        Thêm mới
      </RouterLink>
      <RouterLink class="item-action">
        <CopyOutlined />
        Nhan ban
      </RouterLink>
      <RouterLink
        :to="{
          name: 'update_product',
        }"
        class="item-action"
      >
        <EditOutlined />
        Sửa
      </RouterLink>
      <div class="item-action">
        <DeleteOutlined />
        Xoa
      </div>
      <div class="item-action">
        <SyncOutlined />
        Nap
      </div>
    </div>

    <a-table
      :scroll="{ y: '71vh', scrollToFirstRowOnChange: true }"
      :row-selection="{
        selectedRowKeys: state.selectedRowKeys,
        onChange: onSelectChange,
      }"
      :columns="customColumns"
      :data-source="items"
      :pagination="{
        pageSize: 50,
      }"
    >
      <!-- <template #title>
        <div>My Custom Table Title</div>
        <a-input />
      </template> -->
    </a-table>
  </a-config-provider>
</template>

<script>
import { defineComponent, reactive, computed } from "vue";
import {
  PlusOutlined,
  CopyOutlined,
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
} from "@ant-design/icons-vue";

const listSize = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 50, label: "50" },
];

const state = reactive({
  selectedRowKeys: [],
  // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const start = () => {
  state.loading = true;
  // ajax request after empty completing
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};
const onSelectChange = (selectedRowKeys) => {
  console.log("selectedRowKeys changed: ", selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};

const columns = [
  {
    title: "Mã SKU",
    dataIndex: "codeSKU",
    render: (text) => h("div", { style: { fontWeight: "bold" } }, text),
  },
  {
    title: "Tên hàng hóa",
    dataIndex: "name",
    width: "30%",
  },
  {
    title: "Nhóm hàng hóa",
    dataIndex: "group",
  },
  {
    title: "Đơn vị tính",
    dataIndex: "unit",
  },
  {
    title: "Giá bán TB",
    dataIndex: "price",
  },
  {
    title: "Hiển thị trên MH bán hàng",
    dataIndex: "isHide",
  },
  {
    title: "Loại hàng hóa",
    dataIndex: "type",
  },
  {
    title: "Quản lý theo",
    dataIndex: "managerBy",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
];

export default defineComponent({
  data() {
    return {
      state: state,
      columns,
    };
  },
  components: {
    PlusOutlined,
    CopyOutlined,
    EditOutlined,
    DeleteOutlined,
    SyncOutlined,
  },
  props: {
    isAction: {
      type: Boolean,
    },
    items: {
      type: Array,
      required: true,
    },
    customClass: {
      type: String,
      required: false,
      default: "",
    },
    page: {
      type: Number,
      //   required: true,
    },
    pageSize: {
      type: Number,
      //   required: true,
    },
    action: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    position: {
      type: Array,
      required: false,
      default: () => ["bottomRight"],
    },
    totalItems: {
      type: Number,
      //   required: true,
    },
    showSizeChanger: {
      type: Boolean,
      required: false,
      default: false,
    },
    setPage: {
      type: Function,
      //   required: true,
    },
    setPageSize: {
      type: Function,
      //   required: true,
    },
    // columns: {
    //   type: Array,
    //   //   required: true,
    // },
    showTotal: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onPageSizeChange(value) {
      this.setPage(1);
      this.setPageSize(value);
    },
    renderCustomTitle(column) {
      if (column.dataIndex === "name" || column.dataIndex === "age") {
        return `
          <template #title>
            <div>My Custom Table Title</div>
            <a-input />
          </template>
        `;
      }
      return column.title;
    },
  },

  computed: {
    customColumns() {
      return [
        {
          title: "ID",
          dataIndex: "id",
          key: "id",
        },
        {
          title: (column) => this.renderCustomTitle(column),
          dataIndex: "name",
          key: "name",
        },
        {
          title: (column) => this.renderCustomTitle(column),
          dataIndex: "age",
          key: "age",
        },
      ];
    },
  },
});
</script>
<style scoped>
.item-action {
  padding: 8px;
  color: #fff;
  border-right: 1px solid black;
}
:root {
  --table-height: 100vh;
}
</style>
