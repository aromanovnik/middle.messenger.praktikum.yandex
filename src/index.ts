require('babel-core/register');

import { renderDOM, registerComponent } from 'core';

import { NotFoundPage } from 'pages/not-found';

import './styles/styles.css';

import { ErrorComponent } from 'components/error';

registerComponent(ErrorComponent);

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
