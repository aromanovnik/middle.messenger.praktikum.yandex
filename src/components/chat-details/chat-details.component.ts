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
import { ChatsService, UserService } from 'services';

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

    onModalAddUserOpen: () => void;
    onModalAddUserClose: () => void;
    modalAddUserIsOpened?: boolean;

    searchUsers: () => UserModel[] | null;
    addUser: (event: MouseEvent) => void;
    onInputSearchUser: (event: InputEvent) => void;
    onSearchUser: (event: MouseEvent) => void;

    deleteChats: () => void;
    deleteUser: (event: MouseEvent) => void;
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
      deleteUser: this.deleteUser.bind(this),
      addUser: this.addUser.bind(this),
      onInputSearchUser: this.onInputSearchUser.bind(this),
      onSearchUser: this.onSearchUser.bind(this),

      onModalChatUsersOpen: this.onModalChatUsersOpen.bind(this),
      onModalChatUsersClose: this.onModalChatUsersClose.bind(this),

      onModalAddUserOpen: this.onModalAddUserOpen.bind(this),
      onModalAddUserClose: this.onModalAddUserClose.bind(this),

      chatUsers: () => this.props.store.getState().chatUsers,
      searchUsers: () => this.props.store.getState().searchUsers,
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

  override componentDidMount(props: ChatDetailsComponentProps) {
    super.componentDidMount(props);
  }

  override componentWillUnmount() {
    super.componentWillUnmount();
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

  onModalChatUsersOpen(): void {
    this.setProps({
      modalChatUsersIsOpened: true,
      popupIsOpened: false,
    });
  }

  onModalChatUsersClose(): void {
    this.setProps({
      modalChatUsersIsOpened: false,
    });
  }

  onModalAddUserOpen(): void {
    this.setProps({
      modalAddUserIsOpened: true,
      popupIsOpened: false,
    });
  }

  onModalAddUserClose(): void {
    this.setProps({
      modalAddUserIsOpened: false,
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

  addUser(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const parent = target?.parentNode as HTMLDivElement;
    if (!parent) {
      return;
    }

    const userId = parseInt(parent.dataset['userId'] ?? '0', 10);
    if (!userId || Number.isNaN(userId)) {
      return;
    }

    console.log('Add User -> ', userId);
    this.props.store.dispatch(ChatsService.addUser, {
      users: [userId],
      chatId: this.props.activeChat?.id,
    });
  }

  onInputSearchUser(event: InputEvent): void {
    console.log('InputEvent -> ', event);
    const target = event.target as HTMLInputElement;
    if (!target) {
      return;
    }

    this.inputSearchUser = target.value;
  }

  onSearchUser(event: MouseEvent): void {
    event?.preventDefault();
    // searchUser
    this.props.store.dispatch(UserService.searchUser, {
      login: this.inputSearchUser,
    });
    console.log('MouseEvent -> ', event);
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

                            {{{ButtonComponent title='Добавить участника'
                                               onClick=onModalAddUserOpen}}}

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

            <!--Modals chat users-->
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

            <!--Modals add user-->
            {{#ModalComponent ref='addUserModal'
                              isOpened=modalAddUserIsOpened
                              onClose=onModalAddUserClose}}

                <form action='#' class='form'>
                    {{{InputComponent
                            label='Логин'
                            className='form__input'
                            id='addUserInput'
                            type='text'
                            name='login'
                            placeholder=''
                            onInput=onInputSearchUser
                            validate=validateRuleType.Message
                    }}}

                    {{{ButtonComponent type='submit'
                                       title='Найти'
                                       onClick=onSearchUser}}}


                    <div class='list-users'>
                        {{#each searchUsers}}
                            <div class='list-users__user' data-user-id='{{this.id}}'>
                                <div class='list-users__avatar'>
                                    {{{UserAvatarComponent avatar=this.avatar}}}
                                </div>
                                <span>{{this.firstName}} {{this.secondName}}</span>

                                {{{ButtonComponent title='Добавить'
                                                   onClick=../addUser}}}
                            </div>
                        {{/each}}
                    </div>
                </form>

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
      searchUsers: state.searchUsers,
      searchUsersFormError: state.searchUsersFormError,
    })),
  ),
);
