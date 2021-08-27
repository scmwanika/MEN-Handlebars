import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@okta/okta-vue';

Vue.use(Auth, {
  issuer: 'https://dev-5812657.okta.com/oauth2/default',
  client_id: '0oavzxa1dSRsQO4gU5d6',
  redirect_uri: 'http://localhost:8080/callback',
  scopes: ['openid', 'profile'],
  pkce: true,
});

Vue.use(VueRouter);

const routes = [
  {
    path: '/admin',
    name: 'AdminPanel',
    component: () => import('../views/AdminPanel.vue'),
    /**
    meta: {
      requiresAuth: true,
    },
    */
  },
  {
    path: '/callback',
    component: Auth.handleCallback(),
  },
  {
    path: '/',
    name: 'AboutPage',
    component: () => import('../views/AboutPage.vue'),
  },
  {
    path: '/visit',
    name: 'VisitPage',
    component: () => import('../views/VisitPage.vue'),
  },
  {
    path: '/coffee',
    name: 'CoffeePage',
    component: () => import('../views/CoffeePage.vue'),
  },
  {
    path: '/testimonial',
    name: 'TestimonialPage',
    component: () => import('../views/TestimonialPage.vue'),
  },
  {
    path: '/view-profile/:id',
    name: 'ViewEmployeeProfile',
    component: () => import('../views/ViewEmployeeProfile.vue'),
  },
  {
    path: '/edit-profile/:id',
    name: 'EditEmployeeProfile',
    component: () => import('../views/EditEmployeeProfile.vue'),
  },
  {
    path: '/edit-booking/:id',
    name: 'EditBooking',
    component: () => import('../views/EditBooking.vue'),
  },
  {
    path: '*',
    name: 'NoneExistingPage',
    component: () => import('../views/NoneExistingPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
