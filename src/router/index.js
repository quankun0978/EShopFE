import { createRouter, createWebHistory } from "vue-router";
import { productRoute } from "./router";
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
              name: productRoute.LIST_PRODUCT,
              component: () => import("@/views/Product/list/ListProduct.vue"),
            },
            {
              name: productRoute.CREATE_PRODUCT,
              path: "create",
              component: () =>
                import("@/views/Product/action/ActionProduct.vue"),
            },
            {
              name: productRoute.UPDATE_PRODUCT,
              path: "update/:id",
              component: () =>
                import("@/views/Product/action/ActionProduct.vue"),
            },
            {
              name: productRoute.COPPY_PRODUCT,
              path: "copy/:id",
              component: () =>
                import("@/views/Product/action/ActionProduct.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      redirect: { name: productRoute.LIST_PRODUCT },
    },
  ],
});

export default router;
