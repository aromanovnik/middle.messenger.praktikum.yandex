enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  headers?: { [key: string]: string };
  data?: any;
  timeout?: number;
};

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
  get(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.GET }, options.timeout);
  }

  post(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
  }

  put(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  patch(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PATCH }, options.timeout);
  }

  delete(url: string, options: Options): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  }

  request(url: string, options: Options, timeout = 5000): Promise<XMLHttpRequest> {
    const { headers = {}, data } = options;
    let { method } = options;
    if (!method) {
      method = METHOD.GET;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
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
