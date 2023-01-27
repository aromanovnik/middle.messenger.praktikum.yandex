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

    console.log('0 🍆');
  }

  override propertiesWillUpdate(
    prevProps: MessagesComponentProps,
    nextProps: MessagesComponentProps,
  ) {
    if (prevProps.activeChat?.id !== nextProps.activeChat?.id && nextProps.activeChat?.id) {
      // Update connect
      console.log('1 🍆');
    }
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
    token: state.token,
  })),
);
