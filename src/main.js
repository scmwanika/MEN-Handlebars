import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import Carousel3d from 'vue-carousel-3d';
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components';

import router from './router';
import store from './store';
import App from './App.vue';

// STYLES (you could add them via script tags)
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import 'bootstrap/dist/css/bootstrap.css';

Vue.use(BootstrapVue);
Vue.use(Carousel3d);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
