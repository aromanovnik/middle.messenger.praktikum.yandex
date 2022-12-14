import { Block } from 'core';
import { validateForm, ValidateRuleType } from 'helpers';
import { authService } from 'services';
import { SignUpRequest } from 'demo';

import './registration-form.component.css';

export interface RegistrationFormComponentProps {
  values?: SignUpRequest;
  onSubmit?: (event: MouseEvent) => void;
  onInput?: (event: InputEvent) => void;
  validateRuleType: typeof ValidateRuleType;
}

export class RegistrationFormComponent extends Block<RegistrationFormComponentProps> {
  static override componentName = 'RegistrationFormComponent';

  get isValid(): boolean {
    return !validateForm([
      {
        type: ValidateRuleType.Name,
        value: this.formValue.firstName,
      },
      {
        type: ValidateRuleType.Name,
        value: this.formValue.secondName,
      },
      {
        type: ValidateRuleType.Email,
        value: this.formValue.email,
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
  }

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
        <div class='registration-form'>
            <h1 class='registration-form__title'>??????????????????????</h1>

            <form class='registration-form__form form'>

                {{{InputComponent
                        label='??????'
                        className='form__input'
                        id='registrationFirstName'
                        type='text'
                        name='first_name'
                        dataKey='firstName'
                        placeholder=''
                        value=values.firstName
                        onInput=onInput
                        validate=validateRuleType.Name
                }}}

                {{{InputComponent
                        label='??????????????'
                        className='form__input'
                        id='registrationSecondName'
                        type='text'
                        name='second_name'
                        dataKey='secondName'
                        placeholder=''
                        value=values.secondName
                        onInput=onInput
                        validate=validateRuleType.Name
                }}}

                {{{InputComponent
                        label='??????????'
                        className='form__input'
                        id='registrationLogin'
                        type='text'
                        name='login'
                        placeholder=''
                        value=values.login
                        onInput=onInput
                        validate=validateRuleType.Login
                }}}

                {{{InputComponent
                        label='Email'
                        className='form__input'
                        id='registrationEmail'
                        type='email'
                        name='email'
                        placeholder=''
                        value=values.email
                        onInput=onInput
                        validate=validateRuleType.Email
                }}}

                {{{InputComponent
                        label='??????????????'
                        className='form__input'
                        id='registrationTel'
                        type='tel'
                        name='phone'
                        placeholder=''
                        value=values.phone
                        onInput=onInput
                        validate=validateRuleType.Phone
                }}}

                {{{InputComponent
                        label='????????????'
                        className='form__input'
                        id='registrationPassword'
                        type='password'
                        name='password'
                        placeholder=''
                        value=values.password
                        onInput=onInput
                        validate=validateRuleType.Password
                }}}

                {{{InputComponent
                        label='???????????? (?????? ??????)'
                        className='form__input'
                        id='registrationPasswordConfirm'
                        type='password'
                        name='password_confirm'
                        placeholder=''
                        onInput=onInput
                        validate=validateRuleType.Password
                }}}

                {{{ButtonComponent type='submit'
                                   title='????????????????????????????????????'
                                   onClick=onSubmit}}}
                <a href='#auth'>?????? ??????????</a>
            </form>
        </div>
    `;
  }
}
