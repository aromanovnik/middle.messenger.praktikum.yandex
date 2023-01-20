import { Block, Router, Store } from 'core';

import './user-info-head.component.css';
import { storeHoc } from 'hocs';
import { AppState } from 'store';

export interface UserInfoHeadComponentProps {
  router: Router;
  store: Store<AppState>;
  avatar?: string;
  firstName?: string;
  isShowName?: boolean;
}

export class UserInfoHeadComponent extends Block<UserInfoHeadComponentProps> {
  static override componentName = 'UserInfoHeadComponent';

  // { avatar, firstName, isShowName }: UserInfoHeadComponentProps
  constructor() {
    super();
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

export default storeHoc(UserInfoHeadComponent);
