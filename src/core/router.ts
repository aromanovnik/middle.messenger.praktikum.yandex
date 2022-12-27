import Block from 'core/block';
import renderDOM from 'core/render-dom';

export interface RouterItem {
  to: string;
  page: Block;
}

export interface RouterItemActive extends RouterItem {
  path?: string;
  params?: string[];
}

export default class Router {
  public pages: RouterItem[] = [];

  private _page!: RouterItemActive;

  public set page(item: RouterItem) {
    const pathArr = this.hash.split('/');
    this._page = {
      ...item,
      path: pathArr.shift(),
      params: pathArr ?? [],
    };
  }

  public get page(): RouterItemActive {
    return this._page;
  }

  public get hash(): string {
    return window.location.hash;
  }

  public get path(): string {
    return this.hash.split('/')[0];
  }

  private get notFound(): RouterItem {
    const item: RouterItem | undefined = this.pages.find((el) => el.to === '*');
    if (!item) {
      throw new Error('Error: Page "Not found" not found');
    }
    return item;
  }

  constructor(routers: RouterItem[]) {
    this.pages = routers;
    this.navigation();

    window.addEventListener('hashchange', this.navigation.bind(this));
  }

  public navigation() {
    renderDOM(this.getPage(this.path));
  }

  public getPage(to: string): RouterItem['page'] {
    this.page =
      this.pages.find((el) => {
        return el.to === to.replace('#', '');
      }) ?? this.notFound;

    return this.page.page;
  }
}
