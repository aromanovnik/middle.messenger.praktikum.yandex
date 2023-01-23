import { Block, Router, Store } from 'core';

import './sidebar-back.component.css';
import { AppState } from 'store';
import { routerHoc } from 'hocs';

export interface SidebarBackComponentProps {
  router: Router;
  store: Store<AppState>;
}

export class SidebarBackComponent extends Block<SidebarBackComponentProps> {
  static override componentName = 'SidebarBackComponent';

  constructor(props: SidebarBackComponentProps) {
    super(props);
  }

  protected override render(): string {
    // language=hbs
    return `
        {{{LinkComponent className='sidebar-back'
                         to=links.messenger}}}
    `;
  }
}

export default routerHoc(SidebarBackComponent);
