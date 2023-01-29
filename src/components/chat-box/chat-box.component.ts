import { BaseActionsStore, Block } from 'core';

import './chat-box.component.css';
import { chatsHoc, ChatsHocProps, routerHoc, RouterHocProps, storeHoc, StoreHocProps } from 'hocs';
import { ChatsService } from 'services';
import { AppState } from 'store';

export type ChatBoxComponentProps = ChatsHocProps & StoreHocProps & RouterHocProps & {};

export class ChatBoxComponent extends Block<ChatBoxComponentProps> {
  static override componentName = 'ChatBoxComponent';

  chatId: number | null = null;

  onChangeActiveChat = (prevState: AppState, nextState: AppState): void => {
    if (!nextState.chats) {
      return;
    }

    let chatId: number | null = null;
    if (this.props?.router.getParams()['id-chat']) {
      chatId = parseInt(this.props.router.getParams()['id-chat'], 10);
    }

    if (this.chatId === chatId) {
      return;
    }
    this.chatId = chatId;

    const activeChat = nextState.chats?.find((el) => el.id === chatId);
    if (chatId && !activeChat) {
      this.props.router.go(this.props.links!.NotFound);
    }

    if (activeChat?.id !== nextState.activeChat?.id) {
      this.props.store.dispatch(ChatsService.selectChat, {
        id: chatId,
      });
    }
  };

  constructor(props: ChatBoxComponentProps) {
    super(props);
  }

  override componentDidMount(props: ChatBoxComponentProps) {
    super.componentDidMount(props);

    this.props.store.on(BaseActionsStore.CHANGED, this.onChangeActiveChat);
    this.props.store.dispatch(ChatsService.getChats);
  }

  override componentWillUnmount() {
    super.componentWillUnmount();

    this.props.store.off(BaseActionsStore.CHANGED, this.onChangeActiveChat);
  }

  override render(): string {
    console.log('🍊 RENDER!');
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
    })),
  ),
);
