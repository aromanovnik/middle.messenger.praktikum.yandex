import { Block } from 'core';

import './login-form.component.css';

export class LoginFormComponent extends Block {
  static override componentName = 'LoginFormComponent';

  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='login-form'>
            <h1 class='login-form__title'>Авторизация</h1>

            <form action='#' class='login-form__form form'>
                <div class='form__input'>
                    <label for='loginLogin'>Логин</label>
                    <input id='loginLogin' type='text' name='login' placeholder='' />
                </div>

                <div class='form__input'>
                    <label for='loginPassword'>Пароль</label>
                    <input id='loginPassword' type='password' name='password' placeholder='' />
                </div>

                <button class='button'>Войти</button>
                <a href='#registration'>Ещё не зарегистрированы?</a>
            </form>
        </div>
    `;
  }
}
