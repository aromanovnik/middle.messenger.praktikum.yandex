import { Block } from 'core';

import './chat-message.component.css';
import { MessageModel } from 'models';
import { userHoc, UserHocProps } from 'hocs';

export type ChatMessageComponentProps = UserHocProps & {
  message: MessageModel;
  isMyMessage: boolean;
};

export class ChatMessageComponent extends Block<ChatMessageComponentProps> {
  static override componentName = 'ChatMessageComponent';

  constructor({ message, ...props }: ChatMessageComponentProps) {
    super({
      ...props,
      message,
    });

    this.setProps({
      isMyMessage: this.props.user?.id === message.userId,
    });
  }

  override render(): string {
    // language=hbs
    return `
        <div class='chat-message {{#if isMyMessage}}chat-message_my-message{{/if}}'>
            <p class='chat-message__text'>{{message.content}}</p>
            <span class='chat-message__date'>
                {{#if isMyMessage}}
                    <span class="chat-message__mark"></span>
                {{/if}}
                {{message.time}}
          </span>
        </div>

    `;
  }
}

export default userHoc(ChatMessageComponent);
