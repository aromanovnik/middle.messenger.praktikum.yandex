import { ChatMessage, Resource } from 'api';

export class MessageModel {
  id: number;

  userId: number;

  chatId?: number;

  time: string;

  type: ChatMessage.TypeEnum;

  content: string;

  file?: Resource;

  constructor(message: ChatMessage) {
    this.id = message.id;
    this.userId = message.user_id;
    this.chatId = message.chat_id;
    this.time = new Date(message.time).toLocaleDateString();
    this.type = message.type;
    this.content = message.content;
    this.file = message.file;
  }
}
