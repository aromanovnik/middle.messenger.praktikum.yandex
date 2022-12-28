import { Block } from 'core';
// todo: Only for demo
import { userInfo } from 'demo';

import './user-edit.component.css';

export class UserEditComponent extends Block {
  static override componentName = 'UserEditComponent';

  constructor() {
    super();

    this.setProps({
      user: userInfo,
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-edit'>

            {{#if user}}
                {{{UserInfoHeadComponent isShowName=false
                                         avatar=user.avatar
                                         firstName=user.firstName}}}

                <div class='user-edit__list user-page__list'>
                    <form action='#'>
                        <ul>
                            <li>
                                <label for='userEditEmail'>Почта</label>
                                <input id='userEditEmail' type='email' name='email'
                                       value='{{user.email}}'>
                            </li>
                            <li>
                                <label for='userEditLogin'>Логин</label>
                                <input id='userEditLogin' type='text' name='login'
                                       value='{{user.login}}'>
                            </li>
                            <li>
                                <label for='userEditFirstName'>Имя</label>
                                <input id='userEditFirstName' type='text' name='first_name'
                                       value='{{user.firstName}}'>
                            </li>
                            <li>
                                <label for='userEditSecondName'>Фамилия</label>
                                <input id='userEditSecondName' type='text' name='second_name'
                                       value='{{user.secondName}}'>
                            </li>
                            <li>
                                <label for='userEditDisplayName'>Имя в чате</label>
                                <input id='userEditDisplayName' type='text' name='display_name'
                                       value='{{user.displayName}}'>
                            </li>
                            <li>
                                <label for='userEditPhone'>Телефон</label>
                                <input id='userEditPhone' type='tel' name='phone'
                                       value='{{user.phone}}'>
                            </li>
                        </ul>

                        <button class='button user-edit__save'>Сохранить</button>
                    </form>
                </div>

            {{/if}}
        </div>
    `;
  }
}
