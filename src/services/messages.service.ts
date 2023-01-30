import { Dispatch } from 'core';
import { AppState } from 'store';
import { ChatsApi } from 'api';
import { apiHasError } from '../helpers';

export type ConnectChatPayload = {
  userId: number;
  chatId: number;
  token: string;
};

enum MessageType {
  Ping = 'ping',
  Pong = 'pong',
  UserConnected = 'user connected',
  GetOld = 'get old',
  Message = 'message',
  File = 'file',
}

export type SendMessagePayload = {
  content: string;
  type?: MessageType;
};
export type RequestGetCountNewMessagesPayload = { id: number };

export class MessagesService {
  static path = `${process.env['WS_ENDPOINT']}`;

  static socket?: WebSocket;

  static userId: number;

  static chatId: number;

  static token: string;

  static dispatch: Dispatch<AppState>;

  static state: AppState;

  static intervalId?: number;

  static connect(dispatch: Dispatch<AppState>, state: AppState, action: ConnectChatPayload): void {
    MessagesService.disconnect();

    MessagesService.userId = action.userId;
    MessagesService.chatId = action.chatId;
    MessagesService.token = action.token;
    MessagesService.dispatch = dispatch;
    MessagesService.state = state;

    MessagesService.socket = new WebSocket(
      `${MessagesService.path}/${MessagesService.userId}/${MessagesService.chatId}/${MessagesService.token}`,
    );

    MessagesService.listen();
    MessagesService.ping();
  }

  static disconnect(): void {
    MessagesService.socket?.close();
    MessagesService.socket = undefined;

    if (MessagesService.intervalId) {
      clearInterval(MessagesService.intervalId);
    }
  }

  static listen(): void {
    // Close
    MessagesService.socket?.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения, пробуем заново');
        MessagesService.connect(MessagesService.dispatch, MessagesService.state, {
          userId: MessagesService.userId,
          chatId: MessagesService.chatId,
          token: MessagesService.token,
        });
      }
    });

    // Error
    MessagesService.socket?.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });

    // Get messages
    MessagesService.socket?.addEventListener('message', MessagesService.listener);
  }

  static listener(event): void {
    console.log('Получены данные', event.data);
  }

  static sendMessage({ content, type = MessageType.Message }: SendMessagePayload): void {
    MessagesService.socket?.send(
      JSON.stringify({
        content,
        type,
      }),
    );
  }

  static ping(): void {
    MessagesService.intervalId = window.setInterval(() => {
      MessagesService.sendMessage({ content: '', type: MessageType.Ping });
    }, 5000);
  }

  static async getNewMessages(data: RequestGetCountNewMessagesPayload): Promise<number> {
    MessagesService.dispatch({ isLoading: true, messagesError: null });

    let response;
    try {
      response = await ChatsApi.newMessagesCount(data);
    } catch (error) {
      MessagesService.dispatch({ isLoading: false, messagesError: error as string });
      return 0;
    }

    if (apiHasError(response)) {
      MessagesService.dispatch({ isLoading: false, messagesError: response.reason });
      return 0;
    }

    MessagesService.dispatch({ isLoading: false });

    return response.unreadCount;
  }
}
