import { Block } from 'core';

import './popup.component.css';

export type PopupComponentProps = {
  isOpened?: boolean;
  onClose?: (event: MouseEvent) => void;
  events?: object;
};

export class PopupComponent extends Block<PopupComponentProps> {
  static override componentName = 'PopupComponent';

  constructor(props: PopupComponentProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          const target = event?.target as HTMLElement;
          if (!target || !target.classList?.contains('popup-overlay')) {
            return;
          }

          if (typeof props.onClose === 'function') {
            props.onClose(event);
            return;
          }

          this.onClose(event);
        },
      },
    });

    this.setProps({
      onClose: (event: MouseEvent) => this.onClose(event),
    });
  }

  onClose(event: MouseEvent) {
    this.setProps({ isOpened: false });
  }

  override render() {
    if (!this.props.isOpened) {
      // language=hbs
      return '<div class="popup popup_hidden"></div>';
    }

    // language=hbs
    return `
        <div>
            <div class='popup-overlay'></div>
            <div class='popup'>
                <div data-slot='1' class='popup__content'></div>
            </div>
        </div>
    `;
  }
}
