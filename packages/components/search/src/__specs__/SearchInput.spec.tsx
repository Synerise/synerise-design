import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { SearchInput } from '../Elements';
import { fireEvent } from '@testing-library/dom';
import * as React from 'react';

describe('SearchInput component', () => {
  const PLACEHOLDER = 'placeholder';
  const INPUT_VALUE = 'input value';
  const onChange = jest.fn();
  const onClear = jest.fn();
  const onKeyDown = jest.fn();
  const onClick = jest.fn();
  const onToggle = jest.fn();

  it('should render', () => {
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />);
    // ASSERT
    expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });
  it('should set value', () => {
    // ARRANGE
    const { getByPlaceholderText,getByTestId } = renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />);
    // ASSERT
    const btn = getByTestId('btn') as HTMLElement;
    // ACT
    btn.click();
    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    // ACT
    fireEvent.change(input, { target: { value: INPUT_VALUE } });
    // ASSERT
    expect(onChange).toBeCalled()
  });
  it('should have onToggle callback', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />);
    // ASSERT
    const btn = getByTestId('btn') as HTMLElement;
    // ACT
    btn.click();
    // ASSERT
    expect(onToggle).toBeCalledWith(true);
    // ACT
    btn.click();
    // ASSERT
    expect(onToggle).toBeCalledWith(false);
  });
  it('should have onClick callback', () => {
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />);
    // ASSERT
    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    // ACT
    input.click();
    // ASSERT
    expect(onClick).toBeCalled();
  });

  it('should have onClear callback', () => {
    // ARRANGE
    const { getByPlaceholderText,getByTestId } = renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />);
    const btn = getByTestId('btn') as HTMLInputElement;
    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    // ACT
    btn.click();
    fireEvent.change(input, { target: { value: INPUT_VALUE } });
    const clearButton = getByTestId('clear');
    clearButton.click();
    expect(onClear).toBeCalled();
  });
  it('should close when clicked outside', () => {
    // ARRANGE
    const { getByTestId,getByText } = renderWithProvider(
      <div>
        <button>outside</button>
        <SearchInput
          clearTooltip={'clear'}
          placeholder={PLACEHOLDER}
          value={INPUT_VALUE}
          onChange={onChange}
          onClear={onClear}
          onKeyDown={onKeyDown}
          onClick={onClick}
          onToggle={onToggle}
          closeOnClickOutside={true}
        />
      </div>);
    const btn = getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();
    const outside = getByText('outside');
    outside.click();
    expect(onToggle).toBeCalledWith(false);
  });
});