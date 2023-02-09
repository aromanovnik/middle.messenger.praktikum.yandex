import { BlockClass, renderDOM, registerComponent, Store } from 'core';
import { AppState, defaultStore } from 'store';
import * as components from 'components';
import { sleep } from 'helpers';
import router, { initRouter } from 'router';

type RenderBlockParams<T> = {
  Block: BlockClass<T>;
  props: T;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends Object>({
  Block,
  props,
  state = defaultStore,
}: RenderBlockParams<T>) {
  Object.values(components).forEach((Component: any) => {
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultStore, ...state });

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block(props as T));

  initRouter(router, store);

  /**
   * Ждем вызова componentDidMount,
   * медота жизненного цикла компонента,
   * который вызывается через 100мс в Block.getContent
   */
  await sleep();
}

export async function step(name: string, callback: () => void) {
  console.log(`Step: ${name}`);
  await callback();
}
