import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import FillAPix from "./fill-a-pix/FillAPix.vue";
import PicAPix from "./pic-a-pix/PicAPix.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", redirect: "/fill-a-pix" },
  { path: "/fill-a-pix", component: FillAPix },
  { path: "/pic-a-pix", component: PicAPix },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
