import { Block } from 'core';

import './sidebar-back.component.css';
import { routerHoc, RouterHocProps } from 'hocs';

export type SidebarBackComponentProps = RouterHocProps & {};

export class SidebarBackComponent extends Block<SidebarBackComponentProps> {
  static override componentName = 'SidebarBackComponent';

  constructor(props: SidebarBackComponentProps) {
    super(props);
  }

  protected override render(): string {
    // language=hbs
    return `
        {{{LinkComponent className='sidebar-back'
                         to=links.Messenger}}}
    `;
  }
}

export default routerHoc(SidebarBackComponent);
