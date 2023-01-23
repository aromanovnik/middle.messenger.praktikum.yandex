import { Block, Router, Store } from 'core';
import { EditUserPayload, UserService } from 'services';

import './user-edit.component.css';
import { validateForm, ValidateRuleType } from 'helpers';
import { routerHoc, storeHoc, userHoc } from 'hocs';
import { AppState } from 'store';
import { UserModel } from 'models';

export interface UserEditComponentProps {
  router: Router;
  store: Store<AppState>;
  user: UserModel;
  values?: EditUserPayload;
  onSubmit?: (event: MouseEvent) => void;
  onInput?: (event: InputEvent) => void;
  validateRuleType: typeof ValidateRuleType;
  formError?: () => string | null;
}

export class UserEditComponent extends Block<UserEditComponentProps> {
  static override componentName = 'UserEditComponent';

  get isValid(): boolean {
    return !validateForm([
      {
        type: ValidateRuleType.Name,
        value: this.formValue.first_name,
      },
      {
        type: ValidateRuleType.Name,
        value: this.formValue.second_name,
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

  formValue: EditUserPayload = {
    first_name: this.props.user.firstName ?? '',
    second_name: this.props.user.secondName ?? '',
    display_name: this.props.user.displayName ?? '',
    email: this.props.user.email ?? '',
    login: this.props.user.login ?? '',
    phone: this.props.user.phone ?? '',
  };

  constructor(props: UserEditComponentProps) {
    super(props);

    this.setProps({
      values: this.formValue,
      onSubmit: this.onSubmit.bind(this),
      onInput: this.onInput.bind(this),
      validateRuleType: ValidateRuleType,
      formError: () => this.props.store.getState().profileFormError,
    });
  }

  onSubmit(event: MouseEvent): void {
    event?.preventDefault();

    if (!this.isValid) {
      return;
    }

    this.props.store.dispatch(UserService.editUser, this.formValue);
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
    console.log(this.props);

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
                                        placeholder=''
                                        value=values.first_name
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
                                        placeholder=''
                                        value=values.second_name
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
                                        placeholder=''
                                        value=values.display_name
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

                        {{{InputErrorComponent error=formError}}}

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

export default userHoc(routerHoc(storeHoc(UserEditComponent)));
