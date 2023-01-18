require('babel-core/register');

import store from 'store';

import * as components from 'components';
import { registerComponent, Router } from 'core';

// eslint-disable-next-line import/order
import { initRouter } from './router';

import './styles/styles.css';

// Component
Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();

  store.on('changed', (prevState, nextState) => {
    console.log('%cstore updated', 'background: #222; color: #bada55', prevState, nextState);
  });

  initRouter(router, store);
  // store.dispatch(initApp);
});
