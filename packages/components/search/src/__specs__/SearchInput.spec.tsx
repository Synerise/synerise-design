import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput } from '../Elements';

describe('SearchInput component', () => {
  const PLACEHOLDER = 'placeholder';
  const INPUT_VALUE = 'input value';

  it('should render', () => {
    const onChange = vi.fn();
    const onClear = vi.fn();
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const onToggle = vi.fn();

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
    const onChange = vi.fn();
    const onClear = vi.fn();
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const onToggle = vi.fn();

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
    const onChange = vi.fn();
    const onClear = vi.fn();
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const onToggle = vi.fn();

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
    const onChange = vi.fn();
    const onClear = vi.fn();
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const onToggle = vi.fn();

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
    const onChange = vi.fn();
    const onClear = vi.fn();
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const onToggle = vi.fn();

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
    const onChange = vi.fn();
    const onClear = vi.fn();
    const onKeyDown = vi.fn();
    const onClick = vi.fn();
    const onToggle = vi.fn();

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

  it('should defer collapse until mouseup so adjacent click targets stay stable', () => {
    const onToggle = vi.fn();

    renderWithProvider(
      <div>
        <button>outside</button>
        <SearchInput
          clearTooltip={'clear'}
          placeholder={PLACEHOLDER}
          value=""
          onChange={vi.fn()}
          onClear={vi.fn()}
          onKeyDown={vi.fn()}
          onClick={vi.fn()}
          onToggle={onToggle}
          closeOnClickOutside
        />
      </div>,
    );

    userEvent.click(screen.getByTestId('btn') as HTMLElement);
    onToggle.mockClear();

    const outside = screen.getByText('outside');
    fireEvent.mouseDown(outside);
    expect(onToggle).not.toHaveBeenCalled();

    fireEvent.mouseUp(outside);
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
