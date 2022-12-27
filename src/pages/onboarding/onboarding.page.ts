import { Block } from 'core';

export class OnboardingPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <ul>
            <li><a href='./home/home.hbs'>Home page</a></li>
            <li><a href='./auth/auth.hbs'>Auth page</a></li>
            <li><a href='./registration/registration.hbs'>Registration page</a></li>
            <li><a href='./user-settings/user-settings.hbs'>User settings page</a></li>
            <li><a href='./user-details/user-details.hbs'>User details page</a></li>
            <li><a href='./user-change-password/user-change-password.hbs'>User change password
                page</a></li>
            <li><a href='./not-found/not-found.hbs'>Not found page</a></li>
            <li><a href='./server-error/server-error.hbs'>Server error page</a></li>
        </ul>

    `;
  }
}
