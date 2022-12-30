import { Block } from 'core';
import { authService } from 'services';

import './login-form.component.css';

export class LoginFormComponent extends Block {
  static override componentName = 'LoginFormComponent';

  authService = authService;

  formValue: {
    login: string;
    password: string;
  } = {
    login: '',
    password: '',
  };

  constructor() {
    super();

    this.setProps({
      onSubmit: this.onSubmit.bind(this),
      onBlur: this.onBlur.bind(this),
      onInput: this.onInput.bind(this),
    });
  }

  validate(): void {}

  onSubmit(event: MouseEvent): void {
    event?.preventDefault();

    this.authService.auth();
  }

  onBlur(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    console.log('onBlur -> ', target.name, target.value);
  }

  onInput(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    if (target.name in this.formValue) {
      // @ts-ignore
      this.formValue[target.name] = target.value;
    }
    console.log('this.formValue -> ', this.formValue);
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
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{ButtonComponent title='Войти' onClick=onSubmit}}}
                <a href='#registration'>Ещё не зарегистрированы?</a>
            </form>
        </div>
    `;
  }
}
