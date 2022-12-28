import { Block } from 'core';

import './button.component.css';

export interface ButtonComponentProps {
  onClick?: () => void;
  title?: string;
  className?: string;
}

export class ButtonComponent extends Block {
  static override componentName = 'ButtonComponent';

  constructor({ onClick, ...props }: ButtonComponentProps) {
    super({
      ...props,
      events: {
        click: onClick,
      },
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <button class='button {{className}}'>{{title}}</button>
    `;
  }
}
