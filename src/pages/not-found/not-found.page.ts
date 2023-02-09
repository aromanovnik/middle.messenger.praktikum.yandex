import { Block } from 'core';

export class NotFoundPage extends Block {
  constructor() {
    super();
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

// export default routerHoc(NotFoundPage);
