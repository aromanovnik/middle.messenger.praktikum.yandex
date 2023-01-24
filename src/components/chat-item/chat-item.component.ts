import { Block } from 'core';

import './chat-item.component.css';
import { routerHoc, RouterHocProps, userHoc, UserHocProps } from 'hocs';
import { ChatModel } from 'models';

export type ChatItemComponentProps = UserHocProps &
  RouterHocProps & {
    chat: ChatModel;
    isYou: boolean;
    events: object;
  };

export class ChatItemComponent extends Block<ChatItemComponentProps> {
  static override componentName = 'ChatItemComponent';

  constructor({ chat, ...props }: ChatItemComponentProps) {
    super({
      ...props,
      chat,
    });

    this.setProps({
      isYou: this.props.user?.id === chat.lastMessage.user?.id,
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
        <a href='#' class="chat-item">
            <div class='chat-item__avatar'>
                {{{UserAvatarComponent image=chat.lastMessage.user.avatart}}}
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

export default routerHoc(userHoc(ChatItemComponent));
