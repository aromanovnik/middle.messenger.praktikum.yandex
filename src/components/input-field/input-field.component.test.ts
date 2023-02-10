import { fireEvent, getByRole } from '@testing-library/dom';
import { renderBlock } from '../../tests/render-utils';
import { InputFieldComponent, InputFieldComponentProps } from './input-field.component';

const renderInput = async ({ onInput }: any) => {
  await renderBlock<InputFieldComponentProps>({
    Block: InputFieldComponent,
    props: { name: '123', onInput },
  });

  return getByRole(document.body, 'input');
};

describe('components/Input', () => {
  // ЮНИТ-тест на UI компонент
  // могут называть интеграционным тестом
  it('should render input', async () => {
    const input = await renderInput({
      onInput: () => {},
    });
    expect(input).toBeInTheDocument();
  });

  // ЮНИТ-тест на UI компонент с событием Input
  it('should call onInput when user types', async () => {
    // 1 Arrange
    const mockInput = jest.fn();

    const input = await renderInput({ onInput: mockInput });

    // 2 Act
    fireEvent.input(input, {
      target: { value: 'a' },
    });

    // 3 Assert
    expect(mockInput).toBeCalled();
  });
});
