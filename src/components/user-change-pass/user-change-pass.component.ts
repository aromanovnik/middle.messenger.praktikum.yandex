import { Block } from 'core';
import { UserResponse } from 'api';

import './user-change-pass.component.css';

export interface UserChangePassComponentProps
  extends Partial<Pick<UserResponse, 'avatar' | 'firstName'>> {}

export class UserChangePassComponent extends Block {
  constructor({ avatar, firstName }: UserChangePassComponentProps) {
    super({ avatar, firstName });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-change-pass'>

            {{{UserInfoHeadComponent isShowName=false avatar=avatar firstName=firstName}}}

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

        </div>
    `;
  }
}
