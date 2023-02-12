import { Block } from 'core';

// export type ServerErrorPageProps = RouterHocProps;

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
                    actionText="Назад к чатам"
            }}}
        </main>
    `;
  }
}
