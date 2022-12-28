require('babel-core/register');

import { registerComponent, Router } from 'core';

import './styles/styles.css';

// Pages
import {
  NotFoundPage,
  ServerErrorPage,
  OnboardingPage,
  AuthPage,
  HomePage,
  RegistrationPage,
  UserChangePasswordPage,
  UserDetailsPage,
  UserSettingsPage,
} from 'pages';

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
  InputComponent,
  ButtonComponent,
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
registerComponent(InputComponent);
registerComponent(ButtonComponent);

const router = [
  {
    to: '',
    page: new OnboardingPage(),
  },
  {
    to: 'home',
    page: new HomePage(),
  },
  {
    to: 'auth',
    page: new AuthPage(),
  },
  {
    to: 'registration',
    page: new RegistrationPage(),
  },
  {
    to: 'user-settings',
    page: new UserSettingsPage(),
  },
  {
    to: 'user-details',
    page: new UserDetailsPage(),
  },
  {
    to: 'user-change-password',
    page: new UserChangePasswordPage(),
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
