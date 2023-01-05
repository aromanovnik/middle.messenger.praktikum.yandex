import { Block } from 'core';
import { SignInRequest } from 'demo';
import { authService } from 'services';
import { validateForm, ValidateRuleType } from 'helpers';

import './login-form.component.css';

export interface LoginFormComponentProps {
  values?: SignInRequest;
  onSubmit?: (event: MouseEvent) => void;
  onBlur?: () => void;
  onInput?: (event: InputEvent) => void;
  validateRuleType: typeof ValidateRuleType;
}

export class LoginFormComponent extends Block<LoginFormComponentProps> {
  static override componentName = 'LoginFormComponent';

  get isValid(): boolean {
    return !validateForm([
      {
        type: ValidateRuleType.Login,
        value: this.formValue.login,
      },
      {
        type: ValidateRuleType.Password,
        value: this.formValue.password,
      },
    ]);
  }

  authService = authService;

  formValue: SignInRequest = {
    login: '',
    password: '',
  };

  constructor() {
    super();

    this.setProps({
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

    this.authService.auth(this.formValue);
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
        <div class='login-form'>
            <h1 class='login-form__title'>Авторизация</h1>

            <form class='login-form__form form'>

                {{{InputComponent
                        label='Логин'
                        className='form__input'
                        id='loginLogin'
                        type='text'
                        name='login'
                        placeholder=''
                        validate=validateRuleType.Login
                        value=values.login
                        onInput=onInput
                }}}

                {{{InputComponent
                        label='Пароль'
                        className='form__input'
                        id='loginPassword'
                        type='password'
                        name='password'
                        placeholder=''
                        validate=validateRuleType.Password
                        value=values.password
                        onInput=onInput
                }}}

                {{{ButtonComponent type='submit'
                                   title='Войти'
                                   onClick=onSubmit}}}
                <a href='#registration'>Ещё не зарегистрированы?</a>
            </form>
        </div>
    `;
  }
}
