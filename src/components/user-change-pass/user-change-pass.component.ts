import { Block, Router, Store } from 'core';
import { UserService } from 'services';

// todo: Only for demo
import { ChangePasswordRequest, userInfo, UserResponse } from 'demo';

import './user-change-pass.component.css';
import { validateForm, ValidateRuleType } from 'helpers';
import { routerHoc, storeHoc } from 'hocs';
import { AppState } from 'store';

export interface UserChangePassComponentProps {
  router: Router;
  store: Store<AppState>;
  user?: UserResponse;
  values: ChangePasswordRequest;
  onSubmit?: (event: MouseEvent) => void;
  onInput?: (event: InputEvent) => void;
  validateRuleType: typeof ValidateRuleType;
}

export class UserChangePassComponent extends Block<UserChangePassComponentProps> {
  static override componentName = 'UserChangePassComponent';

  get isValid(): boolean {
    return !validateForm([
      {
        type: ValidateRuleType.Password,
        value: this.formValue.oldPassword,
      },
      {
        type: ValidateRuleType.Password,
        value: this.formValue.newPassword,
      },
    ]);
  }

  formValue: ChangePasswordRequest = {
    oldPassword: '',
    newPassword: '',
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

    this.props.store.dispatch(UserService.changePassword, this.formValue);
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
                    <form>
                        <ul>
                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Старый пароль'
                                        id='userPassOldPassword'
                                        type='password'
                                        name='oldPassword'
                                        ref='oldPassword'
                                        placeholder=''
                                        value=values.oldPassword
                                        onInput=onInput
                                        validate=validateRuleType.Password
                                }}}
                            </li>

                            <li>
                                {{{InputComponent
                                        className='user-page__item-list'
                                        label='Новый пароль'
                                        id='userPassNewPassword'
                                        type='password'
                                        name='newPassword'
                                        ref='newPassword'
                                        placeholder=''
                                        value=values.newPassword
                                        onInput=onInput
                                        validate=validateRuleType.Password
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
                                        validate=validateRuleType.Password
                                }}}
                            </li>
                        </ul>

                        {{{ButtonComponent onClick=onSubmit
                                           type='submit'
                                           className='user-change-pass__save'
                                           title='Сохранить'}}}
                    </form>
                </div>
            {{/if}}
        </div>
    `;
  }
}

export default routerHoc(storeHoc(UserChangePassComponent));
