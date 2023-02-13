import { ChatsResponse } from 'api';
import { UserModel } from './user.model';
import { MessageModel } from './message.model';
import { config } from '../config';

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

  messages: MessageModel[] = [];

  constructor(chat: ChatsResponse) {
    this.id = chat.id ?? 0;
    this.title = chat.title ?? '';
    this.avatar = chat.avatar ? `${config.api}/resources${chat.avatar}` : '';
    this.unreadCount = chat.unreadCount ?? 0;
    this.lastMessage = {
      user: chat?.last_message?.user ? new UserModel(chat.last_message.user) : undefined,
      time: new Date(chat?.last_message?.time ?? '').toLocaleDateString(),
      content: chat?.last_message?.content,
    };
  }
}
