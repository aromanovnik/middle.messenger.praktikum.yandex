import { Block } from 'core';
import { SignInRequest } from 'demo';
import { authService } from 'services';
import { validateForm, ValidateRuleType } from 'helpers';

import './login-form.component.css';

export class LoginFormComponent extends Block {
  static override componentName = 'LoginFormComponent';

  authService = authService;

  formValue: SignInRequest = {
    login: '',
    password: '',
  };

  constructor() {
    super();

    this.setProps({
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
        type: ValidateRuleType.Login,
        value: this.formValue.login,
      },
      {
        type: ValidateRuleType.Password,
        value: this.formValue.password,
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

    this.authService.auth(this.formValue);
  }

  onBlur(): void {
    this.validate();
  }

  onInput(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    if (target.name in this.formValue) {
      // @ts-ignore
      this.formValue[target.name] = target.value;
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
                        value=values.login
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputComponent
                        label='Пароль'
                        className='form__input'
                        id='loginPassword'
                        type='password'
                        name='password'
                        placeholder=''
                        value=values.password
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputErrorComponent error=error}}}

                {{{ButtonComponent title='Войти' onClick=onSubmit}}}
                <a href='#registration'>Ещё не зарегистрированы?</a>
            </form>
        </div>
    `;
  }
}
