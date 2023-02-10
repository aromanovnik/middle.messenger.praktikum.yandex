import Block from './block';

describe('core/Block', () => {
  // ЮНИТ-ТЕСТ на модуль
  test('should set props', () => {
    const block = new Block({});

    block.setProps({ test: 123 });

    expect(block.props).toStrictEqual({ test: 123 });
  });
});
