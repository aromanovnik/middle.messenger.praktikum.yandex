import { Block } from 'core';

import './messages.component.css';
import { messagesHoc, MessagesHocProps, StoreHocProps } from 'hocs';

export type MessagesComponentProps = MessagesHocProps &
  StoreHocProps & {
    events?: object;
  };

export class MessagesComponent extends Block<MessagesComponentProps> {
  static override componentName = 'MessagesComponent';

  prevScrollTop?: number;

  constructor(props: MessagesComponentProps) {
    super(props);

    this.setProps({
      events: {
        scroll: this.onScroll.bind(this),
      },
    });
  }

  override propertiesWillUpdate(
    oldProperties: MessagesComponentProps,
    newProperties: MessagesComponentProps,
  ): void {
    super.propertiesWillUpdate(oldProperties, newProperties);

    setTimeout(() => {
      this.element?.scrollTo(0, this.element?.scrollHeight);
    });
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLDivElement;
    if (target.scrollTop === 0 && this.prevScrollTop) {
      this.props.messages?.ws.getOldMessages(this.props.messages?.messages.length ?? 0);
      // this.props.store.getState().messages[];
    }

    this.prevScrollTop = target.scrollTop;
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class="messages">
            {{#each messages.messages}}
                {{{ChatMessageComponent message=this}}}
            {{/each}}
        </div>
    `;
  }
}

export default messagesHoc(MessagesComponent);
