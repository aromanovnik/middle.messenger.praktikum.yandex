import { Dispatch } from 'core';
import { AppState } from 'store';
import { AuthApi } from 'api';
import { apiHasError } from 'utils';
import { UserModel } from 'models';

export async function initAppService(dispatch: Dispatch<AppState>) {
  try {
    const res = await AuthApi.user();
    if (apiHasError(res)) {
      return;
    }

    dispatch({ user: new UserModel(res) });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch({ appIsInited: true });
  }
}
