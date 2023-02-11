import { UserResponse } from 'api';
import { config } from '../config';

export class UserModel {
  id: number;

  firstName: string;

  secondName: string;

  displayName: string;

  login: string;

  email: string;

  phone: string;

  avatar: string;

  constructor(user: Partial<UserResponse>) {
    this.id = user.id ?? 0;
    this.firstName = user.first_name ?? '';
    this.secondName = user.second_name ?? '';
    this.displayName = user.display_name ?? '';
    this.login = user.login ?? '';
    this.email = user.email ?? '';
    this.phone = user.phone ?? '';
    this.avatar = user.avatar ? `${config.api}/resources${user.avatar}` : '';
  }
}
