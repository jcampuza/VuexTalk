import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { sync } from "vuex-router-sync";
import * as filters from "./util/filters";
import "./registerServiceWorker";
import titleMixin from "./util/title";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.mixin(titleMixin);

Vue.config.productionTip = false;

sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
