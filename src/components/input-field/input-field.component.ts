import { Block } from 'core';

export type InputFieldComponentProps = {
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
};

export class InputFieldComponent extends Block<InputFieldComponentProps> {
  static override componentName = 'InputFieldComponent';

  constructor(props: InputFieldComponentProps) {
    super({
      ...props,
      dataKey: props.dataKey || props.name,
      events: {
        input: props.onInput,
        focus: props.onFocus,
        change: props.onChange,
        blur: props.onBlur,
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
               type='{{type}}'
        />
    `;
  }
}
