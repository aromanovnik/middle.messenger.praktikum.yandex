import { Block } from 'core';
import { routerHoc } from 'hocs';

export class OnboardingPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <nav>
            <a href='#home'>Home page</a> <br />
            <a href='#auth'>Auth page</a> <br />
            <a href='#registration'>Registration page</a> <br />
            <a href='#user-settings'>User settings page</a> <br />
            <a href='#user-details'>User details page</a> <br />
            <a href='#user-change-password'>User change password page</a> <br />
            <a href='#404'>Not found page</a> <br />
            <a href='#server-error'>Server error page</a> <br />
        </nav>
    `;
  }
}

export default routerHoc(OnboardingPage);
