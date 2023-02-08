import { Store } from 'core';
import { defaultStore } from './default.store';
import { AppState } from './type.store';

export { defaultStore } from './default.store';
export { AppState } from './type.store';
export default new Store<AppState>(defaultStore);
