import { Block } from 'core';
import { ChatMessageComponentProps } from 'components/chat-message';

import './chat-details.component.css';

export interface ChatDetailsComponentProps {
  user: string;
  messages: ChatMessageComponentProps[];
}

export class ChatDetailsComponent extends Block {
  static override componentName = 'ChatDetailsComponent';

  constructor() {
    super();
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
                    {{{ChatMessageComponent dateMessage='11.05.2022'
                                            text='Hello!'
                                            isMyMessage=true}}}
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
