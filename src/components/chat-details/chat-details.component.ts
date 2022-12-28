import { Block } from 'core';
import { messages } from 'demo';

import './chat-details.component.css';

export class ChatDetailsComponent extends Block {
  static override componentName = 'ChatDetailsComponent';

  constructor() {
    super();

    this.setProps({
      messages,
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
                        {{{UserAvatarComponent image=null}}}
                    </a>

                    <a href='#user-details'
                       class="chat-details__user-name">
                        Genadii
                    </a>

                    <button class="chat-details__menu" title="menu"></button>
                </div>

                <div class="chat-details__messages">
                    {{#each messages}}
                        {{{ChatMessageComponent message=this}}}
                    {{/each}}
                </div>

                <div class="chat-details__footer">
                    <button class="chat-details__button-clip" title="Send file">
                    </button>

                    <form class="chat-details__form" action="#">
                        <input class="chat-details__input" type="text" name="message"
                               placeholder="Сообщение">
                        <button class="chat-details__button-send" title="Send message"></button>
                    </form>
                </div>
            </div>

        </div>
    `;
  }
}
