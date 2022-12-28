import { Block } from 'core';

import './chat-item.component.css';

export interface ChatItemComponentProps {
  image?: string;
  dateLast?: Date;
  title: string;
  text: string;
  isYoy?: boolean;
  badge?: number;
}

export class ChatItemComponent extends Block {
  static override componentName = 'ChatItemComponent';

  constructor({ image, dateLast, title, text, isYoy, badge }: ChatItemComponentProps) {
    super({ image, dateLast, title, text, isYoy, badge });
  }

  override render(): string {
    // language=hbs
    return `
        <a href='#home/1' class="chat-item">
            <div class='chat-item__avatar'>
                {{{UserAvatarComponent image=null}}}
            </div>
            <div class='chat-item__content'>
                <div class='chat-item__title'>{{title}}</div>

                <div class='chat-item__text'>
                    {{#if isYoy}}
                        <strong>Вы:</strong>
                    {{/if}}
                    {{text}}
                </div>
            </div>
            <div class='chat-item__sidebar'>
                {{#if dateLast}}
                    <span class='chat-item__date'>{{dateLast}}</span>
                {{/if}}

                {{#if badge}}
                    <span class='chat-item__badge' title='{{badge}}'>{{badge}}</span>
                {{/if}}
            </div>
        </a>
    `;
  }
}
