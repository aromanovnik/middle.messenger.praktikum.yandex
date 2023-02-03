import { Router, BlockClass } from 'core';
import router from 'router';

export type RouterHocProps = {
  router: Router;
  links: Record<string, string>;
};

export function routerHoc<P extends RouterHocProps>(WrappedBlock: BlockClass<P>) {
  //
  // const links: RouterHocProps['links'] = ScreensPath;
  // todo: Ошибка Cannot access 'fs' before initialization, буду изучать
  const links: RouterHocProps['links'] = {
    Messenger: '/messenger',
    MessengerDetail: '/messenger/:id-chat',
    Onboarding: '/onboadring',
    Login: '/',
    Registration: '/sign-up',
    Settings: '/settings',
    SettingsPass: '/settings-pass',
    Profile: '/profile',
    NotFound: '/not-found',
    ServerError: '/server-error',
  };

  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router, links });
    }
  } as BlockClass<Omit<P, 'router' | 'links'>>;
}
