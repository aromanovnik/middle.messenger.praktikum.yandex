import { Block } from 'core';
// todo: Only for demo
import { messages, chat } from 'demo';

import './chat-details.component.css';

export class ChatDetailsComponent extends Block {
  static override componentName = 'ChatDetailsComponent';

  constructor() {
    super({
      messages,
      chat,
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class="chat-details">

            {{#if isEmpty}}
                <span class='chat-details__empty-message'>
                  Выберите чат чтобы отправить сообщение
                </span>
            {{/if}}


            <div class="chat-details__chat">
                <div class="chat-details__header">
                    <a href='#user-details'
                       class="chat-details__avatar">
                        {{{UserAvatarComponent image=chat.avatar}}}
                    </a>

                    <a href='#user-details'
                       class="chat-details__user-name">
                        {{chat.title}}
                    </a>

                    <button class="chat-details__menu" title="menu"></button>
                </div>

                <div class="chat-details__messages">
                    {{#each messages}}
                        {{{ChatMessageComponent message=this}}}
                    {{/each}}
                </div>

                <div class="chat-details__footer">
                    {{{ChatInputComponent}}}
                </div>
            </div>

        </div>
    `;
  }
}
