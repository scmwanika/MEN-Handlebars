/* eslint-disable import/no-unresolved */
import { createRouter, createWebHistory } from 'vue-router';
import { LoginCallback, navigationGuard } from '@okta/okta-vue';

const routes = [
  // ROUTES
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
  },
  {
    path: '/callback',
    component: LoginCallback,
  },
  {
    path: '/create-entity',
    name: 'create_entity',
    component: () => import('@/views/create_entity.vue'),
    /*
    meta: {
      requiresAuth: true,
    },
    */
  },
  {
    path: '/read-entity',
    name: 'read_entity',
    component: () => import('@/views/read_entity.vue'),
    /*
    meta: {
      requiresAuth: true,
    },
    */
  },

  // NON EXISTING ROUTE
  {
    path: '/:pathMatch(.*)*',
    name: 'NoneExistingPage',
    component: () => import('@/views/NoneExistingPage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(navigationGuard);

export default router;
