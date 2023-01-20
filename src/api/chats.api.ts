import { HTTPTransport } from 'core';
import {
  BadRequestError,
  ChatDeleteRequest,
  ChatDeleteResponse,
  ChatsResponse,
  CreateChatRequest,
  GetChatRequest,
  UnreadCountResponse,
} from './types.api';

type GetChatsResponseData = [ChatsResponse] | BadRequestError;
type CreateChatsResponseData = {} | BadRequestError;
type DeleteChatsResponseData = ChatDeleteResponse | BadRequestError;
type UnreadCountResponseData = UnreadCountResponse | BadRequestError;

export class ChatsApi {
  public static path = `${process.env['API_ENDPOINT']}/chats`;

  public static async getChats(data: GetChatRequest): Promise<GetChatsResponseData> {
    const res = await HTTPTransport.get(`${ChatsApi.path}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(res.response ?? '[]');
  }

  public static async createChats(data: CreateChatRequest): Promise<CreateChatsResponseData> {
    const res = await HTTPTransport.post(`${ChatsApi.path}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(res.response ?? '{}');
  }

  public static async deleteChats(data: ChatDeleteRequest): Promise<DeleteChatsResponseData> {
    const res = await HTTPTransport.delete(`${ChatsApi.path}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(res.response ?? '{}');
  }

  public static async token(data: { id: number }): Promise<DeleteChatsResponseData> {
    const res = await HTTPTransport.post(`${ChatsApi.path}/token/${data.id}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(res.response ?? '{}');
  }

  public static async newMessagesCount(data: { id: number }): Promise<UnreadCountResponseData> {
    const res = await HTTPTransport.get(`${ChatsApi.path}/new/${data.id}`, {
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(res.response ?? '{}');
  }
}
