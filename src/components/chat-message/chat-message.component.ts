import { Block } from '../../core';

import './chat-message.component.css';

export interface ChatMessageComponentProps {
  isMyMessage?: boolean;
  text: string;
  dateMessage: Date;
}

export class ChatMessageComponent extends Block {
  constructor({ isMyMessage, text, dateMessage }: ChatMessageComponentProps) {
    super({ isMyMessage, text, dateMessage });
  }

  override render(): string {
    // language=hbs
    return `
        <div class='chat-message {{#if isMyMessage}}chat-message_my-message{{/if}}'>
            <p class='chat-message__text'>{{text}}</p>
            <span class='chat-message__date'>
                {{#if isMyMessage}}
                    <span class="chat-message__mark"></span>
                {{/if}}
                {{dateMessage}}
          </span>
        </div>

    `;
  }
}
