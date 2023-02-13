import { Block } from 'core';

export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');

  if (!root) {
    throw new Error('Error: #app not found');
  }

  root.innerHTML = '';
  root.append(block.getContent());
}
