import { Block } from 'core';

import './input-error.component.css';

export interface InputErrorComponentProps {
  error?: string;
}

export class InputErrorComponent extends Block {
  static override componentName = 'InputErrorComponent';

  constructor({ error }: InputErrorComponentProps) {
    super({ error });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='input__error'>{{#if error}}{{error}}{{/if}}</div>
    `;
  }
}
