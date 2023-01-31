import { Block } from 'core';

import './chat-box.component.css';
import { chatsHoc, ChatsHocProps, routerHoc, RouterHocProps, storeHoc, StoreHocProps } from 'hocs';
import { ChatsService } from 'services';
import { ChatModel } from 'models';

export type ChatBoxComponentProps = ChatsHocProps & StoreHocProps & RouterHocProps & {};

export class ChatBoxComponent extends Block<ChatBoxComponentProps> {
  static override componentName = 'ChatBoxComponent';

  chatId: number | null = null;

  constructor(props: ChatBoxComponentProps) {
    super(props);
  }

  override componentDidMount(props: ChatBoxComponentProps) {
    super.componentDidMount(props);
    this.props.store.dispatch(ChatsService.getChats);

    // Router
    this.props.router.wasChangeParams = this.selectChat.bind(this);
  }

  override componentWillUnmount() {
    super.componentWillUnmount();

    this.props.router.wasChangeParams = undefined;
  }

  override propertiesWillUpdate() {
    this.selectChat();
  }

  selectChat(): void {
    if (!this.props.chats?.length) {
      return;
    }

    let chatId: number | null = null;
    if (this.props?.router.getParams()['id-chat']) {
      chatId = parseInt(this.props.router.getParams()['id-chat'], 10);
    }

    if (!chatId) {
      this.props.store.dispatch({
        activeChat: null,
      });
    }

    if (this.chatId === chatId) {
      return;
    }
    this.chatId = chatId;

    const activeChat = this.props.chats?.find((el) => el.id === chatId);
    if (chatId && !activeChat) {
      this.props.router.go(this.props.links!.NotFound);
    }

    if (activeChat?.id !== this.props.store.getState().activeChat?.id) {
      this.props.store.dispatch(ChatsService.selectChat, {
        id: chatId,
      });
    }

    if (activeChat) {
      this.loadUser(activeChat);
    }
  }

  loadUser(chat: ChatModel): void {
    // Load chat users
    this.props.store.dispatch(ChatsService.getUsersChats, {
      id: chat.id,
    });
  }

  override render(): string {
    // language=hbs
    return `
        <div class='chat-box'>
            <div class='chat-box__chat-list'>
                {{{ChatListComponent}}}
            </div>

            <div class='chat-box__chat-details'>
                {{{ChatDetailsComponent}}}
            </div>
        </div>`;
  }
}

export default routerHoc(
  chatsHoc(
    storeHoc(ChatBoxComponent, (state) => ({
      chats: state.chats,
      activeChat: state.activeChat,
    })),
  ),
);
