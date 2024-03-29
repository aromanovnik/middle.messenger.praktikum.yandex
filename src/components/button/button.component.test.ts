import { getByRole } from '@testing-library/dom';
import { renderBlock } from '../../tests/render-utils';
import { ButtonComponent, ButtonComponentProps } from './button.component';

const renderButton = async ({ onClick }: any) => {
  await renderBlock<ButtonComponentProps>({
    Block: ButtonComponent,
    props: { title: '123', onClick },
  });

  return getByRole(document.body, 'button');
};

describe('components/Button', () => {
  // ЮНИТ-тест на UI компонент
  // могут называть интеграционным тестом
  it('should render button', async () => {
    const button = await renderButton({
      onClick: () => {},
    });
    expect(button).toBeInTheDocument();
  });

  // ЮНИТ-тест на UI компонент с событием
  it('should call onClick when user press button', async () => {
    // 1 Arrange
    const mock = jest.fn();

    const button = await renderButton({ onClick: mock });

    // 2 Act
    button.click();

    // 3 Assert
    expect(mock).toBeCalled();
  });
});
