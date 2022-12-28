import { Block } from 'core';
import { chats } from 'demo';

import './chat-list.component.css';

export class ChatListComponent extends Block {
  static override componentName = 'ChatListComponent';

  constructor() {
    super();

    this.setProps({
      chats,
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class="chat-list">

            <div class='chat-list__header'>
                <div class='chat-list__profile-link'>

                    <a href='#user-details'>
                        Профиль
                    </a>

                </div>

                <div class='chat-list__search'>
                    <form action='#'>
                        <input name='chat_search' type='text' placeholder='Поиск'>
                    </form>
                </div>
            </div>

            <div class='chat-list__list'>
                {{#each chats}}
                    {{{ChatItemComponent chat=this}}}
                {{/each}}
            </div>
        </div>
    `;
  }
}
