import React, { type ChangeEventHandler } from 'react';

import type { InputProps } from '@synerise/ds-input';

export type MockInputProps = InputProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Input mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { inputMockFactory } from '@synerise/ds-mocks/Input/vi';
 *
 * vi.mock('@synerise/ds-input', inputMockFactory);
 * ```
 */
export const inputMockFactory = () => ({
  default: vi.fn(
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
  TextArea: vi.fn(
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
});

/**
 * Factory function for minimal Input mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-input', inputMinimalMockFactory);
 * ```
 */
export const inputMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  TextArea: vi.fn(() => null),
});
