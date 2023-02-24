import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import EmailView from "../views/EmailView.vue";
import AdminEmailView from "../views/AdminEmailView.vue";
import AdminListUsersView from "../views/AdminListUsersView.vue";

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
      path: "/admin/user/:userId/email",
      name: "admin-email",
      component: AdminEmailView,
    },
    {
      path: "/admin/list",
      name: "admin-list",
      component: AdminListUsersView,
    },
  ],
});

export default router;
