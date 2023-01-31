import { Block } from 'core';

import './chat-item.component.css';
import { routerHoc, RouterHocProps, storeHoc, StoreHocProps, userHoc, UserHocProps } from 'hocs';
import { ChatModel } from 'models';

export type ChatItemComponentProps = UserHocProps &
  StoreHocProps &
  RouterHocProps & {
    chat: ChatModel;
    isYou: boolean;
    events: object;
    activeChatId?: number;
    isSelected: boolean;
  };

export class ChatItemComponent extends Block<ChatItemComponentProps> {
  static override componentName = 'ChatItemComponent';

  constructor(props: ChatItemComponentProps) {
    super(props);

    this.setProps({
      isYou: this.props.user?.id === this.props.chat.lastMessage.user?.id,
      isSelected: props.activeChatId === this.props.chat.id,
      events: {
        click: (event: MouseEvent) => {
          event?.preventDefault();
          const link = `${this.props.links!.Messenger}/${this.props.chat.id}`;
          this.props.router.go(link);
        },
      },
    });
  }

  override render(): string {
    // language=hbs
    return `
        <a href='#' class="chat-item {{#if isSelected}}chat-item_active{{/if}}">
            <div class='chat-item__avatar'>
                {{{UserAvatarComponent avatar=chat.avatar}}}
            </div>

            <div class='chat-item__content'>
                <div class='chat-item__title'>{{chat.title}}</div>

                <div class='chat-item__text'>
                    {{#if isYou}}
                        <strong>Вы:</strong>
                    {{/if}}
                    {{chat.lastMessage.content}}
                </div>
            </div>

            <div class='chat-item__sidebar'>
                {{#if chat.lastMessage.time}}
                    <span class='chat-item__date'>{{chat.lastMessage.time}}</span>
                {{/if}}

                {{#if chat.unreadCount}}
                    <span class='chat-item__badge'
                          title='{{chat.unreadCount}}'>{{chat.unreadCount}}</span>
                {{/if}}
            </div>
        </a>
    `;
  }
}

export default routerHoc(
  userHoc(
    storeHoc(ChatItemComponent, (state) => ({
      user: state.user,
    })),
  ),
);
