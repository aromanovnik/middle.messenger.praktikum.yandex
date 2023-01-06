import { Block } from 'core';

import './chat-box.component.css';

export class ChatBoxComponent extends Block {
  static override componentName = 'ChatBoxComponent';

  constructor() {
    super();
  }

  override render(): string {
    // language=hbs
    return `
        <div class='chat-box'>
            <div class='chat-box__chat-list'>
                {{{ChatListComponent}}}
            </div>

            <div class='chat-box__chat-details'>
                {{{ChatDetailsComponent}}}
            </div>
        </div>`;
  }
}
