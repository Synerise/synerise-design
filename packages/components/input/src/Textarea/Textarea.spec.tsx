import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import { TextArea } from '../index';

describe('TextArea', () => {
  const PLACEHOLDER = 'placeholder';
  const onChange = jest.fn();
  const INPUT_VALUE = 'input value';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    renderWithProvider(<TextArea placeholder={PLACEHOLDER} value="" />);

    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should trigger onChange', () => {
    renderWithProvider(
      <TextArea
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        placeholder={PLACEHOLDER}
        value=""
      />,
    );

    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;
    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('should show label', () => {
    const LABEL = 'label';
    renderWithProvider(<TextArea label={LABEL} value="" />);

    expect(screen.getByText(LABEL)).toBeTruthy();
  });

  it('should show error', () => {
    const ERROR = 'error';
    renderWithProvider(<TextArea errorText={ERROR} value="" />);

    expect(screen.getByText(ERROR)).toBeTruthy();
  });

  it('should show description', () => {
    const DESCRIPTION = 'description';
    renderWithProvider(<TextArea description={DESCRIPTION} value="" />);

    expect(screen.getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should count characters', () => {
    const COUNTER_LIMIT = 10;
    const { rerender } = renderWithProvider(
      <TextArea
        placeholder={PLACEHOLDER}
        counterLimit={COUNTER_LIMIT}
        value=""
      />,
    );

    expect(screen.getByTestId('counter').textContent).toBe(
      `0/${COUNTER_LIMIT}`,
    );

    rerender(
      <TextArea
        placeholder={PLACEHOLDER}
        counterLimit={COUNTER_LIMIT}
        value="test"
      />,
    );

    expect(screen.getByTestId('counter').textContent).toBe(
      `4/${COUNTER_LIMIT}`,
    );
  });

  it('should not allow to exceed counterLimit', () => {
    const COUNTER_LIMIT = 2;
    const VALID_STRING = 'ab';
    const INVALID_STRING = 'abc';

    renderWithProvider(
      <TextArea
        placeholder={PLACEHOLDER}
        counterLimit={COUNTER_LIMIT}
        value=""
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
      />,
    );
    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    fireEvent.change(input, { target: { value: VALID_STRING } });

    expect(onChange).toHaveBeenCalledWith(VALID_STRING);

    fireEvent.change(input, { target: { value: INVALID_STRING } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should render icons', () => {
    const ICON_PLACEHOLDER_1 = 'Icon placeholder 1';
    const ICON_PLACEHOLDER_2 = 'Icon placeholder 2';
    renderWithProvider(
      <TextArea
        icon1={<div>{ICON_PLACEHOLDER_1}</div>}
        icon2={<div>{ICON_PLACEHOLDER_2}</div>}
        value=""
      />,
    );

    expect(screen.getByText(ICON_PLACEHOLDER_1)).toBeTruthy();
    expect(screen.getByText(ICON_PLACEHOLDER_2)).toBeTruthy();
  });
});
