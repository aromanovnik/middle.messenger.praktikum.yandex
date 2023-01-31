import { SignInRequest, SignUpRequest, AuthApi } from 'api';
import { AppState } from 'store';
import { apiHasError } from 'helpers';
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

    let response;
    try {
      response = await AuthApi.signIn(action);
    } catch (error) {
      dispatch({ isLoading: false, loginFormError: error as string });
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, loginFormError: response.reason });
      return;
    }

    let user;
    try {
      user = await AuthApi.user();
    } catch (error) {
      dispatch({ isLoading: false, loginFormError: error as string });
      return;
    }

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

    try {
      await AuthApi.logout();
    } catch {
      dispatch({ isLoading: true });
      return;
    }

    dispatch({ isLoading: false, user: null });

    router.go(ScreensPath.Login);
  }

  static async signUp(
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SignUpPayload,
  ): Promise<void> {
    dispatch({ isLoading: true });

    let response;
    try {
      response = await AuthApi.signUp(action);
    } catch (error) {
      dispatch({ isLoading: false, registrationFormError: error as string });
      return;
    }

    if (apiHasError(response)) {
      dispatch({ isLoading: false, registrationFormError: response.reason });
      return;
    }

    let user;
    try {
      user = await AuthApi.user();
    } catch (error) {
      dispatch({ isLoading: false, loginFormError: error as string });
      return;
    }
    dispatch({ isLoading: false, registrationFormError: null });

    if (apiHasError(user)) {
      dispatch(AuthService.logout);
      return;
    }

    dispatch({ user: new UserModel(user) });

    router.go(ScreensPath.Messenger);
  }
}
