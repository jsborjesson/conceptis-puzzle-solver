import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import FillAPix from "./fill-a-pix/FillAPix.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/fill-a-pix" },
  { path: "/fill-a-pix", component: FillAPix },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
