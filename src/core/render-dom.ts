import Block from 'core/block';

export default function renderDom(block: Block) {
  const root = document.querySelector('#app');

  if (!root) {
    throw new Error('Error: #app not found');
  }

  root.innerHTML = '';
  root.append(block.getContent());
}
