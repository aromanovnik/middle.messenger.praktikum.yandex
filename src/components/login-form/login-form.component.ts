import { Block, Router, Store } from 'core';
import { AuthService, SignInPayload } from 'services';
import { validateForm, ValidateRuleType } from 'helpers';

import './login-form.component.css';
import { routerHoc, storeHoc } from 'hocs';
import { AppState } from 'store';
import { ScreensPath } from 'router';

export interface LoginFormComponentProps {
  router: Router;
  store: Store<AppState>;
  values: SignInPayload;
  onSubmit: (event: MouseEvent) => void;
  goToRegistration: (event: MouseEvent) => void;
  onBlur: () => void;
  onInput: (event: InputEvent) => void;
  validateRuleType: typeof ValidateRuleType;
  formError?: () => string | null;
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

  formValue: SignInPayload = {
    login: '',
    password: '',
  };

  constructor(props: LoginFormComponentProps) {
    super(props);

    this.setProps({
      values: this.formValue,
      onSubmit: this.onSubmit.bind(this),
      goToRegistration: this.goToRegistration.bind(this),
      onInput: this.onInput.bind(this),
      validateRuleType: ValidateRuleType,
      formError: () => this.props.store.getState().loginFormError,
    });
  }

  goToRegistration(event: MouseEvent): void {
    event?.preventDefault();
    this.props.router.go(ScreensPath.Registration);
  }

  onSubmit(event: MouseEvent): void {
    event?.preventDefault();

    if (!this.isValid) {
      return;
    }

    this.props.store.dispatch(AuthService.signIn, this.formValue);
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

                {{{InputErrorComponent error=formError}}}

                {{{ButtonComponent type='submit'
                                   title='Войти'
                                   onClick=onSubmit}}}

                {{{ButtonComponent title='Ещё не зарегистрированы?'
                                   className='button_link'
                                   onClick=goToRegistration}}}
            </form>
        </div>
    `;
  }
}

export default routerHoc(storeHoc(LoginFormComponent));
