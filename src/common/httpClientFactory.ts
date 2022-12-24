import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CancelStatic,
} from 'axios';
import { Notify } from 'quasar';

const Messages = {
  validationError: 'Ошибка валидации',
  validationErrorDescription: 'Проверьте введенные данные',
  notFound: 'Не найдено',
  forbidden: 'Отказано в доступе',
  unauthorized: 'Недостаточно прав',
  error: 'Ошибка',
  serverError: 'Ошибка обработки запроса',
  networkError: 'Ошибка сети. Проверьте интернет соединение.',
};

interface LaravelErrorResponse {
  message: string;
  errors?: { [key: string]: string[] };
}

function errorJoiner(acc: string[], cur: [string, string[]]): string[] {
  return acc.concat(cur[1].map((err) => `${cur[0]}: ${err}`));
}

function checkErrors({ errors }: LaravelErrorResponse) {
  if (errors) {
    const joinedErrors = Object.entries(errors).reduce(errorJoiner, []);
    const message = joinedErrors.map((item: string) => {
        return `<div>${item}</div>`
    })
    showError(Messages.validationError, message.join(''));
    return true;
  }
  return false;
}

function showError(title: string, message?: string) {
  Notify.create({
    message: title,
    caption: message,
    type: 'negative',
    timeout: 5000,
    html: true,
    progress: true,
    position: 'bottom-right'
  });
}

function showInfo(message: string) {
  Notify.create({
    message: message,
    timeout: 5000,
  });
}

function registerInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<LaravelErrorResponse> | CancelStatic) => {
      if (error instanceof axios.Cancel) {
        showInfo('Request cancelled');
        return Promise.reject(error);
      }
      error = error as AxiosError<LaravelErrorResponse>;

      if (error?.response === undefined) {
        showError('Неизвестная ошибка в запросе: response = undefined');
        return Promise.reject(error);
      }

      const { data, status } = error?.response;
      if (status === undefined) {
        showError('Неизвестная ошибка в запросе: statatus = undefined');
        return Promise.reject(error);
      }

      const errorMessage = data?.message;

      switch (status) {
        case 401:
          break;
        case 419: {
          showError(errorMessage || Messages.unauthorized);
          break;
        }
        case 403: {
          showError(errorMessage || Messages.forbidden);
          break;
        }
        case 404: {
          showError(errorMessage || Messages.notFound);
          break;
        }
        case 400:
        case 422: {
          if (!checkErrors(data)) {
            showError(
              Messages.validationError,
              errorMessage || Messages.validationErrorDescription
            );
          }
          break;
        }
        case 429:
        case 500: {
          showError(Messages.serverError, errorMessage || error.message);
          break;
        }
        default:
          showError(
            `Неизвестный код ошибки: ${status}`,
            errorMessage || error.message
          );
      }
      return Promise.reject(error);
    }
  );
}

export function createHttpClient(config?: AxiosRequestConfig) {
  const instance = axios.create(config);
  registerInterceptors(instance);

  return instance;
}
