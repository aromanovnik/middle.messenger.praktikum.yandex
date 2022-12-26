import { Block } from 'core';

import './user-avatar.component.css';

export interface UserAvatarComponentProps {
  image?: string;
}

export class UserAvatarComponent extends Block {
  constructor({ image }: UserAvatarComponentProps) {
    super({ image });
  }

  override render(): string {
    // language=hbs
    return `
        <div class='user-avatar'>
            {{#if image}}
                <img class='user-avatar__img' src='{{image}}' alt='User avatar' />
            {{/if}}
        </div>
    `;
  }
}
