require('babel-core/register');

import { registerComponent, Router } from 'core';

import './styles/styles.css';

// Pages
import { NotFoundPage, ServerErrorPage, OnboardingPage } from 'pages';

// Component
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
  ChatListComponent,
  ChatDetailsComponent,
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
registerComponent(ChatListComponent);
registerComponent(ChatDetailsComponent);

const router = [
  {
    to: '',
    page: new OnboardingPage(),
  },
  {
    to: 'home/',
    page: new NotFoundPage(),
  },
  {
    to: 'auth',
    page: new NotFoundPage(),
  },
  {
    to: 'registration',
    page: new NotFoundPage(),
  },
  {
    to: 'user-settings',
    page: new NotFoundPage(),
  },
  {
    to: 'user-details',
    page: new NotFoundPage(),
  },
  {
    to: 'user-change-password',
    page: new NotFoundPage(),
  },
  {
    to: 'server-error',
    page: new ServerErrorPage(),
  },
  {
    to: '*',
    page: new NotFoundPage(),
  },
];

document.addEventListener('DOMContentLoaded', () => new Router(router));
