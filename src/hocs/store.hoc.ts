import { BlockClass, Store } from 'core';
import store, { AppState } from 'store';
import { isEqual } from 'helpers';

type StoreHocProps = { store: Store<AppState> };

type MapStateToProps<MappedProps> = (state: AppState) => MappedProps;

export function storeHoc<P extends StoreHocProps, MappedProps = any>(
  WrappedBlock: BlockClass<P>,
  mapStateToProps?: MapStateToProps<MappedProps>,
) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store });
    }

    __onChangeStoreCallback = (prevState: AppState, nextState: AppState) => {
      if (isEqual(prevState, nextState)) {
        return;
      }

      // MapStateToProps
      if (typeof mapStateToProps === 'function') {
        const prevPropsFromStore = mapStateToProps(prevState);
        const nextPropsFromStore = mapStateToProps(nextState);

        if (!isEqual(prevPropsFromStore, nextPropsFromStore)) {
          // @ts-expect-error this is not typed
          this.setProps(nextPropsFromStore);
        }
        return;
      }

      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      store.off('changed', this.__onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, 'store'>>;
}
