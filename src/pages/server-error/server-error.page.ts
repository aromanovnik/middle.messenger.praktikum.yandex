import { Block } from 'core';
import { routerHoc, RouterHocProps } from 'hocs';

export type ServerErrorPageProps = RouterHocProps;

export class ServerErrorPage extends Block<ServerErrorPageProps> {
  constructor(props: ServerErrorPageProps) {
    super(props);
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

export default routerHoc(ServerErrorPage);
