import { Block } from 'core';
import { routerHoc } from 'hocs';

export class UserSettingsPage extends Block {
  constructor() {
    super();
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='user-settings user-page page'>
            <div class='user-page__sidebar'>
                {{{SidebarBackComponent}}}
            </div>

            <main class='user-page__main'>
                {{{UserEditComponent}}}
            </main>
        </div>
    `;
  }
}

export default routerHoc(UserSettingsPage);
