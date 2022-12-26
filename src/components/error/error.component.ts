import Block from 'core/block';

import './error.component.css';

export interface ErrorComponentProps {
  title: string;
  subtitle: string;
  actionHref: string;
  actionText: string;
}

export class ErrorComponent extends Block {
  constructor({ title, subtitle, actionHref, actionText }: ErrorComponentProps) {
    super({ title, subtitle, actionHref, actionText });
  }

  override render(): string {
    // language=hbs
    return `
        <div class='error'>
            <h1 class='error__title'>{{title}}</h1>
            <p class='error__desc'>{{subtitle}}</p>
            <a class='error__link' href='{{actionHref}}'>{{actionText}}</a>
        </div>
    `;
  }
}
