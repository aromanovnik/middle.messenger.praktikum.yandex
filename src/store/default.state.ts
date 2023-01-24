import { AppState } from './type.store';

export const defaultState: AppState = {
  appIsInited: false,
  isLoading: false,
  screen: null,

  // User
  user: null,

  // Chats
  chats: null,
  token: null,

  // Errors
  loginFormError: null,
  registrationFormError: null,
  profileFormError: null,
  passwordFormError: null,
  avatarFormError: null,

  chatsError: null,
};
