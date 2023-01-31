import { AppState } from './type.store';

export const defaultStore: AppState = {
  appIsInited: false,
  isLoading: false,
  screen: null,

  // User
  user: null,

  // Chats
  chats: null,
  activeChat: null,
  searchUsers: null,

  chatUsers: {},

  messages: {},

  // Errors
  loginFormError: null,
  registrationFormError: null,
  profileFormError: null,
  passwordFormError: null,
  avatarFormError: null,
  searchUsersFormError: null,
  chatsError: null,
  messagesError: null,
};
