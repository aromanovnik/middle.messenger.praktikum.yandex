import { BlockClass, renderDOM, Router, Store } from 'core';
import {
  AuthPage,
  MessengerPage,
  NotFoundPage,
  OnboardingPage,
  RegistrationPage,
  ServerErrorPage,
  UserChangePasswordPage,
  UserDetailsPage,
  UserSettingsPage,
} from './pages';

export enum Screens {
  Messenger = 'messenger',
  Onboarding = 'onboadring',
  Login = 'login',
  Registration = 'registration',
  Settings = 'settings',
  SettingsPass = 'settings-pass',
  Profile = 'profile',
  NotFound = 'not-found',
  ServerError = 'server-error',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.Onboarding]: OnboardingPage,

  [Screens.Login]: AuthPage,
  [Screens.Registration]: RegistrationPage,

  [Screens.Profile]: UserDetailsPage,
  [Screens.Settings]: UserSettingsPage,
  [Screens.SettingsPass]: UserChangePasswordPage,

  [Screens.Messenger]: MessengerPage,

  [Screens.NotFound]: NotFoundPage,
  [Screens.ServerError]: ServerErrorPage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
  return map[screen];
};

const routes = [
  {
    path: '/onboarding',
    block: Screens.Onboarding,
    shouldAuthorized: false,
  },
  {
    path: '/',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/sign-up',
    block: Screens.Registration,
    shouldAuthorized: false,
  },
  {
    path: '/profile',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '/settings',
    block: Screens.Settings,
    shouldAuthorized: true,
  },
  {
    path: '/settings-pass',
    block: Screens.SettingsPass,
    shouldAuthorized: true,
  },
  {
    path: '/messenger',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '/messenger/:id-chat',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '/not-found',
    block: Screens.NotFound,
    shouldAuthorized: false,
  },
  {
    path: '/server-error',
    block: Screens.ServerError,
    shouldAuthorized: false,
  },
  {
    path: '*',
    block: Screens.Onboarding,
    shouldAuthorized: false,
  },
];

export function initRouter(router: Router, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.Login });
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */
  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.componentName}`;
    }
  });
}
