import { Block } from 'core';

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
  dataKey?: string;
  id?: string;
}

export class InputComponent extends Block {
  static override componentName = 'InputComponent';

  constructor({ type = 'text', ...props }: InputComponentProps) {
    super({
      ...props,
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='input {{className}}'>
            <label class='input__label' for='{{id}}'>{{label}}</label>
            {{{InputFieldComponent id=id
                                   type=type
                                   name=name
                                   dataKey=dataKey
                                   placeholder=placeholder
                                   value=value
                                   onInput=onInput
                                   onFocus=onFocus
                                   onChange=onChange
                                   onBlur=onBlur
            }}}
            {{{InputErrorComponent error=error}}}
        </div>
    `;
  }
}
