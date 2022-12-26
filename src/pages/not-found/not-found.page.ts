import Block from 'core/block';

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
                               actionHref='/'
                               actionText='Назад к чатам'}}}
        </main>
    `;
  }
}
