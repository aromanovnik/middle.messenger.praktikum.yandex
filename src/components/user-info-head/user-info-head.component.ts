import { Block } from 'core';

import './user-info-head.component.css';

export type UserInfoHeadComponentProps = {
  avatar?: string;
  firstName?: string;
  isShowName?: boolean;
};

export class UserInfoHeadComponent extends Block<UserInfoHeadComponentProps> {
  static override componentName = 'UserInfoHeadComponent';

  constructor({ avatar, firstName, isShowName }: UserInfoHeadComponentProps) {
    super({ avatar, firstName, isShowName });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-info-head'>
            <div class='user-info-head__avatar'>
                {{#if avatar}}
                    <img src='{{avatar}}' alt='Avatar' />
                {{/if}}

                <div class='user-info-head__change-avatar'>
                    <form>
                        <span>Поменять аватар</span>
                        <input type='file' name='avatar' />
                    </form>

                </div>
            </div>

            {{#if isShowName}}
                <h2 class='user-info-head__user-name'>{{firstName}}</h2>
            {{/if}}
        </div>
    `;
  }
}
