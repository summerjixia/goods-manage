import Vue from 'vue';
import Vuex from "vuex";
import Router from 'vue-router';
import App from './App';
import router from './router';
import store from "./store";
import './assets/reset.css'
import ElementUI from 'element-ui';

Vue.use(Vuex);
Vue.use(Router);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router: new Router(router),
  store: new Vuex.Store(store),
  render: h => h(App)
})
