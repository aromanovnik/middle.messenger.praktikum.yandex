import { Block } from 'core';

export interface InputFieldComponentProps {
  onChange?: (event: InputEvent) => void;
  onBlur?: (event: InputEvent) => void;
  onInput?: (event: InputEvent) => void;
  onFocus?: (event: InputEvent) => void;
  type?: 'text' | 'password' | 'email' | 'tel';
  placeholder?: string;
  value?: string;
  name?: string;
  id?: string;
  dataKey?: string;
  events?: object;
}

export class InputFieldComponent extends Block<InputFieldComponentProps> {
  static override componentName = 'InputFieldComponent';

  constructor({
    onInput,
    onFocus,
    onChange,
    onBlur,
    type = 'text',
    name,
    dataKey,
    ...props
  }: InputFieldComponentProps) {
    super({
      ...props,
      dataKey: dataKey || name,
      name,
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
        <input class='input__input'
               id='{{id}}'
               type='{{type}}'
               name='{{name}}'
               placeholder='{{placeholder}}'
               value='{{value}}'
               data-key='{{dataKey}}'
        />
    `;
  }
}
