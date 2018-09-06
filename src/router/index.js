import Vue from "vue";
import Router from "vue-router";

const createListView = type => () =>
  import("../views/CreateListView").then(m => m.default(type));
const ItemView = () => import("../views/ItemView.vue");
const UserView = () => import("../views/UserView.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/top/:page(\\d+)?",
      component: createListView("top")
    },
    {
      path: "/new/:page(\\d+)?",
      component: createListView("new")
    },
    {
      path: "/best/:page(\\d+)?",
      component: createListView("best")
    },
    {
      path: "/show/:page(\\d+)?",
      component: createListView("show")
    },
    {
      path: "/ask/:page(\\d+)?",
      component: createListView("ask")
    },
    {
      path: "/job/:page(\\d+)?",
      component: createListView("job")
    },
    {
      path: "/user/:id(\\w+)?",
      component: UserView
    },
    { path: "/item/:id(\\d+)?", component: ItemView },
    { path: "*", redirect: "/top" }
  ]
});
