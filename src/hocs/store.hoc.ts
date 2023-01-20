import { BlockClass, Store } from 'core';
import store, { AppState } from 'store';

type StoreHocProps = { store: Store<AppState> };

export function storeHoc<P extends StoreHocProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, store });

      console.log('store -> ', store);
    }

    __onChangeStoreCallback = () => {
      /**
       * TODO: проверить что стор реально обновлен
       * и прокидывать не целый стор, а необходимые поля
       * с помощью метода mapStateToProps
       */
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
