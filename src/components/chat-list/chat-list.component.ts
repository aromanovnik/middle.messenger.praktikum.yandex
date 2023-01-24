import { Block } from 'core';
import './chat-list.component.css';
import { chatsHoc, ChatsHocProps, routerHoc, RouterHocProps, storeHoc, StoreHocProps } from 'hocs';
import { ChatsService } from 'services';

export type ChatListComponentProps = RouterHocProps &
  StoreHocProps &
  ChatsHocProps & {
    onModalOpen?: () => void;
    modalIsOpened?: boolean;
  };

export class ChatListComponent extends Block<ChatListComponentProps> {
  static override componentName = 'ChatListComponent';

  constructor(props: ChatListComponentProps) {
    super(props);

    this.setProps({
      onModalOpen: this.onModalOpen.bind(this),
    });
  }

  override componentDidMount() {
    this.props.store.dispatch(ChatsService.getChats);
  }

  onModalOpen() {
    console.log('!!!');
    this.setProps({ modalIsOpened: true });
  }

  protected override render(): string {
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
                    {{{ChatItemComponent chat=this}}}
                {{/each}}

                {{{InputErrorComponent error=chatsError}}}
            </nav>


            {{#ModalComponent isOpened=modalIsOpened }}
                Base modal 123
            {{/ModalComponent}}
        </div>
    `;
  }
}

export default chatsHoc(routerHoc(storeHoc(ChatListComponent)));
