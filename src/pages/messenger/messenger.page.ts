import { Block } from 'core';

export class MessengerPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <main class="messenger-page page">
            {{{ChatBoxComponent}}}
        </main>
    `;
  }
}

// export default routerHoc(MessengerPage);
