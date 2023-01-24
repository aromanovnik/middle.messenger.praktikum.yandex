import { Screens } from 'router/router';
import { ChatModel, UserModel } from 'models';

export type AppState = {
  appIsInited: boolean;
  screen: Screens | null;
  isLoading: boolean;

  // User
  user: UserModel | null;

  // Chats
  chats: ChatModel[] | null;
  token: string | null;

  // Errors
  loginFormError: string | null;
  registrationFormError: string | null;
  profileFormError: string | null;
  passwordFormError: string | null;
  avatarFormError: string | null;

  chatsError: string | null;
};
