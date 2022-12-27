import { Block } from 'core';
import { ChatMessageComponentProps } from 'components/chat-message';

export interface ChatDetailsComponentProps {
  // image?: string;
  user: string;
  messages: ChatMessageComponentProps[];
}

export class ChatDetailsComponent extends Block {
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
                    <a href='../../pages/user-details/user-details.hbs'
                       class="chat-details__avatar">
                        {{{UserAvatarComponent image=null}}}
                    </a>

                    <a href='../../pages/user-details/user-details.hbs'
                       class="chat-details__user-name">
                        Genadii
                    </a>

                    <button class="chat-details__menu">
                        <img src='../../../static/images/menu.svg' alt='Menu'>
                    </button>
                </div>

                <div class="chat-details__messages">
                    {{> 'chat-message/chat-message' dateMessage='11.05.2022' text='Hello!' isMyMessage=true}}
                </div>

                <div class="chat-details__footer">
                    <button class="chat-details__button-clip">
                        <img src='../../../static/images/clip.svg' alt='Clip'>
                    </button>

                    <form class="chat-details__form" action="#">
                        <input class="chat-details__input" type="text" name="message"
                               placeholder="Сообщение">
                        <button class="chat-details__button-send">
                            <img src='../../../static/images/send.svg' alt='Send'>
                        </button>
                    </form>
                </div>
            </div>

        </div>
    `;
  }
}
