import Vue from "vue";
import App from "./App.vue";
import TinymceEditor from "../src/index";

Vue.use(TinymceEditor);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
