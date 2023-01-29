import { Block } from 'core';
import { routerHoc, RouterHocProps } from 'hocs';

export type NotFoundPageProps = RouterHocProps;

export class NotFoundPage extends Block<NotFoundPageProps> {
  constructor(props: NotFoundPageProps) {
    super(props);
  }

  override render() {
    // language=hbs
    return `
        <main class="not-found-page page">
            {{{ErrorComponent  title='404'
                               subtitle='Не туда попали'
                               actionText='Назад к чатам'}}}
        </main>
    `;
  }
}

export default routerHoc(NotFoundPage);
