import { Block } from 'core';

import './sidebar-back.component.css';

export class SidebarBackComponent extends Block {
  protected override render(): string {
    // language=hbs
    return `
        <a href='#home' class='sidebar-back' title='Back'></a>
    `;
  }
}
