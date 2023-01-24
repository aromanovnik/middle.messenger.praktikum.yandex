import { Block } from 'core';

import './modal.component.css';
// Modal: https://github.com/noveogroup-amorgunov/practicum-screencasts/blob/084fcd3e797bcc293ee013e3c12bd1eb0eb9025f/sprint-4-tests/src/components/modal/modal.ts

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
      if (
        target.classList?.contains('modal-overlay') ||
        target.classList?.contains('modal__button-close')
      ) {
        this.setProps({ isOpened: false });
      }
    }
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
                <div data-slot='1' class='modal__content'></div>
                {{{ButtonComponent className='modal__button-close' title='x' }}}
            </div>
        </div>
    `;
  }
}
