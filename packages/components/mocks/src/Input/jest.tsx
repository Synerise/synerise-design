import React, { type ChangeEventHandler } from 'react';

import type { InputProps } from '@synerise/ds-input';

export type MockInputProps = InputProps & {
  'data-testid'?: string;
};

export const mockInput = () => {
  jest.mock('@synerise/ds-input', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        value,
        defaultValue,
        onChange,
        onBlur,
        onFocus,
        placeholder,
        disabled,
        error,
        className,
        'data-testid': dataTestId,
      }: MockInputProps) => (
        <input
          className={`ds-input ${className || ''}`}
          data-testid={dataTestId || 'ds-input'}
          data-error={error}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
        />
      ),
    ),
    TextArea: jest.fn(
      ({
        value,
        onChange,
        placeholder,
        disabled,
        'data-testid': dataTestId,
      }: MockInputProps) => (
        <textarea
          data-testid={dataTestId || 'ds-textarea'}
          value={value}
          onChange={
            onChange as unknown as ChangeEventHandler<HTMLTextAreaElement>
          }
          placeholder={placeholder}
          disabled={disabled}
        />
      ),
    ),
  }));
};

export const mockInputMinimal = () => {
  jest.mock('@synerise/ds-input', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    TextArea: jest.fn(() => null),
  }));
};
