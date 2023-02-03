import { BaseActionsStore, BlockClass } from 'core';
import store, { AppState } from 'store';
import { MessagesModel } from 'models';

export type MessagesHocProps = {
  messages?: MessagesModel;
};

export function messagesHoc<P extends MessagesHocProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      let messages: MessagesHocProps['messages'];
      if (store.getState().activeChat?.id) {
        messages = store.getState().messages[store.getState().activeChat!.id];
      }

      super({
        ...props,
        messages,
      });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      let messages: MessagesHocProps['messages'];
      if (nextState.activeChat?.id) {
        messages = nextState.messages[nextState.activeChat!.id];
      }

      const messProps = {
        messages,
      };

      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, ...messProps });
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
