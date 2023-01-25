import { Block } from 'core';

import './chat-details.component.css';
import {
  activeChatHoc,
  ActiveChatHocProps,
  routerHoc,
  RouterHocProps,
  storeHoc,
  StoreHocProps,
} from 'hocs';
import { MessageModel } from 'models';

export type ChatDetailsComponentProps = RouterHocProps &
  ActiveChatHocProps &
  StoreHocProps & {
    messages: MessageModel[];
  };

export class ChatDetailsComponent extends Block<ChatDetailsComponentProps> {
  static override componentName = 'ChatDetailsComponent';

  constructor(props: ChatDetailsComponentProps) {
    super(props);
  }

  override componentDidMount(props: ChatDetailsComponentProps) {
    super.componentDidMount(props);
  }

  override componentWillUnmount() {
    super.componentWillUnmount();
  }

  protected override render(): string {
    if (!this.props.activeChat) {
      // language=hbs
      return `
          <div class="chat-details">
                <span class='chat-details__empty-message'>
                  Выберите чат, чтобы отправить сообщение
                </span>
          </div>
      `;
    }

    // language=hbs
    return `
        <div class="chat-details">
            <div class="chat-details__chat">
                <div class="chat-details__header">
                    <span class="chat-details__avatar">
                        {{{UserAvatarComponent image=activeChat.avatar}}}
                    </span>

                    <span class="chat-details__user-name">
                        {{activeChat.title}}
                    </span>

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

export default routerHoc(
  activeChatHoc(
    storeHoc(ChatDetailsComponent, (state) => ({
      activeChat: state.activeChat,
    })),
  ),
);
