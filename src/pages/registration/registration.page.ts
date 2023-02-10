import { Block } from 'core';

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
