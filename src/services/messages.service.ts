import { ChatMessage, ChatsApi } from 'api';
import { apiHasError, apiHasMessage, apiHasMessages } from 'helpers';
import { MessageModel } from 'models';
import store from 'store';
import { MessagesModel } from '../models/messages.model';

export type SendMessagePayload = {
  content: string;
  type?: ChatMessage.TypeEnum;
};
export type RequestGetCountNewMessagesPayload = { id: number };

export class MessagesService {
  path = `${process.env['WS_ENDPOINT']}`;

  socket?: WebSocket;

  isOpen = false;

  isError = false;

  intervalId?: number;

  messagesModel: MessagesModel;

  constructor(messages: MessagesModel) {
    this.messagesModel = messages;
  }

  async connect(): Promise<void> {
    this.disconnect();
    return new Promise((resolve) => {
      this.socket = new WebSocket(
        `${this.path}/${this.messagesModel.userId}/${this.messagesModel.chatId}/${this.messagesModel.token}`,
      );
      this.listen();

      // Open
      this.socket?.addEventListener('open', () => {
        this.isOpen = true;
        this.isError = false;

        resolve();
      });

      this.ping();
    });
  }

  disconnect(): void {
    this.socket?.close();
    this.socket = undefined;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  listen(): void {
    // Close
    this.socket?.addEventListener('close', (event) => {
      this.isOpen = false;
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения, пробуем заново');
        this.connect().then();
      }
    });

    // Error
    this.socket?.addEventListener('error', (event) => {
      console.log('Ошибка', event);
      this.isError = true;
    });

    // Get messages
    this.socket?.addEventListener('message', this.listener.bind(this));
  }

  listener(event: { data: any }): void {
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.error(error);
      return;
    }

    if (apiHasMessage(data)) {
      const message = new MessageModel(data);
      this.messagesModel.addMessage(message);
      const chat = store.getState().chats?.find((el) => el.id === this.messagesModel.chatId);
      if (chat) {
        chat.lastMessage = {
          ...chat.lastMessage,
          content: message.content,
          time: message.time,
        };
      }

      // Тупо для обновления ...
      store.dispatch({
        messages: {
          ...store.getState().messages,
          [this.messagesModel.userId]: this.messagesModel,
        },
      });
    }

    if (apiHasMessages(data)) {
      const messages: MessageModel[] = (data ?? []).map((el) => new MessageModel(el));
      this.messagesModel.addMessages(messages, true);
      // ...
      store.dispatch({
        messages: {
          ...store.getState().messages,
          [this.messagesModel.userId]: this.messagesModel,
        },
      });
    }
  }

  async sendMessage({
    content,
    type = ChatMessage.TypeEnum.Message,
  }: SendMessagePayload): Promise<void> {
    if (!this.isOpen && !this.isError) {
      await this.connect();
    }

    this.socket?.send(
      JSON.stringify({
        content,
        type,
      }),
    );
  }

  ping(): void {
    this.intervalId = window.setInterval(() => {
      this.sendMessage({ content: '', type: ChatMessage.TypeEnum.Ping }).then();
    }, 30000);
  }

  getOldMessages(offset = 0): void {
    this.messagesModel.offset = offset;
    this.sendMessage({
      content: `${offset}`,
      type: ChatMessage.TypeEnum.GetOld,
    }).then();
  }

  async getNewMessages(data: RequestGetCountNewMessagesPayload): Promise<number> {
    let response;
    try {
      response = await ChatsApi.newMessagesCount(data);
    } catch (error) {
      return 0;
    }

    if (apiHasError(response)) {
      return 0;
    }

    return response.unreadCount;
  }
}
