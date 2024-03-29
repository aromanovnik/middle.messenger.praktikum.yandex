// require('babel-core/register');

import 'regenerator-runtime/runtime';

import { initAppService } from 'services';

import * as components from 'components';
import { registerComponent, BlockConstructable, BaseActionsStore } from 'core';

import router, { initRouter } from 'router';
import store from 'store';

import './styles/styles.css';

// Component
Object.values(components).forEach((Component: BlockConstructable<any>) => {
  registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
  store.on(BaseActionsStore.CHANGED, (prevState, nextState) => {
    console.log('%cstore updated', 'background: #222; color: #bada55', prevState, nextState);
  });

  initRouter(router, store);
  store.dispatch(initAppService);
});
