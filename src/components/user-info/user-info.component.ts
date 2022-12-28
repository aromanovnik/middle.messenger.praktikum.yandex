import { Block } from 'core';
import { userInfo } from 'demo';

import './user-info.component.css';

export class UserInfoComponent extends Block {
  constructor() {
    super();

    // todo: Only for demo
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
                        <li>
                            <span>Почта</span>
                            <span>{{user.email}}</span>
                        </li>
                        <li>
                            <span>Логин</span>
                            <span>{{user.login}}</span>
                        </li>
                        <li>
                            <span>Имя</span>
                            <span>{{user.firstName}}</span>
                        </li>
                        <li>
                            <span>Фамилия</span>
                            <span>{{user.secondName}}</span>
                        </li>
                        <li>
                            <span>Имя в чате</span>
                            <span>{{user.displayName}}</span>
                        </li>
                        <li>
                            <span>Телефон</span>
                            <span>{{user.phone}}</span>
                        </li>
                    </ul>

                    <ul>
                        <li>
                            <a href="#user-settings">Изменить данные</a>
                        </li>
                        <li>
                            <a href="#user-change-password">Изменить пароль</a>
                        </li>
                        <li>
                            <a class='user-page__exit-link' href="/">Выйти</a>
                        </li>
                    </ul>
                </div>

            {{/if}}
        </div>
    `;
  }
}
