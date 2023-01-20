import { SignInRequest, SignUpRequest } from 'api';

export class AuthService {
  auth(data: SignInRequest): void {
    console.log('[AuthService] auth -> ', data);
  }

  registration(data: SignUpRequest): void {
    console.log('[AuthService] registration -> ', data);
  }
}

export default new AuthService();
