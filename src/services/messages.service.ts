import { HTTPTransport } from 'core/http-transport';

export class MessagesService {
  http = new HTTPTransport();

  sendMessage(message: string): void {
    console.log('[MessagesService] sendMessage -> ', message);
  }
}

export default new MessagesService();
