import { Block } from 'core';

export class UserDetailsPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-details user-page page'>
            <div class='user-page__sidebar'>
                {{{SidebarBackComponent}}}
            </div>

            <main class='user-page__main'>
                {{{UserInfoComponent}}}
            </main>
        </div>
    `;
  }
}
