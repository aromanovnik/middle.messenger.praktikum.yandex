import { BaseActionsStore, BlockClass } from 'core';
import store, { AppState } from 'store';
import { UserModel } from 'models';

export type UserHocProps = { user: UserModel | null };

export function userHoc<P extends UserHocProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, user: store.getState().user });
    }

    __onChangeUserCallback = (prevState: AppState, nextState: AppState) => {
      if (JSON.stringify(prevState.user) !== JSON.stringify(nextState.user)) {
        // @ts-expect-error this is not typed
        this.setProps({ ...this.props, user: nextState.user });
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
  } as BlockClass<Omit<P, 'user'>>;
}
