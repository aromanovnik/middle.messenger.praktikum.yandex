import { HTTPTransport } from 'core';
import {
  BadRequestError,
  ChatDeleteRequest,
  ChatDeleteResponse,
  ChatsMessagesTokenResponse,
  ChatsResponse,
  CreateChatRequest,
  GetChatRequest,
  TokenRequest,
  UnreadCountResponse,
  UserResponse,
  UsersRequest,
} from './types.api';
import { config } from '../config';

export type AddUserRequest = { id: number };
export type GetChatsResponseData = [ChatsResponse] | BadRequestError;
export type CreateChatsResponseData = {} | BadRequestError;
export type DeleteChatsResponseData = ChatDeleteResponse | BadRequestError;
export type UnreadCountResponseData = UnreadCountResponse | BadRequestError;
export type UsersResponseData = {} | BadRequestError;
export type GetUsersResponseData = [UserResponse] | BadRequestError;

export class ChatsApi {
  public static path = `${config.api}/chats`;

  public static async getChats(data: GetChatRequest): Promise<GetChatsResponseData> {
    const res = await HTTPTransport.get(`${ChatsApi.path}`, {
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

  public static async createChats(data: CreateChatRequest): Promise<CreateChatsResponseData> {
    const res = await HTTPTransport.post(`${ChatsApi.path}`, {
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

  public static async deleteChats(data: ChatDeleteRequest): Promise<DeleteChatsResponseData> {
    const res = await HTTPTransport.delete(`${ChatsApi.path}`, {
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

  public static async token(data: TokenRequest): Promise<ChatsMessagesTokenResponse> {
    const res = await HTTPTransport.post(`${ChatsApi.path}/token/${data.id}`, {
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

  public static async newMessagesCount(data: { id: number }): Promise<UnreadCountResponseData> {
    const res = await HTTPTransport.get(`${ChatsApi.path}/new/${data.id}`, {
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

  public static async addUser(data: UsersRequest): Promise<UsersResponseData> {
    const res = await HTTPTransport.put(`${ChatsApi.path}/users`, {
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

  public static async removeUser(data: UsersRequest): Promise<UsersResponseData> {
    const res = await HTTPTransport.delete(`${ChatsApi.path}/users`, {
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

  public static async getUsers(data: AddUserRequest): Promise<GetUsersResponseData> {
    const res = await HTTPTransport.get(`${ChatsApi.path}/${data.id}/users`, {
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
}
