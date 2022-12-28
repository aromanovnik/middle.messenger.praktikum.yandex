import { Block } from 'core';
// todo: Only for demo
import { ChatMessage, userInfo } from 'demo';

import './chat-message.component.css';

export interface ChatMessageComponentProps {
  message: ChatMessage;
}

export class ChatMessageComponent extends Block {
  static override componentName = 'ChatMessageComponent';

  constructor({ message }: ChatMessageComponentProps) {
    super({
      message,
      user: userInfo,
      isMyMessage: userInfo.id === message.userId,
    });
  }

  override render(): string {
    // language=hbs
    return `
        <div class='chat-message {{#if isMyMessage}}chat-message_my-message{{/if}}'>
            <p class='chat-message__text'>{{message.content}}</p>
            <span class='chat-message__date'>
                {{#if isMyMessage}}
                    <span class="chat-message__mark"></span>
                {{/if}}
                {{message.time}}
          </span>
        </div>

    `;
  }
}
