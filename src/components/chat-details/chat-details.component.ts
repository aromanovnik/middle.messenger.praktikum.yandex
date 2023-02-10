import { Block } from 'core';

import './chat-details.component.css';
import {
  activeChatHoc,
  ActiveChatHocProps,
  routerHoc,
  RouterHocProps,
  storeHoc,
  StoreHocProps,
  userHoc,
  UserHocProps,
} from 'hocs';
import { MessageModel } from 'models';
import { ChatsService } from 'services';
import { ModalAddUserComponent } from '../modal-add-user/modal-add-user.component';
import { ModalChatUsersComponent } from '../modal-chat-users/modal-chat-users.component';

export type ChatDetailsComponentProps = RouterHocProps &
  UserHocProps &
  ActiveChatHocProps &
  StoreHocProps & {
    messages: MessageModel[];
    onPopupOpen: () => void;
    onPopupClose: () => void;
    popupIsOpened?: boolean;
    deleteChats: () => void;

    // Add user
    onModalAddUserOpen: () => void;

    // Chat users
    onModalChatUsersOpen: () => void;
  };

export class ChatDetailsComponent extends Block<ChatDetailsComponentProps> {
  static override componentName = 'ChatDetailsComponent';

  inputSearchUser: string | undefined;

  constructor(props: ChatDetailsComponentProps) {
    super(props);

    this.setProps({
      onPopupOpen: this.onPopupOpen.bind(this),
      onPopupClose: this.onPopupClose.bind(this),
      deleteChats: this.deleteChats.bind(this),

      onModalAddUserOpen: this.onModalAddUserOpen.bind(this),
      onModalChatUsersOpen: this.onModalChatUsersOpen.bind(this),
    });
  }

  onPopupOpen(): void {
    this.setProps({
      popupIsOpened: true,
    });
  }

  onPopupClose(): void {
    this.setProps({
      popupIsOpened: false,
    });
  }

  deleteChats(): void {
    if (!this.props.activeChat?.id) {
      return;
    }
    this.props.store.dispatch(ChatsService.deleteChats, {
      chatId: this.props.activeChat.id,
    });

    this.props.router.go(this.props.links!['Messenger']);
  }

  // Add user
  onModalAddUserOpen(): void {
    this.onPopupClose();
    const addUserModal = this.refs['addUserModal'] as ModalAddUserComponent;
    addUserModal.onModalAddUserOpen();
  }

  // Chat users
  onModalChatUsersOpen(): void {
    this.onPopupClose();
    const chatUsersModal = this.refs['chatUsersModal'] as ModalChatUsersComponent;
    chatUsersModal.onModalChatUsersOpen();
  }

  protected override render(): string {
    if (!this.props.activeChat?.id) {
      // language=hbs
      return `
          <div class="chat-details">
                <span class='chat-details__empty-message'>
                  Выберите чат, чтобы отправить сообщение
                </span>
          </div>
      `;
    }

    // language=hbs
    return `
        <div class="chat-details">
            <div class="chat-details__chat">
                <div class="chat-details__header">
                    <span class="chat-details__avatar">
                        {{{UserAvatarComponent image=activeChat.avatar}}}
                    </span>

                    <span class="chat-details__user-name">
                        {{activeChat.title}}
                    </span>


                    <div class="chat-details__header-menu">
                        {{{ButtonComponent type='submit'
                                           className='chat-details__menu'
                                           onClick=onPopupOpen}}}

                        {{#PopupComponent ref='menuPopup'
                                          isOpened=popupIsOpened
                                          onClose=onPopupClose }}

                            {{{ButtonComponent title='Добавить участника'
                                               onClick=onModalAddUserOpen}}}

                            {{{ButtonComponent title='Участники'
                                               onClick=onModalChatUsersOpen}}}

                            {{{ButtonComponent title='Удалить чат'
                                               onClick=deleteChats}}}

                        {{/PopupComponent}}
                    </div>

                </div>

                {{{MessagesComponent  ref='messages'
                                      chatId=activeChat.id}}}

                <div class="chat-details__footer">
                    {{{ChatInputComponent ref='chatInput'}}}
                </div>
            </div>

            <!--Modals chat users-->
            {{{ModalChatUsersComponent ref='chatUsersModal'}}}

            <!--Modals add user-->
            {{{ModalAddUserComponent ref='addUserModal'}}}

        </div>
    `;
  }
}

export default userHoc(
  routerHoc(
    activeChatHoc(
      storeHoc(ChatDetailsComponent, (state) => ({
        activeChat: state.activeChat,
      })),
    ),
  ),
);
