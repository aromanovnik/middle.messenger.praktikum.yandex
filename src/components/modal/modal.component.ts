import { Block } from 'core';

import './modal.component.css';

export type ModalComponentProps = {
  isOpened?: boolean;
  onClose?: (event: MouseEvent) => void;
  events?: object;
};

export class ModalComponent extends Block<ModalComponentProps> {
  static override componentName = 'ModalComponent';

  constructor({ isOpened }: ModalComponentProps) {
    super({
      isOpened,
      events: { click: (event: MouseEvent) => this.onClose(event) },
    });

    this.setProps({
      onClose: (event: MouseEvent) => this.onClose(event),
    });
  }

  onClose(event: MouseEvent | undefined) {
    const target = event?.target as HTMLElement;
    if (target) {
      if (target.classList?.contains('modal-overlay')) {
        this.setProps({ isOpened: false });
      }
      return;
    }
    this.setProps({ isOpened: false });
  }

  override render() {
    if (!this.props.isOpened) {
      // language=hbs
      return '<div class="modal modal_hidden"></div>';
    }

    // language=hbs
    return `
        <div>
            <div class='modal-overlay'></div>
            <div class='modal'>
                <div data-slot='1'></div>
                {{{ButtonComponent onClick=onClose title='Close' }}}
            </div>
        </div>
    `;
  }
}
