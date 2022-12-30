import { HTTPTransport } from 'core/http-transport';
import { SignInRequest, SignUpRequest } from 'demo';

export class AuthService {
  http = new HTTPTransport();

  auth(data: SignInRequest): void {
    console.log('[AuthService] auth -> ', data);
  }

  registration(data: SignUpRequest): void {
    console.log('[AuthService] registration -> ', data);
  }
}

export default new AuthService();
