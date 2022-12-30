import { Block } from 'core';
import { userService } from 'services';
// todo: Only for demo
import { userInfo, UserUpdateRequest } from 'demo';

import './user-edit.component.css';
import { validateForm, ValidateRuleType } from '../../helpers';

export class UserEditComponent extends Block {
  static override componentName = 'UserEditComponent';

  userService = userService;

  formValue: UserUpdateRequest = {
    firstName: '',
    secondName: '',
    displayName: '',
    login: '',
    email: '',
    phone: '',
  };

  constructor() {
    super();

    this.setProps({
      user: userInfo,
      error: '',
      values: this.formValue,
      onSubmit: this.onSubmit.bind(this),
      onBlur: this.onBlur.bind(this),
      onInput: this.onInput.bind(this),
    });
  }

  validate(): string {
    const message = validateForm([
      {
        type: ValidateRuleType.Name,
        value: this.formValue.firstName,
      },
      {
        type: ValidateRuleType.Name,
        value: this.formValue.secondName,
      },
      {
        type: ValidateRuleType.Login,
        value: this.formValue.login,
      },
      {
        type: ValidateRuleType.Email,
        value: this.formValue.email,
      },
      {
        type: ValidateRuleType.Phone,
        value: this.formValue.phone,
      },
    ]);

    this.setProps({
      error: message,
      values: this.formValue,
    });
    return message;
  }

  onSubmit(event: MouseEvent): void {
    event?.preventDefault();

    if (this.validate()) {
      return;
    }

    this.userService.editInfo(this.formValue);
  }

  onBlur(): void {
    this.validate();
  }

  onInput(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    const name = target?.dataset['key'] ? target?.dataset['key'] : target.name;
    if (name in this.formValue) {
      // @ts-ignore
      this.formValue[name] = target.value;
    }
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
                                        dataKey='firstName'
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
                                        dataKey='secondName'
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
                                        dataKey='displayName'
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

                        {{{InputErrorComponent error=error}}}

                        {{{ButtonComponent className='user-edit__save' title='Сохранить'}}}
                    </form>
                </div>

            {{/if}}
        </div>
    `;
  }
}
