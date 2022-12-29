import { Block } from 'core';

import './login-form.component.css';

export class LoginFormComponent extends Block {
  static override componentName = 'LoginFormComponent';

  constructor() {
    super();
  }

  onSubmit(event: Event): void {
    alert('event');
    console.log('onSubmit', event);
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
                }}}

                {{{InputComponent
                        label='Пароль'
                        className='form__input'
                        id='loginPassword'
                        type='password'
                        name='password'
                        placeholder=''
                }}}

                {{{ButtonComponent title='Войти' onClick=onSubmit}}}
                <a href='#registration'>Ещё не зарегистрированы?</a>
            </form>
        </div>
    `;
  }
}
