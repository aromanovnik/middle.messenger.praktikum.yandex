import { Router } from './router';

describe('core/Router', () => {
  test('should navigate to test', () => {
    const router = new Router();
    const path = 'test';
    const mock = jest.fn();

    router.use(path, mock);
    router.go(path);

    expect(mock).toHaveBeenCalled();
  });
});
