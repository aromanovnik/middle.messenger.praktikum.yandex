import { Router, BlockClass } from 'core';
import router, { ScreensPath } from 'router';

export type RouterHocProps = {
  router: Router;
  links?: typeof ScreensPath;
};

export function routerHoc<P extends RouterHocProps>(WrappedBlock: BlockClass<P>) {
  let links: RouterHocProps['links'];
  if (typeof ScreensPath !== 'undefined') {
    links = ScreensPath;
  }

  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router, links });
    }
  } as BlockClass<Omit<P, 'router' | 'links'>>;
}
