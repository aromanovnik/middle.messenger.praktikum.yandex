import { ChatsResponse } from 'api';
import { MessagesService } from 'services';
import { UserModel } from './user.model';
import { MessageModel } from './message.model';

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

  token: string;

  messages: MessageModel[] = [];

  ws: MessagesService;

  userId: number;

  constructor(chat: ChatsResponse & { userId: number; token: string }) {
    this.id = chat.id ?? 0;
    this.title = chat.title ?? '';
    this.avatar = chat.avatar ?? '';
    this.unreadCount = chat.unreadCount ?? 0;
    this.lastMessage = {
      user: chat?.last_message?.user ? new UserModel(chat.last_message.user) : undefined,
      time: chat?.last_message?.time,
      content: chat?.last_message?.content,
    };

    this.userId = chat.userId;
    this.token = chat.token;
    this.ws = new MessagesService(this);

    this.ws.connect().then();
  }

  addMessage(message: MessageModel, beginning?: boolean): void {
    if (beginning) {
      this.messages.unshift(message);
    } else {
      this.messages.push(message);
    }
  }
}
