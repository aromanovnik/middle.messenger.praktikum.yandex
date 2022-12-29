import { HTTPTransport } from 'core/http-transport';

export class UserService {
  http = new HTTPTransport();

  editInfo(): void {
    console.log('[UserService] editInfo -> ');
  }

  changePassword(): void {
    console.log('[UserService] changePassword -> ');
  }
}

export default new UserService();
