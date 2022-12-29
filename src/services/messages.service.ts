import { HTTPTransport } from 'core/http-transport';

export class MessagesService {
  http = new HTTPTransport();

  sendMessage(): void {
    console.log('[MessagesService] sendMessage -> ');
  }
}

export default new MessagesService();
