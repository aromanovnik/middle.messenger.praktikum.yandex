import { AppState } from './type.store';

export const defaultStore: AppState = {
  appIsInited: false,
  isLoading: false,
  screen: null,

  // User
  user: null,

  // Chats
  chats: null,
  token: null,
  activeChat: null,
  chatUsers: null,
  searchUsers: null,

  // Errors
  loginFormError: null,
  registrationFormError: null,
  profileFormError: null,
  passwordFormError: null,
  avatarFormError: null,
  searchUsersFormError: null,
  chatsError: null,
};
