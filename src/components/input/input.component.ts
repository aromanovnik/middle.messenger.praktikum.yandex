import { Block } from 'core';

import './input.component.css';

export interface InputComponentProps {
  className?: string;
  onChange?: (event: InputEvent) => void;
  onBlur?: (event: InputEvent) => void;
  onInput?: (event: InputEvent) => void;
  onFocus?: (event: InputEvent) => void;
  type?: 'text' | 'password' | 'email' | 'tel';
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  name?: string;
  id?: string;
}

export class InputComponent extends Block {
  static override componentName = 'InputComponent';

  constructor({
    onInput,
    onFocus,
    onChange,
    onBlur,
    type = 'text',
    ...props
  }: InputComponentProps) {
    super({
      ...props,
      events: {
        input: onInput,
        focus: onFocus,
        change: onChange,
        blur: onBlur,
      },
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='input {{className}}'>
            <label class='input__label' for='{{id}}'>{{label}}</label>
            <input class='input__input'
                   id='{{id}}'
                   type='{{type}}'
                   name='{{name}}'
                   placeholder='{{placeholder}}'
                   value='{{value}}'
            />
            <div class='input__error'>{{#if error}}{{error}}{{/if}}</div>
        </div>
    `;
  }
}
