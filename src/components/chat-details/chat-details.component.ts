import { Block } from 'core';

import './chat-details.component.css';
import {
  activeChatHoc,
  ActiveChatHocProps,
  routerHoc,
  RouterHocProps,
  storeHoc,
  StoreHocProps,
} from 'hocs';
import { MessageModel, UserModel } from 'models';
import { ChatsService } from 'services';

export type ChatDetailsComponentProps = RouterHocProps &
  ActiveChatHocProps &
  StoreHocProps & {
    messages: MessageModel[];
    onPopupOpen: () => void;
    onPopupClose: () => void;
    popupIsOpened?: boolean;

    onModalChatUsersOpen: () => void;
    onModalChatUsersClose: () => void;
    modalChatUsersIsOpened?: boolean;
    chatUsers: () => UserModel[] | null;

    deleteChats: () => void;
    deleteUser: (event: MouseEvent) => void;
    addUserInChat: () => void;
  };

export class ChatDetailsComponent extends Block<ChatDetailsComponentProps> {
  static override componentName = 'ChatDetailsComponent';

  constructor(props: ChatDetailsComponentProps) {
    super(props);

    this.setProps({
      onPopupOpen: this.onPopupOpen.bind(this),
      onPopupClose: this.onPopupClose.bind(this),

      deleteChats: this.deleteChats.bind(this),
      deleteUser: this.deleteUser.bind(this),

      onModalChatUsersOpen: this.onModalChatUsersOpen.bind(this),
      onModalChatUsersClose: this.onModalChatUsersClose.bind(this),

      chatUsers: () => this.props.store.getState().chatUsers,
    });
  }

  override propertiesWillUpdate(
    prevProps: ChatDetailsComponentProps,
    nextProps: ChatDetailsComponentProps,
  ) {
    if (prevProps.activeChat?.id !== nextProps.activeChat?.id && nextProps.activeChat?.id) {
      // Load chat users
      this.props.store.dispatch(ChatsService.getUsersChats, {
        id: this.props.activeChat?.id,
      });
    }
  }

  override _componentWillUnmount() {
    super._componentWillUnmount();
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

  addUserInChat(): void {}

  removeUserInChat(): void {}

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

  deleteChats(): void {
    if (!this.props.activeChat?.id) {
      return;
    }
    this.props.store.dispatch(ChatsService.deleteChats, {
      chatId: this.props.activeChat.id,
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

  override componentDidMount(props: ChatDetailsComponentProps) {
    super.componentDidMount(props);
  }

  override componentWillUnmount() {
    super.componentWillUnmount();
  }

  protected override render(): string {
    if (!this.props.activeChat) {
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

                            {{{ButtonComponent title='Добавить участника'}}}

                            {{{ButtonComponent title='Участники'
                                               onClick=onModalChatUsersOpen}}}

                            {{{ButtonComponent title='Удалить чат'
                                               onClick=deleteChats}}}

                        {{/PopupComponent}}
                    </div>

                </div>

                <div class="chat-details__messages">
                    {{#each messages}}
                        {{{ChatMessageComponent message=this}}}
                    {{/each}}
                </div>

                <div class="chat-details__footer">
                    {{{ChatInputComponent}}}
                </div>
            </div>

            <!--Modals-->
            {{#ModalComponent ref='chatUsersModal'
                              isOpened=modalChatUsersIsOpened
                              onClose=onModalChatUsersClose}}
                <div class='modal-chat-users'>
                    {{#each chatUsers}}
                        <div class='chat-user' data-user-id='{{this.id}}'>
                            <div class='chat-user__avatar'>
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

export default routerHoc(
  activeChatHoc(
    storeHoc(ChatDetailsComponent, (state) => ({
      activeChat: state.activeChat,
      chatUsers: state.chatUsers,
    })),
  ),
);
