import { Block } from 'core';

export class UserChangePasswordPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-change-password user-page page'>
            <div class='user-page__sidebar'>
                {{{SidebarBackComponent}}}
            </div>

            <main class='user-page__main'>
                {{{UserChangePassComponent}}}
            </main>
        </div>
    `;
  }
}

// export default routerHoc(UserChangePasswordPage);
