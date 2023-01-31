import { BaseActionsStore, BlockClass, renderDOM, Router, Store } from 'core';
import { AppState } from 'store';
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
} from '../pages';

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

export enum ScreensPath {
  Messenger = '/messenger',
  MessengerDetail = '/messenger/:id-chat',
  Onboarding = '/onboadring',
  Login = '/',
  Registration = '/sign-up',
  Settings = '/settings',
  SettingsPass = '/settings-pass',
  Profile = '/profile',
  NotFound = '/not-found',
  ServerError = '/server-error',
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
    path: ScreensPath.Onboarding,
    block: Screens.Onboarding,
    shouldAuthorized: false,
  },
  {
    path: ScreensPath.Login,
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: ScreensPath.Registration,
    block: Screens.Registration,
    shouldAuthorized: false,
  },
  {
    path: ScreensPath.Profile,
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: ScreensPath.Settings,
    block: Screens.Settings,
    shouldAuthorized: true,
  },
  {
    path: ScreensPath.SettingsPass,
    block: Screens.SettingsPass,
    shouldAuthorized: true,
  },
  {
    path: ScreensPath.Messenger,
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: ScreensPath.MessengerDetail,
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: ScreensPath.NotFound,
    block: Screens.NotFound,
    shouldAuthorized: false,
  },
  {
    path: ScreensPath.ServerError,
    block: Screens.ServerError,
    shouldAuthorized: false,
  },
  {
    path: '*',
    block: Screens.NotFound,
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
        router.go(ScreensPath.Login);
      }
    });
  });

  store.on(BaseActionsStore.CHANGED, (prevState, nextState) => {
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
