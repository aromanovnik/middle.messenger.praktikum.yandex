import { Block } from 'core';

export class HomePage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <main class="home-page page">
            {{{ChatBoxComponent}}}
        </main>
    `;
  }
}
