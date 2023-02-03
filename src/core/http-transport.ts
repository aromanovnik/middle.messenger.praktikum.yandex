export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export type Options = {
  method: METHOD;
  headers?: { [key: string]: string };
  data?: any;
  timeout?: number;
};

// todo: Спороно, но сделаю.
// создаем тип метода
export type HTTPMethod = (url: string, options: Omit<Options, 'method'>) => Promise<XMLHttpRequest>;

function queryStringify(data: { [key: string | number]: string }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  // используем тип и удаляем дублирование в аргументах
  static get: HTTPMethod = (url, options) =>
    HTTPTransport.request(url, { ...options, method: METHOD.GET }, options.timeout);

  // используем тип и удаляем дублирование в аргументах
  static put: HTTPMethod = (url, options) =>
    HTTPTransport.request(url, { ...options, method: METHOD.PUT }, options.timeout);

  // используем тип и удаляем дублирование в аргументах
  static post: HTTPMethod = (url, options) =>
    HTTPTransport.request(url, { ...options, method: METHOD.POST }, options.timeout);

  // используем тип и удаляем дублирование в аргументах
  static patch: HTTPMethod = (url, options) =>
    HTTPTransport.request(url, { ...options, method: METHOD.POST }, options.timeout);

  // используем тип и удаляем дублирование в аргументах
  static delete: HTTPMethod = (url, options) =>
    HTTPTransport.request(url, { ...options, method: METHOD.DELETE }, options.timeout);

  static request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
    const { headers = {}, data } = options;
    let { method } = options;
    if (!method) {
      method = METHOD.GET;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      const isGet = method === METHOD.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
