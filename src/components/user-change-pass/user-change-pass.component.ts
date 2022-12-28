import { Block } from 'core';
import { userInfo } from 'demo';

import './user-change-pass.component.css';

export class UserChangePassComponent extends Block {
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
        <div class='user-change-pass'>
            {{#if user}}
                {{{UserInfoHeadComponent isShowName=false
                                         avatar=user.avatar
                                         firstName=user.firstName}}}

                <div class='user-change-pass__list user-page__list'>
                    <form action='#'>
                        <ul>
                            <li>
                                <label for='userPassOldPassword'>Старый пароль</label>
                                <input id='userPassOldPassword' type='password' name='oldPassword'>
                            </li>

                            <li>
                                <label for='userPassNewPassword'>Новый пароль</label>
                                <input id='userPassNewPassword' type='password' name='newPassword'>
                            </li>

                            <li>
                                <label for='userPassNewPasswordConf'>Повторите новый пароль</label>
                                <input id='userPassNewPasswordConf' type='password'
                                       name='newPasswordConf'>
                            </li>
                        </ul>

                        <button class='button user-change-pass__save'>Сохранить</button>
                    </form>
                </div>
            {{/if}}
        </div>
    `;
  }
}
