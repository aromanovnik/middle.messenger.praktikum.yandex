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
} from 'api';
import { apiHasError } from '../helpers';
import { ChatModel } from '../models';

export type GetChatsPayload = GetChatRequest;
export type CreateChatPayload = CreateChatRequest;
export type DeleteChatPayload = ChatDeleteRequest;
export type TokenPayload = TokenRequest;
export type UserPayload = UsersRequest;

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

  static async requestChatsHandler<Action, Response>(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: Action,
    func: (props: Action) => Promise<Response>,
  ): Promise<void> {
    dispatch({ isLoading: true });

    console.log('! -> ', action, func);

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

    // dispatch({ isLoading: true });
    //
    // let response;
    // try {
    //   response = await ChatsApi.createChats(action);
    // } catch (error) {
    //   dispatch({ isLoading: false, chatsError: error as string });
    //   return;
    // }
    //
    // if (apiHasError(response)) {
    //   dispatch({ isLoading: false, chatsError: response.reason });
    //   return;
    // }
    //
    // dispatch(ChatsService.getChats);
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
    // dispatch({ isLoading: true });
    //
    // let response;
    // try {
    //   response = await ChatsApi.deleteChats(action);
    // } catch (error) {
    //   dispatch({ isLoading: false, chatsError: error as string });
    //   return;
    // }
    //
    // if (apiHasError(response)) {
    //   dispatch({ isLoading: false, chatsError: response.reason });
    //   return;
    // }
    //
    // dispatch(ChatsService.getChats);
  }

  static async token(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: TokenPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await ChatsApi.token(action);
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
      token: response.token,
    });
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
    // dispatch({ isLoading: true });
    //
    // let response;
    // try {
    //   response = await ChatsApi.addUser(action);
    // } catch (error) {
    //   dispatch({ isLoading: false, chatsError: error as string });
    //   return;
    // }
    //
    // if (apiHasError(response)) {
    //   dispatch({ isLoading: false, chatsError: response.reason });
    //   return;
    // }
    //
    // dispatch(ChatsService.getChats);
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
  }
}
