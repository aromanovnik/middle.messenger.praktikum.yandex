import Block from './block';

describe('core/Block', () => {
  // ЮНИТ-ТЕСТ на модуль
  test('should set props', () => {
    const block = new Block({});

    block.setProps({ test: 123 });

    expect(block.props).toStrictEqual({ test: 123 });
  });
  //
  // // ЮНИТ-ТЕСТ на тестирования события
  // it('should emit event after store was update', () => {
  //   // 1 Arrange
  //   const store = new Store({ userId: -1 });
  //   const mock = jest.fn();
  //   store.on('changed', mock);
  //
  //   // 2 Act
  //   store.set({ userId: 123 });
  //
  //   // 3 Assert
  //   expect(mock).toHaveBeenCalled();
  //   expect(mock).toHaveBeenCalledTimes(1);
  //   expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 });
  // });
  //
  // // ЮНИТ-ТЕСТ на тестирования вызова функции
  // it('should call callback with store and dispatch when it is function', () => {
  //   const store = new Store({ userId: -1 });
  //   const mock = jest.fn();
  //
  //   store.dispatch(mock, 'PAYLOAD_PARAMS');
  //
  //   expect(mock).toHaveBeenCalled();
  //   expect(mock).toHaveBeenCalledTimes(1);
  //   expect(mock).toHaveBeenCalledWith(expect.anything(), store.getState(), 'PAYLOAD_PARAMS');
  // });
});
