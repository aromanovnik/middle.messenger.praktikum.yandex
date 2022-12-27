import Block from 'core/block';

export interface RouterItem {
  to: string;
  page: Block;
}

export default class Router {
  private _pages: RouterItem[] = [];

  constructor(routers: RouterItem[]) {
    this._pages = routers;
    console.log('routers -> ', this._pages);
  }

  public getPage(to: string): RouterItem['page'] {
    return (
      this._pages.find((el) => {
        return el.to === to.replace('#', '');
      })?.page ?? this._pages[this._pages.length - 1].page
    );
  }
}
