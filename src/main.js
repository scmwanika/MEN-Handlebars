import { createApp } from 'vue';

// IMPORTING OKTA DEPENDENCIES
import OktaVue from '@okta/okta-vue';
import { oktaAuth } from './okta';

import App from './App.vue';
import router from './router';
import store from './store';

// IMPORTING CSS AND JAVASCRIPT
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

createApp(App)
  .use(router)
  .use(store)
  .use(OktaVue, {
    oktaAuth,
    onAuthRequired: () => {
      router.push('/login');
    },
    onAuthResume: () => {
      router.push('/login');
    },
  })
  .mount('#app');
