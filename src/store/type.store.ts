import { Screens } from 'router/router';
import { ChatModel, MessageModel, UserModel } from 'models';

export type AppState = {
  appIsInited: boolean;
  screen: Screens | null;
  isLoading: boolean;

  // User
  user: UserModel | null;

  // Chats
  chats: ChatModel[] | null;
  activeChat: ChatModel | null;
  chatUsers: UserModel[] | null;
  searchUsers: UserModel[] | null;

  // Messages
  messages: Record<ChatModel['id'], MessageModel[]>;

  // Errors
  loginFormError: string | null;
  registrationFormError: string | null;
  profileFormError: string | null;
  passwordFormError: string | null;
  avatarFormError: string | null;
  searchUsersFormError: string | null;
  chatsError: string | null;
  messagesError: string | null;
};
