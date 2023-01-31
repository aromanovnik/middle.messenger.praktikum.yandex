import { Block } from 'core';

import './messages.component.css';
import { messagesHoc, MessagesHocProps } from 'hocs';

export type MessagesComponentProps = MessagesHocProps & {};

export class MessagesComponent extends Block<MessagesComponentProps> {
  static override componentName = 'MessagesComponent';

  constructor(props: MessagesComponentProps) {
    super(props);
  }

  protected override render(): string {
    console.log('📩 -> ', this.props);
    // language=hbs
    return `
        <div class="messages">
            {{#each messages}}
                {{{ChatMessageComponent message=this}}}
            {{/each}}
        </div>
    `;
  }
}

export default messagesHoc(MessagesComponent);
