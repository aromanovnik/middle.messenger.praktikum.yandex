import { Router, BlockClass } from 'core';
import router, { ScreensPath } from 'router';

type RouterHocProps = {
  router: Router;
  links?: Record<string, ScreensPath>;
};

export function routerHoc<P extends RouterHocProps>(WrappedBlock: BlockClass<P>) {
  let links: RouterHocProps['links'] = {};
  if (typeof ScreensPath !== 'undefined') {
    links = {
      messenger: ScreensPath.Messenger,
      messengerDetail: ScreensPath.MessengerDetail,
      login: ScreensPath.Login,
      registration: ScreensPath.Registration,
      settings: ScreensPath.Settings,
      settingsPass: ScreensPath.SettingsPass,
      profile: ScreensPath.Profile,
      notFound: ScreensPath.NotFound,
      serverError: ScreensPath.ServerError,
    };
  }

  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router, links });
    }
  } as BlockClass<Omit<P, 'router' | 'links'>>;
}
