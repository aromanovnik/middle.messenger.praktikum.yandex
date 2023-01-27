import { Block } from 'core';

import './modal-chat-users.component.css';
import { activeChatHoc, ActiveChatHocProps, storeHoc, StoreHocProps } from 'hocs';
import { UserModel } from 'models';
import { ChatsService } from 'services';

export type ModalChatUsersComponentProps = ActiveChatHocProps &
  StoreHocProps & {
    onModalChatUsersOpen: () => void;
    onModalChatUsersClose: () => void;
    modalChatUsersIsOpened?: boolean;
    chatUsers: () => UserModel[] | null;
    deleteUser: (event: MouseEvent) => void;
  };

export class ModalChatUsersComponent extends Block<ModalChatUsersComponentProps> {
  static override componentName = 'ModalChatUsersComponent';

  constructor(props: ModalChatUsersComponentProps) {
    super(props);

    this.setProps({
      deleteUser: this.deleteUser.bind(this),

      onModalChatUsersOpen: this.onModalChatUsersOpen.bind(this),
      onModalChatUsersClose: this.onModalChatUsersClose.bind(this),

      chatUsers: () => this.props.store.getState().chatUsers,
    });
  }

  onModalChatUsersOpen(): void {
    this.setProps({
      modalChatUsersIsOpened: true,
    });
  }

  onModalChatUsersClose(): void {
    this.setProps({
      modalChatUsersIsOpened: false,
    });
  }

  deleteUser(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const parent = target?.parentNode as HTMLDivElement;
    if (!parent) {
      return;
    }

    const userId = parseInt(parent.dataset['userId'] ?? '0', 10);
    if (!userId || Number.isNaN(userId)) {
      return;
    }

    this.props.store.dispatch(ChatsService.removeUser, {
      users: [userId],
      chatId: this.props.activeChat?.id,
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='chat-users-modal'>
            {{#ModalComponent ref='chatUsersModal'
                              isOpened=modalChatUsersIsOpened
                              onClose=onModalChatUsersClose}}
                <div class='list-users'>
                    {{#each chatUsers}}
                        <div class='list-users__user' data-user-id='{{this.id}}'>
                            <div class='list-users__avatar'>
                                {{{UserAvatarComponent avatar=this.avatar}}}
                            </div>
                            <span>{{this.firstName}} {{this.secondName}}</span>

                            {{{ButtonComponent title='Удалить'
                                               onClick=../deleteUser}}}
                        </div>
                    {{/each}}
                </div>
            {{/ModalComponent}}
        </div>
    `;
  }
}

export default activeChatHoc(
  storeHoc(ModalChatUsersComponent, (state) => ({
    chatUsers: state.chatUsers,
  })),
);
