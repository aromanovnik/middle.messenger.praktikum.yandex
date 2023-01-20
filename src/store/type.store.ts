import { Screens } from 'router/router';
import { UserModel } from 'models';

export type AppState = {
  appIsInited: boolean;
  screen: Screens | null;
  isLoading: boolean;
  user: UserModel | null;

  // Errors
  loginFormError: string | null;
  registrationFormError: string | null;
  profileFormError: string | null;
  passwordFormError: string | null;
  avatarFormError: string | null;
};
