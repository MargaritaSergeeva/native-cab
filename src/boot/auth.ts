/* eslint-disable */
import { boot } from 'quasar/wrappers';
import { createAuth } from '@websanova/vue-auth';
// @ts-ignore
import driverAuthBearer from '@websanova/vue-auth/dist/drivers/auth/bearer.esm.js';
// @ts-ignore
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
// @ts-ignore
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';

export default boot(({ app, router }) => {
  app.use(
    createAuth({
      plugins: {
        http: app.config.globalProperties.$axios,
        router,
      },
      drivers: {
        http: driverHttpAxios,
        auth: driverAuthBearer,
        router: driverRouterVueRouter,
      },
      options: {
        loginData: {
          url: 'auth/token',
          fetchUser: true,
          staySignedIn: true,
          redirect: { name: 'Home' },
        },
        fetchData: {
          url: 'auth/user',
          method: 'GET',
          enabled: true
        },
        refreshData: {
          url: 'auth/token/refresh',
        },
        logoutData: {
          url: 'auth/token/invalidate',
          makeRequest: true,
          redirect: { name: 'Login' },
        },
        authRedirect: { name: 'Login' },
        notFoundRedirect: { name: 'Home' },
      },
    })
  );
});
