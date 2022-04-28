import { createRouter, createWebHistory } from "vue-router";

import AboutPage from "../views/AboutPage";
import HomePage from "../views/HomePage";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
  },
  {
    path: "/AboutPage",
    name: "AboutPage",
    component: AboutPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
