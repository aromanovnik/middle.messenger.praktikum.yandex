import { Block } from 'core';

export class OnboardingPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <ul>
            <li><a href='#home'>Home page</a></li>
            <li><a href='#auth'>Auth page</a></li>
            <li><a href='#registration'>Registration page</a></li>
            <li><a href='#user-settings'>User settings page</a></li>
            <li><a href='#user-details'>User details page</a></li>
            <li><a href='#user-change-password'>User change password page</a></li>
            <li><a href='#404'>Not found page</a></li>
            <li><a href='#server-error'>Server error page</a></li>
        </ul>
    `;
  }
}
