import { MessagesService } from 'services';
import { MessageModel } from './message.model';

export type MessagesModelProps = {
  token: string;
  userId: number;
  chatId: number;
};

export class MessagesModel {
  messages: MessageModel[] = [];

  offset = 0;

  ws: MessagesService;

  userId: number;

  chatId: number;

  token: string;

  constructor(props: MessagesModelProps) {
    this.userId = props.userId;
    this.chatId = props.chatId;
    this.token = props.token;

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

  addMessages(messages: MessageModel[], beginning?: boolean): void {
    if (beginning) {
      this.messages = [...messages, ...this.messages];
    } else {
      this.messages = [...this.messages, ...messages];
    }
  }
}
