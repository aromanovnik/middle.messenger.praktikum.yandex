import { Block } from 'core';
import { userService } from 'services';
// todo: Only for demo
import { userInfo, UserResponse, UserUpdateRequest } from 'demo';

import './user-edit.component.css';
import { validateForm, ValidateRuleType } from 'helpers';

export interface UserEditComponentProps {
  user?: UserResponse;
  values?: UserUpdateRequest;
  onSubmit?: (event: MouseEvent) => void;
  onInput?: (event: InputEvent) => void;
  validateRuleType: typeof ValidateRuleType;
}

export class UserEditComponent extends Block<UserEditComponentProps> {
  static override componentName = 'UserEditComponent';

  get isValid(): boolean {
    return !validateForm([
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
  }

  userService = userService;

  formValue: UserUpdateRequest = {
    firstName: userInfo.firstName ?? '',
    secondName: userInfo.secondName ?? '',
    displayName: userInfo.displayName ?? '',
    email: userInfo.email ?? '',
    login: userInfo.login ?? '',
    phone: userInfo.phone ?? '',
  };

  constructor() {
    super();

    this.setProps({
      user: userInfo,
      values: this.formValue,
      onSubmit: this.onSubmit.bind(this),
      onInput: this.onInput.bind(this),
      validateRuleType: ValidateRuleType,
    });
  }

  onSubmit(event: MouseEvent): void {
    event?.preventDefault();

    if (!this.isValid) {
      return;
    }

    this.userService.editInfo(this.formValue);
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
                                        value=values.email
                                        onInput=onInput
                                        validate=validateRuleType.Email
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
                                        value=values.login
                                        onInput=onInput
                                        validate=validateRuleType.Login
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
                                        value=values.firstName
                                        onInput=onInput
                                        validate=validateRuleType.Name
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
                                        value=values.secondName
                                        onInput=onInput
                                        validate=validateRuleType.Name
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
                                        value=values.displayName
                                        onInput=onInput
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
                                        onInput=onInput
                                        validate=validateRuleType.Phone
                                }}}
                            </li>
                        </ul>

                        {{{ButtonComponent type='submit'
                                           onClick=onSubmit
                                           className='user-edit__save'
                                           title='Сохранить'}}}
                    </form>
                </div>

            {{/if}}
        </div>
    `;
  }
}
