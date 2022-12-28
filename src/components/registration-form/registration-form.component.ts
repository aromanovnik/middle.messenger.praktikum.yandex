import { Block } from 'core';

import './registration-form.component.css';

export class RegistrationFormComponent extends Block {
  protected override render(): string {
    // language=hbs
    return `
        <div class='registration-form'>
            <h1 class='registration-form__title'>Регистрация</h1>

            <form action='#' class='registration-form__form form'>
                <div class='form__input'>
                    <label for='registrationFirstName'>Имя</label>
                    <input id='registrationFirstName' type='text' name='first_name'
                           placeholder='' />
                </div>

                <div class='form__input'>
                    <label for='registrationSecondName'>Фамилия</label>
                    <input id='registrationSecondName' type='text' name='second_name'
                           placeholder='' />
                </div>

                <div class='form__input'>
                    <label for='registrationLogin'>Логин</label>
                    <input id='registrationLogin' type='text' name='login' placeholder='' />
                </div>

                <div class='form__input'>
                    <label for='registrationEmail'>Email</label>
                    <input id='registrationEmail' type='email' name='email' placeholder='' />
                </div>

                <div class='form__input'>
                    <label for='registrationEmail'>Телефон</label>
                    <input id='registrationEmail' type='tel' name='phone' placeholder='' />
                </div>

                <div class='form__input'>
                    <label for='registrationPassword'>Пароль</label>
                    <input id='registrationPassword' type='password' name='password'
                           placeholder='' />
                </div>

                <div class='form__input'>
                    <label for='registrationPasswordConfirm'>Пароль (ещё раз)</label>
                    <input
                            id='registrationPasswordConfirm'
                            type='password'
                            name='password-confirm'
                            placeholder=''
                    />
                </div>

                <button class='button'>Войти</button>
                <a href='#auth'>Ещё не зарегистрированы?</a>
            </form>
        </div>
    `;
  }
}
