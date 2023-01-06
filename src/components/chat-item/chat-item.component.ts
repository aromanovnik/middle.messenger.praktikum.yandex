import { Block } from 'core';
// todo: Only for demo
import { ChatsResponse, userInfo, UserResponse } from 'demo';

import './chat-item.component.css';

export interface ChatItemComponentProps {
  chat: ChatsResponse;
  user: UserResponse;
  isYou: boolean;
}

export class ChatItemComponent extends Block<ChatItemComponentProps> {
  static override componentName = 'ChatItemComponent';

  constructor({ chat }: ChatItemComponentProps) {
    super({
      chat,
      user: userInfo,
      isYou: userInfo.id === chat.lastMessage.user?.id,
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
