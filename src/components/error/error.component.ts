import { Block } from 'core';

import './error.component.css';
import { routerHoc, RouterHocProps } from 'hocs';

export type ErrorComponentProps = RouterHocProps & {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionText?: string;
};

export class ErrorComponent extends Block<ErrorComponentProps> {
  static override componentName = 'ErrorComponent';

  constructor(props: ErrorComponentProps) {
    super({
      ...props,
      actionHref: props.actionHref ?? props.links.Messenger,
    });
  }

  override render(): string {
    // language=hbs
    return `
        <div class='error'>
            <h1 class='error__title'>{{title}}</h1>
            {{#if subtitle}}
                <p class='error__desc'>{{subtitle}}</p>
            {{/if}}
            {{#if actionText}}
                {{{LinkComponent className='error__link'
                                 title=actionText
                                 to=actionHref}}}
            {{/if}}
        </div>
    `;
  }
}

export default routerHoc(ErrorComponent);
