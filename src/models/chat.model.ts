import { ChatsResponse } from 'api';
import { UserModel } from './user.model';

export class ChatModel {
  id: number;

  title: string;

  avatar: string;

  unreadCount: number;

  lastMessage: {
    user?: UserModel;
    time?: string;
    content?: string;
  };

  token?: string;

  constructor(chat: ChatsResponse) {
    this.id = chat.id ?? 0;
    this.title = chat.title ?? '';
    this.avatar = chat.avatar ?? '';
    this.unreadCount = chat.unreadCount ?? 0;
    this.lastMessage = {
      user: chat?.last_message?.user ? new UserModel(chat.last_message.user) : undefined,
      time: chat?.last_message?.time,
      content: chat?.last_message?.content,
    };
  }

  addToken(token: string): ChatModel {
    this.token = token;
    return this;
  }
}
