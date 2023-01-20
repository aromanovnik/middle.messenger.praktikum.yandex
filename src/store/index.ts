import { Store } from 'core';
import { defaultState } from './default.state';
import { AppState } from './type.store';

export default new Store<AppState>(defaultState);
