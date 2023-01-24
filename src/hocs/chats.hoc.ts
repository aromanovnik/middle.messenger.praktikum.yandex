import { BlockClass } from 'core';
import store, { AppState } from 'store';
import { ChatModel } from 'models';

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
      if (
        JSON.stringify(prevState.chats) !== JSON.stringify(nextState.chats) ||
        prevState.chatsError !== nextState.chatsError
      ) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, ...chatsProps });
      }
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      store.on('changed', this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      store.off('changed', this.__onChangeUserCallback);
    }
  } as BlockClass<Omit<P, 'chats'>>;
}
