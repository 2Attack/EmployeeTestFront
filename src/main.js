import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { makeServer } from "./server"; // this is fake api server
import Buefy from "buefy";
import "./assets/scss/app.scss"; // import main scss style file
import Vuelidate from "vuelidate";

Vue.use(Buefy); // use Buefy plugin
Vue.use(Vuelidate); // use Validate From plugin

Vue.config.productionTip = false;
if (process.env.NODE_ENV === "development") {
  makeServer(); // start fake server
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
