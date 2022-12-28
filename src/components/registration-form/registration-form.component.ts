import { Block } from 'core';

import './registration-form.component.css';

export class RegistrationFormComponent extends Block {
  static override componentName = 'RegistrationFormComponent';

  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='registration-form'>
            <h1 class='registration-form__title'>Регистрация</h1>

            <form action='#' class='registration-form__form form'>

                {{{InputComponent
                        label='Имя'
                        className='form__input'
                        id='registrationFirstName'
                        type='text'
                        name='first_name'
                        placeholder=''
                }}}

                {{{InputComponent
                        label='Фамилия'
                        className='form__input'
                        id='registrationSecondName'
                        type='text'
                        name='second_name'
                        placeholder=''
                }}}

                {{{InputComponent
                        label='Логин'
                        className='form__input'
                        id='registrationLogin'
                        type='text'
                        name='login'
                        placeholder=''
                }}}

                {{{InputComponent
                        label='Email'
                        className='form__input'
                        id='registrationEmail'
                        type='email'
                        name='email'
                        placeholder=''
                }}}

                {{{InputComponent
                        label='Телефон'
                        className='form__input'
                        id='registrationTel'
                        type='tel'
                        name='phone'
                        placeholder=''
                }}}

                {{{InputComponent
                        label='Пароль'
                        className='form__input'
                        id='registrationPassword'
                        type='password'
                        name='password'
                        placeholder=''
                }}}

                {{{InputComponent
                        label='Пароль (ещё раз)'
                        className='form__input'
                        id='registrationPasswordConfirm'
                        type='password'
                        name='password-confirm'
                        placeholder=''
                }}}

                {{{ButtonComponent title='Зарегистрироваться'}}}
                <a href='#auth'>Или войти</a>
            </form>
        </div>
    `;
  }
}
