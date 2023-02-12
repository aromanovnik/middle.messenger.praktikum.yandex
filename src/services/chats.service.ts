import { Dispatch } from 'core';
import { AppState } from 'store';
import {
  ChatDeleteRequest,
  ChatsApi,
  CreateChatRequest,
  GetChatRequest,
  TokenRequest,
  UsersRequest,
  CreateChatsResponseData,
  DeleteChatsResponseData,
  UsersResponseData,
  AddUserRequest,
} from 'api';
import { apiHasError } from 'helpers';
import { ChatModel, MessagesModel, UserModel } from 'models';

export type GetChatsPayload = GetChatRequest;
export type CreateChatPayload = CreateChatRequest;
export type DeleteChatPayload = ChatDeleteRequest;
export type TokenPayload = TokenRequest;
export type UserPayload = UsersRequest;
export type GetUsersPayload = AddUserRequest;

export class ChatsService {
  static async getChats(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: GetChatsPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await ChatsApi.getChats(action);
    } catch (error) {
      dispatch({ isLoading: false, chatsError: error as string });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, chatsError: response.reason });
      return;
    }

    dispatch({
      isLoading: false,
      chatsError: null,
      chats: response.map<ChatModel>((el) => new ChatModel(el)),
    });
  }

  static async getUsersChats(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: GetUsersPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await ChatsApi.getUsers(action);
    } catch (error) {
      dispatch({ isLoading: false, chatsError: error as string });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, chatsError: response.reason });
      return;
    }

    dispatch({
      isLoading: false,
      chatsError: null,
      chatUsers: {
        ...state.chatUsers,
        [action.id]: response.map<UserModel>((el) => new UserModel(el)),
      },
    });
  }

  static async requestChatsHandler<Action, Response>(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: Action,
    func: (props: Action) => Promise<Response>,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await func(action);
    } catch (error) {
      dispatch({ isLoading: false, chatsError: error as string });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, chatsError: response.reason });
      return;
    }

    dispatch(ChatsService.getChats);
  }

  static async createChats(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: CreateChatPayload,
  ): Promise<void> {
    await ChatsService.requestChatsHandler<CreateChatPayload, CreateChatsResponseData>(
      dispatch,
      state,
      action,
      ChatsApi.createChats,
    );
  }

  static async deleteChats(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: DeleteChatPayload,
  ): Promise<void> {
    await ChatsService.requestChatsHandler<DeleteChatPayload, DeleteChatsResponseData>(
      dispatch,
      state,
      action,
      ChatsApi.deleteChats,
    );
  }

  static async getToken(data: TokenPayload): Promise<string | Error> {
    let response;
    try {
      response = await ChatsApi.token(data);
    } catch (error) {
      throw new Error(error as string);
    }

    if (apiHasError(response)) {
      throw new Error(response.reason);
    }
    return response.token;
  }

  static async selectChat(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: TokenPayload,
  ): Promise<void> {
    const chat = state.chats?.find((ch) => ch.id === action.id);

    if (!chat) {
      return;
    }

    if (state.messages[action.id]) {
      dispatch({
        isLoading: false,
        chatsError: null,
        activeChat: chat,
      });
      return;
    }

    try {
      // eslint-disable-next-line no-await-in-loop
      const token = (await ChatsService.getToken({ id: action.id })) as string;
      const messages = new MessagesModel({
        chatId: action.id,
        userId: state.user?.id ?? 0,
        token,
      });

      dispatch({
        isLoading: false,
        chatsError: null,
        activeChat: chat,
        messages: {
          ...state.messages,
          [action.id]: messages,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  static async addUser(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserPayload,
  ): Promise<void> {
    await ChatsService.requestChatsHandler<UserPayload, UsersResponseData>(
      dispatch,
      state,
      action,
      ChatsApi.addUser,
    );

    // Сразу обновим
    await ChatsService.getUsersChats(dispatch, state, {
      id: action.chatId,
    });
  }

  static async removeUser(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserPayload,
  ): Promise<void> {
    await ChatsService.requestChatsHandler<UserPayload, UsersResponseData>(
      dispatch,
      state,
      action,
      ChatsApi.removeUser,
    );

    // Сразу обновим
    await ChatsService.getUsersChats(dispatch, state, {
      id: action.chatId,
    });
  }
}
