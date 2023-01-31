import { Block } from 'core';
import { validateForm, ValidateRuleType } from 'helpers';

export type InputComponentProps = {
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
  validate?: ValidateRuleType;
};

export class InputComponent extends Block<InputComponentProps> {
  static override componentName = 'InputComponent';

  constructor({ type = 'text', onBlur, error, validate, ...props }: InputComponentProps) {
    super({
      type,
      error,
      validate,
      onBlur: (event: InputEvent): void => {
        if (typeof validate !== 'undefined') {
          const target = event.target as HTMLInputElement;
          const message = validateForm([
            {
              type: validate,
              value: target.value ?? '',
            },
          ]);

          this.refs['errorRef']?.setProps({
            error: message,
          });
        }

        if (onBlur) {
          onBlur(event);
        }
      },
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
                                   type=type
                                   onInput=onInput
                                   onFocus=onFocus
                                   onChange=onChange
                                   onBlur=onBlur
            }}}
            {{{InputErrorComponent ref='errorRef' error=error}}}
        </div>
    `;
  }
}
