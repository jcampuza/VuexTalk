import Vue from "vue";
import Router from "vue-router";

const TopItemsView = () => import("../views/Top.vue");
const ItemView = () => import("../views/ItemView.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: "/top/:page(\\d+)?", component: TopItemsView },
    { path: "/item/:id(\\d+)?", component: ItemView },
    { path: "/", redirect: "/top" }
  ]
});
