import { Router, BlockClass } from 'core';
import router from 'router';

type RouterHocProps = { router: Router };

export function routerHoc<P extends RouterHocProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router });
    }
  } as BlockClass<Omit<P, 'router'>>;
}
