export type MessagesServiceProps = {
  userId: number;
  chatId: number;
  token: string;
};

export type SendMessagePayload = {
  content: string;
  type: string;
};

export class MessagesService {
  path = `${process.env['WS_ENDPOINT']}`;

  socket!: WebSocket;

  isOpen = false;

  constructor({ userId, chatId, token }: MessagesServiceProps) {
    this.socket = new WebSocket(`${this.path}/${userId}/${chatId}/${token}`);

    console.log('this.socket -> ', this.socket);

    this.open().then();

    // Close
    this.socket.addEventListener('close', (event) => {
      this.isOpen = false;

      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    // Error
    this.socket.addEventListener('error', (event) => {
      console.log('Ошибка', event);
    });

    // Get messages
    this.socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
    });
  }

  async open(): Promise<void> {
    return new Promise((resolve) => {
      if (this.isOpen) {
        resolve();
      }

      this.socket.addEventListener('open', () => {
        console.log('Соединение установлено');
        this.isOpen = true;
        resolve();
      });
    });
  }

  async sendMessage({ content, type = 'message' }: SendMessagePayload): Promise<void> {
    await this.open();

    this.socket.send(
      JSON.stringify({
        content,
        type,
      }),
    );
  }
}
