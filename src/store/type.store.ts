import { Screens } from 'router';
import { ChatModel, MessagesModel, UserModel } from 'models';

export type AppState = {
  appIsInited: boolean;
  screen: Screens | null;
  isLoading: boolean;

  // User
  user: UserModel | null;

  // Chats
  chats: ChatModel[] | null;
  activeChat: ChatModel | null;
  // chatUsers: UserModel[] | null;
  searchUsers: UserModel[] | null;

  chatUsers: Record<ChatModel['id'], UserModel[]>;

  messages: Record<ChatModel['id'], MessagesModel>;

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
