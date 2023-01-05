import { Block } from 'core';
import { messagesService } from 'services';
import { validateForm, ValidateRuleType } from 'helpers';

import './chat-input.component.css';

export interface ChatInputComponentProps {
  error?: string;
  values: {
    message: string;
  };
  onSubmit?: (event: MouseEvent) => void;
  onBlur?: () => void;
  onInput?: (event: InputEvent) => void;
}

export class ChatInputComponent extends Block<ChatInputComponentProps> {
  static override componentName = 'ChatInputComponent';

  messagesService = messagesService;

  formValue = {
    message: '',
  };

  constructor() {
    super();

    this.setProps({
      error: '',
      values: this.formValue,
      onSubmit: this.onSubmit.bind(this),
      onBlur: this.onBlur.bind(this),
      onInput: this.onInput.bind(this),
    });
  }

  validate(): string {
    const message = validateForm([
      {
        type: ValidateRuleType.Message,
        value: this.formValue.message,
      },
    ]);

    this.refs['errorRef']?.setProps({
      error: message,
    });

    return message;
  }

  onSubmit(event: MouseEvent): void {
    event?.preventDefault();

    if (this.validate()) {
      return;
    }

    this.messagesService.sendMessage(this.formValue.message);
  }

  onBlur(): void {
    this.validate();
  }

  onInput(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    const name = target?.dataset['key'] ? target?.dataset['key'] : target.name;
    if (name in this.formValue) {
      // @ts-ignore
      this.formValue[name] = target.value;
    }
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class="chat-input">

            <button class="chat-input__button-clip" title="Send file"></button>

            <form class="chat-input__form" action="#">

                {{{InputFieldComponent type='text'
                                       name='message'
                                       placeholder=''
                                       value=values.message
                                       onInput=onInput
                                       onBlur=onBlur
                }}}

                {{{ButtonComponent type='submit'
                                   className='chat-input__button-send'
                                   onClick=onSubmit}}}
            </form>

            {{{InputErrorComponent ref='errorRef' error=error}}}
        </div>
    `;
  }
}
