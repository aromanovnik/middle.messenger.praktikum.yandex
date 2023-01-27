import { ChangePasswordRequest, FindUserRequest, UserApi, UserRequest } from 'api';
import { Dispatch } from 'core';
import { AppState } from 'store';
import { apiHasError } from 'helpers';
import { UserModel } from 'models';

export type EditUserPayload = UserRequest;
export type ChangePasswordPayload = ChangePasswordRequest;
export type ChangeAvatarPayload = FormData;
export type SearchUserPayload = FindUserRequest;

export class UserService {
  static async editUser(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: EditUserPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await UserApi.profile(action);
    } catch (error) {
      dispatch({ isLoading: false, profileFormError: error as string });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, profileFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false, loginFormError: null, user: new UserModel(response) });
  }

  static async changePassword(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChangePasswordPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await UserApi.password(action);
    } catch (error) {
      dispatch({ isLoading: false, passwordFormError: error as string });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, passwordFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false, passwordFormError: null });
  }

  static async changeAvatar(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: ChangeAvatarPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await UserApi.profileAvatar(action);
    } catch (error) {
      dispatch({ isLoading: false, avatarFormError: error as string });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, avatarFormError: response.reason });
      return;
    }

    dispatch({ isLoading: false, avatarFormError: null, user: new UserModel(response) });
  }

  static async searchUser(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SearchUserPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await UserApi.search(action);
    } catch (error) {
      dispatch({ isLoading: false, searchUsersFormError: error as string });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, searchUsersFormError: response.reason });
      return;
    }

    dispatch({
      isLoading: false,
      searchUsersFormError: null,
      searchUsers: response.map((user) => new UserModel(user)),
    });
  }
}
