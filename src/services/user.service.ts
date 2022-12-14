import { HTTPTransport } from 'core/http-transport';
import { ChangePasswordRequest, UserUpdateRequest } from 'demo';

export class UserService {
  http = new HTTPTransport();

  editInfo(data: UserUpdateRequest): void {
    console.log('[UserService] editInfo -> ', data);
  }

  changePassword(data: ChangePasswordRequest): void {
    console.log('[UserService] changePassword -> ', data);
  }
}

export default new UserService();
