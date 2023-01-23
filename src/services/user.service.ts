import { AuthApi, ChangePasswordRequest, UserApi, UserRequest } from 'api';
import { Dispatch } from 'core';
import { AppState } from 'store';
import { apiHasError } from 'helpers';
import { UserModel } from 'models';

export type EditUserPayload = UserRequest;
export type ChangePasswordPayload = ChangePasswordRequest;
export type ChangeAvatartPayload = FormData;

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
    action: ChangeAvatartPayload,
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
}

export default new UserService();
