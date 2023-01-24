import { Block } from 'core';

import './button.component.css';

export type ButtonComponentProps = {
  onClick?: (event: MouseEvent) => void;
  title?: string;
  className?: string;
  events: object;
  type?: 'button' | 'submit' | 'reset';
};

export class ButtonComponent extends Block<ButtonComponentProps> {
  static override componentName = 'ButtonComponent';

  constructor({ onClick, title, className, type }: ButtonComponentProps) {
    super({
      title,
      className,
      type,
      events: {
        click: onClick,
      },
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <button class='button {{className}}' type='{{type}}'>{{title}}</button>
    `;
  }
}
