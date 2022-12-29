import { HTTPTransport } from 'core/http-transport';

export class AuthService {
  http = new HTTPTransport();

  auth(): void {
    console.log('[AuthService] auth -> ');
  }

  registration(): void {
    console.log('[AuthService] registration -> ');
  }
}

export default new AuthService();
