import { ChatMessage, ChatsApi } from 'api';
import { apiHasError, apiHasMessage } from 'helpers';
import { ChatModel, MessageModel } from 'models';
import store from 'store';

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

  chat: ChatModel;

  constructor(chat: ChatModel) {
    this.chat = chat;
  }

  async connect(): Promise<void> {
    this.disconnect();

    console.log('🥓', this.chat);

    return new Promise((resolve) => {
      this.socket = new WebSocket(
        `${this.path}/${this.chat.userId}/${this.chat.id}/${this.chat.token}`,
      );
      this.listen();

      // Open
      this.socket?.addEventListener('open', () => {
        this.isOpen = true;
        this.isError = false;

        console.log('WS OPEN!', this.isOpen);

        resolve();
      });

      this.ping();
    });
  }

  disconnect(): void {
    console.log(' - disconnect - ');
    this.socket?.close();
    this.socket = undefined;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  listen(): void {
    // Close
    this.socket?.addEventListener('close', (event) => {
      console.log('WS CLOSE !', this.isOpen);
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
    console.log('Получены данные', event.data);
    let data;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.error(error);
      return;
    }

    if (apiHasMessage(data)) {
      this.chat.addMessage(new MessageModel(data));
      // Тупо для обновления
      store.dispatch({});
    }
  }

  async sendMessage({
    content,
    type = ChatMessage.TypeEnum.Message,
  }: SendMessagePayload): Promise<void> {
    if (!this.isOpen && !this.isError) {
      await this.connect();
    }

    console.log('WS Send -> ', {
      content,
      type,
    });

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
    }, 60000);
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
