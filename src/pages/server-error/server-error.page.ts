import { Block } from 'core';

export class ServerErrorPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <main class='server-error-page page'>
            {{{ErrorComponent
                    title="500"
                    subtitle="Мы уже фиксим"
                    actionHref="/"
                    actionText="Назад к чатам"
            }}}
        </main>
    `;
  }
}
