import { Block, Router } from 'core';

import './link.component.css';
import { ScreensPath } from 'router';
import { routerHoc } from 'hocs';

export type LinkComponentProps = {
  router: Router;
  onClick?: (event: MouseEvent) => void;
  title?: string;
  className?: string;
  events: object;
  to?: ScreensPath;
};

export class LinkComponent extends Block<LinkComponentProps> {
  static override componentName = 'LinkComponent';

  constructor({ onClick, title = '', className, to, router }: LinkComponentProps) {
    super({
      router,
      title,
      className,
      to,
      events: {
        click: (event: MouseEvent) => {
          if (typeof to !== 'undefined') {
            event?.preventDefault();
            this.props.router.go(to);
          }
          if (onClick) {
            onClick(event);
          }
        },
      },
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <a href='#' class='link {{className}}'>{{title}}</a>
    `;
  }
}

export default routerHoc(LinkComponent);
