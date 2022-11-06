import { createRouter, createWebHistory } from "vue-router";
import DefaultView from "../views/DefaultView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: DefaultView,
    },
    {
      path: "/from-api",
      name: "fromapi",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/FromApiView.vue"),
    },
  ],
});

export default router;
