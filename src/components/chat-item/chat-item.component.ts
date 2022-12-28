import { Block } from 'core';
import { ChatsResponse, userInfo } from 'demo';

import './chat-item.component.css';

export interface ChatItemComponentProps {
  chat: ChatsResponse;
}

export class ChatItemComponent extends Block {
  static override componentName = 'ChatItemComponent';

  constructor({ chat, ...props }: ChatItemComponentProps) {
    super({ chat, ...props });

    this.setProps({
      user: userInfo,
      isYou: userInfo.id === this.props.chat.lastMessage.user.id,
    });
  }

  override render(): string {
    // language=hbs
    return `
        <a href='#home/{{chat.id}}' class="chat-item">
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
