import { Block } from 'core';
import { UserResponse } from 'api';

import './user-info.component.css';

// На будущее...
export interface UserInfoComponentProps extends Partial<UserResponse> {}

export class UserInfoComponent extends Block {
  constructor({
    avatar,
    firstName,
    secondName,
    login,
    email,
    displayName,
    phone,
  }: UserInfoComponentProps) {
    super({ avatar, firstName, secondName, login, email, displayName, phone });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-info'>

            {{{UserInfoHeadComponent isShowName=true avatar=avatar firstName=firstName}}}

            <div class='user-info__list user-page__list'>
                <ul>
                    <li>
                        <span>Почта</span>
                        <span>pochta@yandex.ru</span>
                        <!--<span>{{email}}</span>-->
                    </li>
                    <li>
                        <span>Логин</span>
                        <span>ivanivanov</span>
                        <!--<span>{{login}}</span>-->
                    </li>
                    <li>
                        <span>Имя</span>
                        <span>Иван</span>
                        <!--<span>{{firstName}}</span>-->
                    </li>
                    <li>
                        <span>Фамилия</span>
                        <span>Иванов</span>
                        <!--<span>{{secondName}}</span>-->
                    </li>
                    <li>
                        <span>Имя в чате</span>
                        <span>Иван</span>
                        <!--<span>{{displayName}}</span>-->
                    </li>
                    <li>
                        <span>Телефон</span>
                        <span>+7 (909) 967 30 30</span>
                        <!--<span>{{phone}}</span>-->
                    </li>
                </ul>

                <ul>
                    <li>
                        <a href="../../pages/user-settings/user-settings.hbs">Изменить данные</a>
                    </li>
                    <li>
                        <a href="../../pages/user-change-password/user-change-password.hbs">Изменить
                            пароль</a>
                    </li>
                    <li>
                        <a class='user-page__exit-link' href="#">Выйти</a>
                    </li>
                </ul>
            </div>

        </div>
    `;
  }
}
