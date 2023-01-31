import { BaseActionsStore, BlockClass } from 'core';
import store, { AppState } from 'store';
import { ChatModel } from 'models';
import { isEqual } from 'helpers';

export type ChatsHocProps = {
  chats: ChatModel[] | null;
  chatsError?: string | null;
};

export function chatsHoc<P extends ChatsHocProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({
        ...props,
        chats: store.getState().chats,
        chatsError: store.getState().chatsError,
      });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      const chatsProps = {
        chats: nextState.chats,
        chatsError: nextState.chatsError,
      };

      // JSON.stringify(prevState.chats) !== JSON.stringify(nextState.chats)
      const prevChats = prevState.chats ?? [];
      const nextChats = nextState.chats ?? [];
      let isNotEqual = prevChats.length !== nextChats.length;

      if (!isNotEqual) {
        for (let i = 0; i < nextChats.length; i++) {
          if (!isEqual(prevChats, nextChats)) {
            isNotEqual = true;
            break;
          }
        }
      }

      if (isNotEqual || prevState.chatsError !== nextState.chatsError) {
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
