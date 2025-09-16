import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
      />,
    );

    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should set value', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

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
      />,
    );

    userEvent.click(screen.getByTestId('btn') as HTMLElement);

    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    userEvent.type(input, INPUT_VALUE);

    expect(onChange).toHaveBeenCalledTimes(11);
    expect(screen.getByRole('textbox').getAttribute('value')).toBe(INPUT_VALUE);
  });

  it('should have onToggle callback', async () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

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
      />,
    );

    const btn = screen.getByTestId('btn') as HTMLElement;

    userEvent.click(btn);

    await waitFor(() => expect(onToggle).toBeCalledWith(false));

    userEvent.click(btn);

    await waitFor(() => expect(onToggle).toBeCalledWith(true));
  });

  it('should have onClick callback', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

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
      />,
    );

    userEvent.click(
      screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement,
    );

    expect(onClick).toBeCalled();
  });

  it('should have onClear callback', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

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
      />,
    );

    userEvent.click(screen.getByTestId('btn') as HTMLInputElement);
    userEvent.type(
      screen.getByPlaceholderText(PLACEHOLDER) as HTMLDivElement,
      INPUT_VALUE,
    );
    userEvent.click(screen.getByTestId('clear'));

    expect(onClear).toBeCalledTimes(1);
  });

  it('should close when clicked outside', () => {
    const onChange = jest.fn();
    const onClear = jest.fn();
    const onKeyDown = jest.fn();
    const onClick = jest.fn();
    const onToggle = jest.fn();

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
      </div>,
    );

    userEvent.click(screen.getByTestId('btn') as HTMLInputElement);
    userEvent.click(screen.getByText('outside'));

    expect(onToggle).toBeCalledWith(false);
  });
});
