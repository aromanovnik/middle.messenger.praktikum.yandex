import { Block } from 'core';

import './messages.component.css';
import { activeChatHoc, ActiveChatHocProps, storeHoc, StoreHocProps } from 'hocs';
import { MessageModel } from 'models';

export type MessagesComponentProps = ActiveChatHocProps &
  StoreHocProps & {
    messages: MessageModel[];
  };

export class MessagesComponent extends Block<MessagesComponentProps> {
  static override componentName = 'MessagesComponent';

  constructor(props: MessagesComponentProps) {
    super(props);
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class="messages">
            {{#each messages}}
                {{{ChatMessageComponent message=this}}}
            {{/each}}
        </div>
    `;
  }
}

export default activeChatHoc(
  storeHoc(MessagesComponent, (state) => ({
    activeChat: state.activeChat,
  })),
);
