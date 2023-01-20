import { HTTPTransport } from 'core';
import { BadRequestError, SignInRequest, SignUpRequest, UserResponse } from './types.api';

type SignInResponseData = {} | BadRequestError;
type SignUpResponseData = SignUpRequest | BadRequestError;
type UserResponseData = UserResponse | BadRequestError;

export class AuthApi {
  public static path = `${process.env['API_ENDPOINT']}/auth`;

  public static async signIn(data: SignInRequest): Promise<SignInResponseData> {
    const res = await HTTPTransport.post(`${AuthApi.path}/signin`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return JSON.parse(res.response ?? '{}');
  }

  public static async signUp(data: SignUpRequest): Promise<SignUpResponseData> {
    const res = await HTTPTransport.post(`${AuthApi.path}/signup`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(res.response ?? '{}');
  }

  public static async user(): Promise<UserResponseData> {
    const res = await HTTPTransport.get(`${AuthApi.path}user`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(res.response ?? '{}');
  }

  public static async logout(): Promise<SignUpResponseData> {
    const res = await HTTPTransport.post(`${AuthApi.path}/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(res.response ?? '{}');
  }
}
