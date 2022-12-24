import { boot } from 'quasar/wrappers';
import { AxiosInstance } from 'axios';
import { inject, InjectionKey } from 'vue';
import { createHttpClient } from 'src/common/httpClientFactory';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

if (!process.env.API_URL) {
  throw new Error('process.env.API_URL is not set');
}

const apiKey: InjectionKey<AxiosInstance> = Symbol('api');

export default boot(({ app }) => {
  const httpClient = createHttpClient({
    baseURL: `${process.env.API_URL}`,
    withCredentials: true,
  });
  app.config.globalProperties.$axios = httpClient;
  app.provide(apiKey, httpClient);
});

export function useApi() {
  return <AxiosInstance>inject(apiKey);
}
