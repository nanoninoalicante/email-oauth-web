import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EmailView from "../views/EmailView.vue";
import AdminEmailView from "../views/AdminEmailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/email",
      name: "email",
      component: EmailView,
    },
    {
      path: "/admin/email",
      name: "admin-email",
      component: AdminEmailView,
    },
  ],
});

export default router;
