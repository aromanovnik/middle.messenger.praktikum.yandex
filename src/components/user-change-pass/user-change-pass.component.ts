import { Block } from 'core';
import { userService } from 'services';

// todo: Only for demo
import { ChangePasswordRequest, userInfo } from 'demo';

import './user-change-pass.component.css';
import { validateForm, ValidateRuleType } from '../../helpers';

export class UserChangePassComponent extends Block {
  static override componentName = 'UserChangePassComponent';

  userService = userService;

  formValue: ChangePasswordRequest = {
    oldPassword: '',
    newPassword: '',
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
        type: ValidateRuleType.Password,
        value: this.formValue.oldPassword,
      },
      {
        type: ValidateRuleType.Password,
        value: this.formValue.newPassword,
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

    this.userService.changePassword(this.formValue);
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
                                        value=values.oldPassword
                                        onBlur=onBlur
                                        onInput=onInput
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
                                        value=values.newPassword
                                        onBlur=onBlur
                                        onInput=onInput
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

                        {{{InputErrorComponent error=error}}}

                        {{{ButtonComponent className='user-change-pass__save' title='Сохранить'}}}
                    </form>
                </div>
            {{/if}}
        </div>
    `;
  }
}
