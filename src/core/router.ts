import { isEqual } from '../helpers';

type Params = Record<string, string>;

export interface CoreRouter {
  start(): void;

  use(path: string, callback: () => void): CoreRouter;

  go(path: string): void;

  back(): void;

  forward(): void;

  getParams(): Params;

  wasChangeParams?: () => void;
}

export class Router implements CoreRouter {
  private routes: Record<string, Function> = {};

  private isStarted = false;

  private _pathname?: string;

  private _params: Params = {};

  private set params(p: Params) {
    this._params = p;

    // ... call was update
    if (typeof this.wasChangeParams === 'function') {
      this.wasChangeParams();
    }
  }

  private get params(): Params {
    return this._params;
  }

  wasChangeParams: undefined | (() => void) = (): void => {
    console.log('wasChangeParams');
  };

  start() {
    if (!this.isStarted) {
      this.isStarted = true;

      // event: PopStateEvent
      window.onpopstate = () => {
        this.onRouteChange.call(this);
      };

      this.onRouteChange();
    }
  }

  private comparePath(routeHash: string, pathName: string): boolean {
    const rHash = routeHash.split('/');
    const pName = pathName.split('/');

    if (rHash.length !== pName.length) {
      return false;
    }

    return rHash.every((piece, index) => {
      if (piece.startsWith(':')) {
        return true;
      }

      return piece === pName[index];
    });
  }

  private getVariablesFromRoutePath(routeHash: string, pathName: string): Params {
    const params: Params = {};
    const rHash = routeHash.split('/');
    const pName = pathName.split('/');

    rHash.forEach((item, index) => {
      if (!item.startsWith(':')) {
        return;
      }

      const variableName = item.substring(1);
      params[variableName] = pName[index];
    });

    return params;
  }

  private onRouteChange(pathname: string = window.location.pathname) {
    this._pathname = pathname;

    const found = Object.entries(this.routes).some(([routeHash, callback]) => {
      if (this.comparePath(routeHash, pathname)) {
        const params = this.getVariablesFromRoutePath(routeHash, pathname);
        if (!isEqual(params, this.params)) {
          this.params = params;
        }

        callback(this.params);
        return true;
      }
      return false;
    });

    if (!found && this.routes['*']) {
      this.routes['*']();
    }
  }

  use(hash: string, callback: Function) {
    this.routes[hash] = callback;
    return this;
  }

  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this.onRouteChange(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getParams(): Params {
    return this.params;
  }

  getPathname(): string | undefined {
    return this._pathname;
  }
}
