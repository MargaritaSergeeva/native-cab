import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/lk',
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      auth: true
    }
  },

  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: {auth: false},
        component: () => import('pages/auth/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        meta: {auth: false},
        component: () => import('pages/auth/RegisterPage.vue'),
      },
      // {
      //   path: 'forgot-password',
      //   name: 'ForgotPassword',
      //   component: () => import('pages/auth/ForgotPassword.vue')
      // },
      // {
      //   path: 'sent-email',
      //   name: 'SentEmail',
      //   component: () => import('pages/auth/SentEmail.vue')
      // },
      // {
      //   path: 'new-password',
      //   name: 'NewPassword',
      //   component: () => import('pages/auth/NewPassword.vue')
      // },
      // {
      //   path: 'password-confirm',
      //   name: 'PasswordConfirm',
      //   component: () => import('pages/auth/PasswordConfirm.vue')
      // },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
