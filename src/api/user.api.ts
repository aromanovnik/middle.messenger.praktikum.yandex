import { HTTPTransport } from 'core';
import {
  BadRequestError,
  ChangePasswordRequest,
  FindUserRequest,
  UserRequest,
  UserResponse,
} from './types.api';

type ProfileResponseData = UserResponse | BadRequestError;
type PasswordResponseData = {} | BadRequestError;
type SearchUserResponseData = UserResponse[] | BadRequestError;

export class UserApi {
  public static path = `${process.env['API_ENDPOINT']}/user`;

  public static async profile(data: UserRequest): Promise<ProfileResponseData> {
    const res = await HTTPTransport.put(`${UserApi.path}/profile`, {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let { response } = res;
    try {
      response = JSON.parse(response);
    } catch {
      response = {};
    }
    return response;
  }

  // {avatar}
  public static async profileAvatar(data: FormData): Promise<ProfileResponseData> {
    const res = await HTTPTransport.put(`${UserApi.path}/profile/avatar`, {
      data,
    });
    let { response } = res;
    try {
      response = JSON.parse(response);
    } catch {
      response = {};
    }
    return response;
  }

  public static async password(data: ChangePasswordRequest): Promise<PasswordResponseData> {
    const res = await HTTPTransport.put(`${UserApi.path}/password`, {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let { response } = res;
    try {
      response = JSON.parse(response);
    } catch {
      response = {};
    }
    return response;
  }

  public static async user(data: Pick<UserResponse, 'id'>): Promise<PasswordResponseData> {
    const res = await HTTPTransport.get(`${UserApi.path}/${data.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let { response } = res;
    try {
      response = JSON.parse(response);
    } catch {
      response = {};
    }
    return response;
  }

  public static async search(data: FindUserRequest): Promise<SearchUserResponseData> {
    const res = await HTTPTransport.post(`${UserApi.path}/search`, {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let { response } = res;
    try {
      response = JSON.parse(response);
    } catch {
      response = [];
    }
    return response;
  }
}
