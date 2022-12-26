require('babel-core/register');

import { renderDOM, registerComponent } from 'core';

import { NotFoundPage } from 'pages/not-found';

import './styles/styles.css';

import {
  ErrorComponent,
  ChatItemComponent,
  UserAvatarComponent,
  ChatBoxComponent,
  ChatMessageComponent,
} from 'components';

registerComponent(ErrorComponent);
registerComponent(ChatItemComponent);
registerComponent(UserAvatarComponent);
registerComponent(ChatBoxComponent);
registerComponent(ChatMessageComponent);

document.addEventListener('DOMContentLoaded', () => {
  const App = new NotFoundPage();
  // const App = new OnboardingPage({
  //   links: [
  //     {to: '#signup', text: 'signup'},
  //     {to: '#login', text: 'login'},
  //   ]
  // });

  renderDOM(App);
});
