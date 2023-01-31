import { BaseActionsStore, BlockClass } from 'core';
import store, { AppState } from 'store';
import { MessageModel } from 'models';

export type MessagesHocProps = {
  messages: MessageModel[];
};

export function messagesHoc<P extends MessagesHocProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      let messages: MessagesHocProps['messages'] = [];
      if (store.getState().activeChat?.id) {
        messages = store.getState().messages[store.getState().activeChat!.id]?.messages ?? [];
      }

      super({
        ...props,
        messages,
      });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      let messages: MessagesHocProps['messages'] = [];
      if (nextState.activeChat?.id) {
        messages = nextState.messages[nextState.activeChat!.id]?.messages ?? [];
      }

      // let prevMessages: MessagesHocProps['messages'] = [];
      // if (prevState.activeChat?.id) {
      //   prevMessages = prevState.messages[prevState.activeChat!.id]?.messages ?? [];
      // }

      const messProps = {
        messages,
      };

      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, ...messProps });

      // if (
      //   prevState.activeChat?.id !== nextState.activeChat?.id ||
      //   JSON.stringify(prevMessages) !== JSON.stringify(messages)
      // ) {
      //   // @ts-expect-error this is not typed
      //   this.setProps({ ...this.props, ...messProps });
      // }
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      store.on(BaseActionsStore.CHANGED, this.__onChangeUserCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      store.off(BaseActionsStore.CHANGED, this.__onChangeUserCallback);
    }
  } as BlockClass<Omit<P, 'messages'>>;
}
