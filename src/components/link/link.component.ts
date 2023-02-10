import { Block, Router } from 'core';

import './link.component.css';
import { ScreensPath } from 'router';
import { routerHoc, RouterHocProps } from 'hocs';

export type LinkComponentProps = RouterHocProps & {
  router: Router;
  onClick: (event: MouseEvent) => void;
  title?: string;
  className?: string;
  events: object;
  to?: ScreensPath;
  onlyBack?: boolean;
  dataTestId?: string;
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
        <a href='#'
           {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}}
           class='link {{className}}'>{{title}}</a>
    `;
  }
}

export default routerHoc(LinkComponent);
