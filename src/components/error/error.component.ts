import { Block } from 'core';

import './error.component.css';

export interface ErrorComponentProps {
  title: string;
  subtitle?: string;
  actionHref?: string;
  actionText?: string;
}

export class ErrorComponent extends Block {
  static override componentName = 'ErrorComponent';

  constructor({ title, subtitle, actionHref, actionText }: ErrorComponentProps) {
    super({ title, subtitle, actionHref, actionText });
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
                <a class='error__link' href='{{actionHref}}'>{{actionText}}</a>
            {{/if}}
        </div>
    `;
  }
}
