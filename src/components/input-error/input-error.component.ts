import { Block } from 'core';

import './input-error.component.css';

export type InputErrorComponentProps = {
  error?: string;
};

export class InputErrorComponent extends Block<InputErrorComponentProps> {
  static override componentName = 'InputErrorComponent';

  constructor({ error }: InputErrorComponentProps) {
    super({ error });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='input__error {{#if error}}input__error_show{{/if}}'>
            {{#if error}}{{error}}{{/if}}
        </div>
    `;
  }
}
