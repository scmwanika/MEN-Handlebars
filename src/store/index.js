import Vue from 'vue';
import Vuex from 'vuex';
import guests from './modules/guests';

Vue.use(Vuex);

export default new Vuex.Store({
  // MODULES
  modules: {
    guests,
  },
});
