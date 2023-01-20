import { SignInRequest, SignUpRequest, AuthApi } from 'api';
import { AppState } from 'store';
import { apiHasError } from 'utils';
import { Dispatch } from 'core';
import { UserModel } from 'models';
import router, { ScreensPath } from 'router';

export type SignInPayload = SignInRequest;
export type SignUpPayload = SignUpRequest;

export class AuthService {
  static async signIn(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SignInPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    const response = await AuthApi.signIn(action);
    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    const user = await AuthApi.user();
    dispatch({ isLoading: false, loginFormError: null });

    if (apiHasError(user)) {
      dispatch(AuthService.logout);
      return;
    }

    dispatch({ user: new UserModel(user) });

    router.go(ScreensPath.Messenger);
  }

  static async logout(dispatch: Dispatch<AppState>): Promise<void> {
    dispatch({ isLoading: true });

    await AuthApi.logout();

    dispatch({ isLoading: false, user: null });

    router.go(ScreensPath.Login);
  }

  static async signUp(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SignUpPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    const response = await AuthApi.signIn(action);
    if (apiHasError(response)) {
      dispatch({ isLoading: false, registrationFormError: response.reason });
      return;
    }

    const user = await AuthApi.user();
    dispatch({ isLoading: false, registrationFormError: null });

    if (apiHasError(user)) {
      dispatch(AuthService.logout);
      return;
    }

    dispatch({ user: new UserModel(user) });

    router.go(ScreensPath.Messenger);
  }
}
