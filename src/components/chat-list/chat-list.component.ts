import { Block } from 'core';
import './chat-list.component.css';
import {
  activeChatHoc,
  ActiveChatHocProps,
  chatsHoc,
  ChatsHocProps,
  routerHoc,
  RouterHocProps,
  storeHoc,
  StoreHocProps,
} from 'hocs';
import { ChatsService, CreateChatPayload } from 'services';
import { validateForm, ValidateRuleType } from 'helpers';

export type ChatListComponentProps = RouterHocProps &
  StoreHocProps &
  ActiveChatHocProps &
  ChatsHocProps & {
    onModalOpen?: () => void;
    modalIsOpened?: boolean;
    createChatForm: {
      onCreateChat: (event: MouseEvent) => void;
      onInputChatName: (event: InputEvent) => void;
    };
  };

export class ChatListComponent extends Block<ChatListComponentProps> {
  static override componentName = 'ChatListComponent';

  get isValid(): boolean {
    return !validateForm([
      {
        type: ValidateRuleType.Message,
        value: this.createChatFormValue.title,
      },
    ]);
  }

  createChatFormValue: CreateChatPayload = {
    title: '',
  };

  constructor(props: ChatListComponentProps) {
    super(props);

    this.setProps({
      onModalOpen: this.onModalOpen.bind(this),
      createChatForm: {
        onCreateChat: this.onCreateChat.bind(this),
        onInputChatName: this.onInputChatName.bind(this),
      },
    });
  }

  onCreateChat(event: MouseEvent): void {
    event?.preventDefault();

    if (!this.isValid) {
      return;
    }
    this.props.store.dispatch(ChatsService.createChats, this.createChatFormValue);
    this.onModalClose();
  }

  onInputChatName(event: InputEvent): void {
    const target = event.target as HTMLInputElement;
    this.createChatFormValue.title = target.value;
  }

  onModalOpen() {
    this.setProps({ modalIsOpened: true });
  }

  onModalClose() {
    this.setProps({ modalIsOpened: false });
  }

  protected override render(): string {
    const activeChatId = this.props.activeChat?.id ?? null;

    // language=hbs
    return `
        <div class="chat-list">

            <div class='chat-list__header'>
                <div class='chat-list__profile-link'>

                    {{{ButtonComponent type='button'
                                       className='button_link'
                                       title='Добавить чат'
                                       onClick=onModalOpen}}}

                    {{{LinkComponent title='Профиль'
                                     to=links.Profile}}}
                </div>

                <div class='chat-list__search'>
                    <form action='#'>
                        <input name='chat_search' type='text' placeholder='Поиск'>
                    </form>
                </div>
            </div>

            <nav class='chat-list__list'>
                {{#each chats}}
                    {{{ChatItemComponent activeChatId=${activeChatId} chat=this}}}
                {{/each}}

                {{{InputErrorComponent error=chatsError}}}
            </nav>


            {{#ModalComponent isOpened=modalIsOpened }}
                <form action='#' class='form'>
                    {{{InputComponent
                            label='Название чата'
                            className='form__input'
                            id='chatNameInput'
                            type='text'
                            name='title'
                            placeholder=''
                            onInput=createChatForm.onInputChatName
                            validate=validateRuleType.Message
                    }}}

                    {{{ButtonComponent type='submit'
                                       title='Добавить чат'
                                       onClick=createChatForm.onCreateChat}}}
                </form>
            {{/ModalComponent}}
        </div>
    `;
  }
}

export default activeChatHoc(chatsHoc(routerHoc(storeHoc(ChatListComponent))));
