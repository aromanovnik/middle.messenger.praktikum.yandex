import { Block } from 'core';

import './modal-add-user.component.css';
import { activeChatHoc, ActiveChatHocProps, storeHoc, StoreHocProps } from 'hocs';
import { UserModel } from 'models';
import { ChatsService, UserService } from 'services';

export type ModalAddUserComponentProps = ActiveChatHocProps &
  StoreHocProps & {
    onModalAddUserOpen: () => void;
    onModalAddUserClose: () => void;
    modalAddUserIsOpened?: boolean;
    inputSearchUser?: string | undefined;

    searchUsers: () => UserModel[] | null;
    addUser: (event: MouseEvent) => void;
    onInputSearchUser: (event: InputEvent) => void;
    onSearchUser: (event: MouseEvent) => void;
  };

export class ModalAddUserComponent extends Block<ModalAddUserComponentProps> {
  static override componentName = 'ModalAddUserComponent';

  inputSearchUser: ModalAddUserComponentProps['inputSearchUser'];

  constructor(props: ModalAddUserComponentProps) {
    super(props);

    this.setProps({
      addUser: this.addUser.bind(this),
      onInputSearchUser: this.onInputSearchUser.bind(this),
      onSearchUser: this.onSearchUser.bind(this),

      onModalAddUserOpen: this.onModalAddUserOpen.bind(this),
      onModalAddUserClose: this.onModalAddUserClose.bind(this),

      searchUsers: () => this.props.store.getState().searchUsers,
    });
  }

  onModalAddUserOpen(): void {
    this.setProps({
      modalAddUserIsOpened: true,
    });
  }

  onModalAddUserClose(): void {
    this.setProps({
      modalAddUserIsOpened: false,
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

    this.props.store.dispatch(ChatsService.addUser, {
      users: [userId],
      chatId: this.props.activeChat?.id,
    });
  }

  onInputSearchUser(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    if (!target) {
      return;
    }

    this.inputSearchUser = target.value;
  }

  onSearchUser(event: MouseEvent): void {
    event?.preventDefault();
    this.setProps({
      inputSearchUser: this.inputSearchUser,
    });
    this.props.store.dispatch(UserService.searchUser, {
      login: this.inputSearchUser,
    });
  }

  protected override render(): string {
    // language=hbs
    return `
        <div class='add-user-modal'>
            {{#ModalComponent isOpened=modalAddUserIsOpened
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

                </form>
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
            {{/ModalComponent}}
        </div>
    `;
  }
}

export default activeChatHoc(
  storeHoc(ModalAddUserComponent, (state) => ({
    searchUsers: state.searchUsers,
    searchUsersFormError: state.searchUsersFormError,
  })),
);
