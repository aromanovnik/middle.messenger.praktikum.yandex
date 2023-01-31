import { Block } from 'core';
import { routerHoc } from 'hocs';

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

export default routerHoc(MessengerPage);
