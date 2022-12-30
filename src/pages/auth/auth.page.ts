import { Block } from 'core';

export class AuthPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <main class="auth-page page">
            {{{LoginFormComponent}}}
        </main>
    `;
  }
}
