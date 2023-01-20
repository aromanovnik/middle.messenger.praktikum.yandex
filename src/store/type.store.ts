import { Screens } from 'router/router';
import { UserModel } from 'models';

export type AppState = {
  appIsInited: boolean;
  screen: Screens | null;
  isLoading: boolean;
  loginFormError: string | null;
  user: UserModel | null;
};
