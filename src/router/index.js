import { createRouter, createWebHistory } from "vue-router";

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
              component: () => import("@/views/Product/ListProduct.vue"),
            },
            {
              name: "create_product",
              path: "create",
              component: () => import("@/views/Product/CreateProduct.vue"),
            },
            {
              name: "update_product",
              path: "update",
              component: () => import("@/views/Product/UpdateProduct.vue"),
            },
          ],
        },
      ],
    },
  ],
});

export default router;
