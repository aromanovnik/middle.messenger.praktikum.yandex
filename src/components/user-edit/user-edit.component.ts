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
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Почта'
                                        id='userEditEmail'
                                        type='email'
                                        name='email'
                                        placeholder=''
                                        value=user.email
                                }}}
                            </li>
                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Логин'
                                        id='userEditLogin'
                                        type='text'
                                        name='login'
                                        placeholder=''
                                        value=user.login
                                }}}
                            </li>
                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Имя'
                                        id='userEditFirstName'
                                        type='text'
                                        name='first_name'
                                        placeholder=''
                                        value=user.firstName
                                }}}
                            </li>
                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Фамилия'
                                        id='userEditSecondName'
                                        type='text'
                                        name='second_name'
                                        placeholder=''
                                        value=user.secondName
                                }}}
                            </li>
                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Имя в чате'
                                        id='userEditDisplayName'
                                        type='text'
                                        name='display_name'
                                        placeholder=''
                                        value=user.displayName
                                }}}
                            </li>
                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Телефон'
                                        id='userEditPhone'
                                        type='tel'
                                        name='phone'
                                        placeholder=''
                                        value=user.phone
                                }}}
                            </li>
                        </ul>

                        {{{ButtonComponent className='user-edit__save' title='Сохранить'}}}
                    </form>
                </div>

            {{/if}}
        </div>
    `;
  }
}
