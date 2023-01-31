import { Block, Router } from 'core';

import './link.component.css';
import { ScreensPath } from 'router';
import { routerHoc } from 'hocs';

export type LinkComponentProps = {
  router: Router;
  onClick: (event: MouseEvent) => void;
  title?: string;
  className?: string;
  events: object;
  to?: ScreensPath;
  onlyBack?: boolean;
};

export class LinkComponent extends Block<LinkComponentProps> {
  static override componentName = 'LinkComponent';

  constructor(props: LinkComponentProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          if (props.onlyBack) {
            this.props.router.back();
            return;
          }

          if (typeof props.to !== 'undefined') {
            event?.preventDefault();
            this.props.router.go(props.to);
          }
          if (props.onClick) {
            props.onClick(event);
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
