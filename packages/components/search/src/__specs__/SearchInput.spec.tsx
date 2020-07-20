import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import { SearchInput } from '../Elements';

describe('SearchInput component', () => {
  const PLACEHOLDER = 'placeholder';
  const INPUT_VALUE = 'input value';

  it('should render', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

    // ARRANGE
    renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />
    );

    // ASSERT
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should set value', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

    // ARRANGE
    renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />
    );

    // ACT
    userEvent.click(screen.getByTestId('btn') as HTMLElement);

    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    // ACT
    userEvent.type(input, INPUT_VALUE);

    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(11);
    expect(screen.getByRole('textbox').getAttribute('value')).toBe(INPUT_VALUE);
  });

  it('should have onToggle callback', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

    // ARRANGE
    renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />
    );

    // ASSERT
    const btn = screen.getByTestId('btn') as HTMLElement;

    // ACT
    userEvent.click(btn);

    // ASSERT
    expect(onToggle).toBeCalledWith(false);

    // ACT
    userEvent.click(btn);

    // ASSERT
    expect(onToggle).toBeCalledWith(true);
  });

  it('should have onClick callback', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

    // ARRANGE
    renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />
    );

    // ACT
    userEvent.click(screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement);

    // ASSERT
    expect(onClick).toBeCalled();
  });

  it('should have onClear callback', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

    // ARRANGE
    renderWithProvider(
      <SearchInput
        clearTooltip={'clear'}
        placeholder={PLACEHOLDER}
        value={INPUT_VALUE}
        onChange={onChange}
        onClear={onClear}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onToggle={onToggle}
      />
    );

    // ACT
    userEvent.click(screen.getByTestId('btn') as HTMLInputElement);
    userEvent.type(screen.getByPlaceholderText(PLACEHOLDER) as HTMLDivElement, INPUT_VALUE);
    userEvent.click(screen.getByTestId('clear'));

    expect(onClear).toBeCalledTimes(1);
  });

  it('should close when clicked outside', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

    // ARRANGE
    renderWithProvider(
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
          closeOnClickOutside
        />
      </div>
    );

    // ACT
    userEvent.click(screen.getByTestId('btn') as HTMLInputElement);
    userEvent.click(screen.getByText('outside'));

    expect(onToggle).toBeCalledWith(false);
  });
});
