import { Block } from 'core';

import './sidebar-back.component.css';

export class SidebarBackComponent extends Block {
  protected override render(): string {
    // language=hbs
    return `
        <a href='/#home' class='sidebar-back'>
            <img width='28' src='../../../static/images/send.svg' alt='back' />
        </a>
    `;
  }
}
