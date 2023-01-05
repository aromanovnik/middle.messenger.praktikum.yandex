import { Block } from 'core';

import './user-avatar.component.css';

export interface UserAvatarComponentProps {
  avatar?: string;
}

export class UserAvatarComponent extends Block<UserAvatarComponentProps> {
  static override componentName = 'UserAvatarComponent';

  constructor({ avatar }: UserAvatarComponentProps) {
    super({ avatar });
  }

  override render(): string {
    // language=hbs
    return `
        <div class='user-avatar'>
            {{#if avatar}}
                <img class='user-avatar__img' src='{{avatar}}' alt='User avatar' />
            {{/if}}
        </div>
    `;
  }
}
