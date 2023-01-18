import { Block } from 'core';
import { routerHoc } from 'hocs';

export class RegistrationPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <main class='registration-page page'>
            {{{RegistrationFormComponent}}}
        </main>
    `;
  }
}

export default routerHoc(RegistrationPage);
