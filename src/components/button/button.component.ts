import { Block } from 'core';

import './button.component.css';

export type ButtonComponentProps = {
  onClick?: (event: MouseEvent) => void;
  title?: string;
  className?: string;
  events?: object;
  type?: 'button' | 'submit' | 'reset';
  dataTestId?: string;
};

export class ButtonComponent extends Block<ButtonComponentProps> {
  static override componentName = 'ButtonComponent';

  constructor(props: ButtonComponentProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <button class='button {{className}}'
                {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}}
                type='{{type}}'>
            {{title}}
        </button>
    `;
  }
}
