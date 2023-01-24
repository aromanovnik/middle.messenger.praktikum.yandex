import { ChatMessage, Resource } from 'api';

export class MessageModel {
  id: number;

  userId: number;

  chatId: number;

  time: Date;

  type: ChatMessage.TypeEnum;

  content: string;

  file?: Resource;

  constructor(message: ChatMessage) {
    this.id = message.id;
    this.userId = message.userId;
    this.chatId = message.chatId;
    this.time = message.time;
    this.type = message.type;
    this.content = message.content;
    this.file = message.file;
  }
}
