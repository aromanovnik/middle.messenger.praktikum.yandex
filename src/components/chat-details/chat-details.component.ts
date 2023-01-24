import { Block } from 'core';

import './chat-details.component.css';
import { chatsHoc, ChatsHocProps, routerHoc, RouterHocProps, storeHoc, StoreHocProps } from 'hocs';
import { ChatModel, MessageModel } from 'models';

export type ChatDetailsComponentProps = RouterHocProps &
  ChatsHocProps &
  StoreHocProps & {
    messages: MessageModel[];
    chat: ChatModel | undefined;
    isEmpty: boolean;
  };

export class ChatDetailsComponent extends Block<ChatDetailsComponentProps> {
  static override componentName = 'ChatDetailsComponent';

  constructor(props: ChatDetailsComponentProps) {
    super(props);

    this.props.router.wasChangeParams = () => {
      this.setActiveChat();
    };
  }

  setActiveChat(): void {
    const chatId = this.props.router.getParams()['id-chat'];
    console.log('setActiveChat -> ', chatId);
    this.setProps({
      isEmpty: !chatId,
      chat: !chatId ? undefined : this.props.chats?.find((el) => el.id === parseInt(chatId, 10)),
    });
  }

  override componentDidMount() {
    this.setActiveChat();
  }

  override componentWillUnmount() {
    this.props.router.wasChangeParams = undefined;
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class="chat-details">

            {{#if isEmpty}}
                <span class='chat-details__empty-message'>
                  Выберите чат, чтобы отправить сообщение
                </span>
            {{/if}}


            <div class="chat-details__chat">
                <div class="chat-details__header">
                    <a href='#'
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

export default routerHoc(chatsHoc(storeHoc(ChatDetailsComponent)));
