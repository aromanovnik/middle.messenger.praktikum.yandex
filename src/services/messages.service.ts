export class MessagesService {
  sendMessage(message: string): void {
    console.log('[MessagesService] sendMessage -> ', message);
  }
}

export default new MessagesService();
