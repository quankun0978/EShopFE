import { createRouter, createWebHistory } from "vue-router";
// khai báo các route của ứng dụng
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      children: [
        {
          path: "product",
          name: "product",
          component: () => import("@/views/Product/Index.vue"),
          children: [
            {
              path: "",
              name: "list_product",
              component: () => import("@/views/Product/list/ListProduct.vue"),
            },
            {
              name: "create_product",
              path: "create",
              component: () =>
                import("@/views/Product/create/CreateProduct.vue"),
            },
            {
              name: "update_product",
              path: "update/:id",
              component: () =>
                import("@/views/Product/update/UpdateProduct.vue"),
            },
            {
              name: "copy_product",
              path: "copy/:id",
              component: () => import("@/views/Product/coppy/CoppyProduct.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
