import { Block } from 'core';
import { UserResponse } from 'api';

import './user-edit.component.css';

export interface UserEditComponentProps extends Partial<UserResponse> {}

export class UserEditComponent extends Block {
  constructor({
    avatar,
    firstName,
    secondName,
    login,
    email,
    displayName,
    phone,
  }: UserEditComponentProps) {
    super({ avatar, firstName, secondName, login, email, displayName, phone });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-edit'>

            {{{UserInfoHeadComponent isShowName=false avatar=avatar firstName=firstName}}}

            <div class='user-edit__list user-page__list'>
                <form action='#'>
                    <ul>
                        <li>
                            <label for='userEditEmail'>Почта</label>
                            <input id='userEditEmail' type='email' name='email'
                                   value='{{email}}'>
                        </li>
                        <li>
                            <label for='userEditLogin'>Логин</label>
                            <input id='userEditLogin' type='text' name='login' value='{{login}}'>
                        </li>
                        <li>
                            <label for='userEditFirstName'>Имя</label>
                            <input id='userEditFirstName' type='text' name='first_name'
                                   value='{{firstName}}'>
                        </li>
                        <li>
                            <label for='userEditSecondName'>Фамилия</label>
                            <input id='userEditSecondName' type='text' name='second_name'
                                   value='{{secondName}}'>
                        </li>
                        <li>
                            <label for='userEditDisplayName'>Имя в чате</label>
                            <input id='userEditDisplayName' type='text' name='display_name'
                                   value='{{displayName}}'>
                        </li>
                        <li>
                            <label for='userEditPhone'>Телефон</label>
                            <input id='userEditPhone' type='tel' name='phone'
                                   value='{{phone}}'>
                        </li>
                    </ul>

                    <button class='button user-edit__save'>Сохранить</button>
                </form>
            </div>

        </div>

    `;
  }
}
