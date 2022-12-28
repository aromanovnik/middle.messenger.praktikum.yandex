import { Block } from 'core';
// todo: Only for demo
import { userInfo } from 'demo';

import './user-change-pass.component.css';

export class UserChangePassComponent extends Block {
  static override componentName = 'UserChangePassComponent';

  constructor() {
    super();

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
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Старый пароль'
                                        id='userPassOldPassword'
                                        type='password'
                                        name='oldPassword'
                                        placeholder=''
                                }}}
                            </li>

                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Новый пароль'
                                        id='userPassNewPassword'
                                        type='password'
                                        name='newPassword'
                                        placeholder=''
                                }}}
                            </li>

                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Повторите новый пароль'
                                        id='userPassNewPasswordConf'
                                        type='password'
                                        name='newPasswordConf'
                                        placeholder=''
                                }}}
                            </li>
                        </ul>

                        {{{ButtonComponent className='user-change-pass__save' title='Сохранить'}}}
                    </form>
                </div>
            {{/if}}
        </div>
    `;
  }
}
