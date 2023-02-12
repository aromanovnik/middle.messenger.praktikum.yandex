import { Router } from './router';

describe('core/Router', () => {
  test('should navigate to test', () => {
    const router = new Router();
    const path = 'test';
    const mock = jest.fn();

    router.use(path, mock);
    router.go(path);

    expect(mock).toHaveBeenCalled();

    expect(window.location.pathname).toEqual(`/${path}`);
  });

  it('should show the route if the route is not found', () => {
    const router = new Router();

    const mock = jest.fn();
    router.use('*', mock);

    router.go('/');

    expect(mock).toHaveBeenCalled();
  });

  it('should back in history', () => {
    const router = new Router();

    window.history.pushState({}, '', '/route1');
    window.history.pushState({}, '', '/route2');

    router.back();

    window.onpopstate = (_event: PopStateEvent) => {
      expect(window.location.pathname).toBe('/route1');
    };
  });

  it('should forward in history', () => {
    const router = new Router();

    window.history.pushState({}, '', '/route1');
    window.history.pushState({}, '', '/route2');

    router.back();
    router.forward();

    window.onpopstate = (_event: PopStateEvent) => {
      expect(window.location.pathname).toBe('/route2');
    };
  });
});
