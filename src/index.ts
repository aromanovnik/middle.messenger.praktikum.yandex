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
  UserInfoComponent,
  UserInfoHeadComponent,
  UserEditComponent,
  UserChangePassComponent,
  SidebarBackComponent,
  RegistrationFormComponent,
  LoginFormComponent,
} from 'components';

registerComponent(ErrorComponent);
registerComponent(ChatItemComponent);
registerComponent(UserAvatarComponent);
registerComponent(ChatBoxComponent);
registerComponent(ChatMessageComponent);
registerComponent(UserInfoComponent);
registerComponent(UserInfoHeadComponent);
registerComponent(UserEditComponent);
registerComponent(UserChangePassComponent);
registerComponent(SidebarBackComponent);
registerComponent(RegistrationFormComponent);
registerComponent(LoginFormComponent);

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
