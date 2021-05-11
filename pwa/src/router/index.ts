import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ReaderView from "../views/ReaderView.vue";
import WriterView from "../views/WriterView.vue";
import SettingsView from "../views/SettingsView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/reader",
    name: "Reader",
    component: ReaderView,
  },
  {
    path: "/writer",
    name: "Writer",
    component: WriterView,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
