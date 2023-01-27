import { BaseActionsStore, BlockClass } from 'core';
import store, { AppState } from 'store';
import { ChatModel } from 'models';

export type ActiveChatHocProps = {
  activeChat: ChatModel | null;
};

export function activeChatHoc<P extends ActiveChatHocProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    token?: string;

    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({
        ...props,
        activeChat: store.getState().activeChat,
      });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      const chatsProps = {
        activeChat: nextState.activeChat,
      };
      if (
        JSON.stringify(prevState.activeChat) !== JSON.stringify(nextState.activeChat) ||
        this.token !== nextState.activeChat?.token
      ) {
        this.token = nextState.activeChat?.token;

        console.log('🍓');

        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, ...chatsProps });
      }
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      store.on(BaseActionsStore.CHANGED, this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      store.off(BaseActionsStore.CHANGED, this.__onChangeUserCallback);
    }
  } as BlockClass<Omit<P, 'chats'>>;
}
