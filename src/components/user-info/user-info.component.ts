import { Block, Router, Store } from 'core';
// todo: Only for demo
import { userInfo, UserResponse } from 'demo';

import './user-info.component.css';
import { routerHoc, storeHoc } from 'hocs';
import { AppState } from 'store';

export interface UserInfoComponentProps {
  router: Router;
  store: Store<AppState>;
  user?: UserResponse;
}

export class UserInfoComponent extends Block<UserInfoComponentProps> {
  static override componentName = 'UserInfoComponent';

  constructor() {
    super();

    this.setProps({
      user: userInfo,
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-info'>
            {{#if user}}

                {{{UserInfoHeadComponent isShowName=true
                                         avatar=user.avatar
                                         firstName=user.firstName}}}

                <div class='user-info__list user-page__list'>
                    <ul>
                        <li class='user-page__item-list'>
                            <span>Почта</span>
                            <span>{{user.email}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Логин</span>
                            <span>{{user.login}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Имя</span>
                            <span>{{user.firstName}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Фамилия</span>
                            <span>{{user.secondName}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Имя в чате</span>
                            <span>{{user.displayName}}</span>
                        </li>
                        <li class='user-page__item-list'>
                            <span>Телефон</span>
                            <span>{{user.phone}}</span>
                        </li>
                    </ul>

                    <ul>
                        <li class='user-page__item-list'>
                            <a href="#user-settings">Изменить данные</a>
                        </li>
                        <li class='user-page__item-list'>
                            <a href="#user-change-password">Изменить пароль</a>
                        </li>
                        <li class='user-page__item-list'>
                            <a class='user-page__exit-link' href="/">Выйти</a>
                        </li>
                    </ul>
                </div>

            {{/if}}
        </div>
    `;
  }
}

export default routerHoc(storeHoc(UserInfoComponent));
