import { Block } from 'core';
import { validateForm, ValidateRuleType } from 'helpers';
import { authService } from 'services';
import { SignUpRequest } from 'demo';

import './registration-form.component.css';

export interface RegistrationFormComponentProps {
  error?: string;
  values?: SignUpRequest;
  onSubmit?: (event: MouseEvent) => void;
  onBlur?: () => void;
  onInput?: (event: InputEvent) => void;
}

export class RegistrationFormComponent extends Block<RegistrationFormComponentProps> {
  static override componentName = 'RegistrationFormComponent';

  authService = authService;

  formValue: SignUpRequest = {
    firstName: '',
    secondName: '',
    email: '',
    login: '',
    password: '',
    phone: '',
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
        type: ValidateRuleType.Name,
        value: this.formValue.firstName,
      },
      {
        type: ValidateRuleType.Name,
        value: this.formValue.secondName,
      },
      {
        type: ValidateRuleType.Login,
        value: this.formValue.login,
      },
      {
        type: ValidateRuleType.Password,
        value: this.formValue.password,
      },
      {
        type: ValidateRuleType.Phone,
        value: this.formValue.phone,
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
    const name = target?.dataset['key'] ? target?.dataset['key'] : target.name;
    if (name in this.formValue) {
      // @ts-ignore
      this.formValue[name] = target.value;
    }
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='registration-form'>
            <h1 class='registration-form__title'>Регистрация</h1>

            <form class='registration-form__form form'>

                {{{InputComponent
                        label='Имя'
                        className='form__input'
                        id='registrationFirstName'
                        type='text'
                        name='first_name'
                        dataKey='firstName'
                        placeholder=''
                        value=values.firstName
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputComponent
                        label='Фамилия'
                        className='form__input'
                        id='registrationSecondName'
                        type='text'
                        name='second_name'
                        dataKey='secondName'
                        placeholder=''
                        value=values.secondName
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputComponent
                        label='Логин'
                        className='form__input'
                        id='registrationLogin'
                        type='text'
                        name='login'
                        placeholder=''
                        value=values.login
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputComponent
                        label='Email'
                        className='form__input'
                        id='registrationEmail'
                        type='email'
                        name='email'
                        placeholder=''
                        value=values.email
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputComponent
                        label='Телефон'
                        className='form__input'
                        id='registrationTel'
                        type='tel'
                        name='phone'
                        placeholder=''
                        value=values.phone
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputComponent
                        label='Пароль'
                        className='form__input'
                        id='registrationPassword'
                        type='password'
                        name='password'
                        placeholder=''
                        value=values.password
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputComponent
                        label='Пароль (ещё раз)'
                        className='form__input'
                        id='registrationPasswordConfirm'
                        type='password'
                        name='password_confirm'
                        placeholder=''
                        onBlur=onBlur
                        onInput=onInput
                }}}

                {{{InputErrorComponent error=error}}}

                {{{ButtonComponent type='submit'
                                   title='Зарегистрироваться'
                                   onClick=onSubmit}}}
                <a href='#auth'>Или войти</a>
            </form>
        </div>
    `;
  }
}
