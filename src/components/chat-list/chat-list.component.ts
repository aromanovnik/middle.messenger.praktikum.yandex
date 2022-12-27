import { Block } from '../../core';

import './chat-list.component.css';

export class ChatListComponent extends Block {
  protected override render(): string {
    // language=hbs
    return `
        <div class="chat-list">

            <div class='chat-list__header'>
                <div class='chat-list__profile-link'>

                    <a href='../../pages/user-details/user-details.hbs'>
                        Профиль
                        <img src='../../../static/images/arrow-right.svg' alt='Arrow right'>
                    </a>

                </div>

                <div class='chat-list__search'>
                    <form action='#'>
                        <input name='chat_search' type='text' placeholder='Поиск'>
                    </form>
                </div>
            </div>

            <div class='chat-list__list'>
                {{> 'chat-item/chat-item'
                        title="Ivan Ivanov"
                        text="This is a text"
                        isYoy=true}}
            </div>
        </div>
    `;
  }
}
