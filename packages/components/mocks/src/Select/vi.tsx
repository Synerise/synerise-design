import React, { type ReactNode } from 'react';

import type { SelectProps } from '@synerise/ds-select';

export type MockSelectProps = SelectProps & {
  'data-testid'?: string;
};

/**
 * Factory function for Select mock.
 * Use directly with vi.mock() to avoid hoisting issues.
 *
 * @example
 * ```typescript
 * import { selectMockFactory } from '@synerise/ds-mocks/Select/vi';
 *
 * vi.mock('@synerise/ds-select', selectMockFactory);
 * ```
 */
export const selectMockFactory = () => ({
  default: vi.fn(
    ({
      value,
      defaultValue,
      onChange,
      onSelect,
      placeholder,
      disabled,
      error,
      options,
      children,
      className,
      'data-testid': dataTestId,
    }: MockSelectProps) => (
      <select
        className={`ds-select ${className || ''}`}
        data-testid={dataTestId || 'ds-select'}
        data-error={error}
        value={value as string}
        defaultValue={defaultValue as string}
        onChange={(e) => {
          onChange?.(e.target.value, {
            value: e.target.value,
            label: e.target.value,
          });
          onSelect?.(e.target.value, {
            value: e.target.value,
            label: e.target.value,
          });
        }}
        disabled={disabled}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (opt: any, idx: number) => (
            <option key={idx} value={String(opt.value)}>
              {opt.label}
            </option>
          ),
        )}
        {children}
      </select>
    ),
  ),
  Option: vi.fn(
    ({ value, children }: { value: unknown; children: ReactNode }) => (
      <option value={String(value)}>{children}</option>
    ),
  ),
});

/**
 * Factory function for minimal Select mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-select', selectMinimalMockFactory);
 * ```
 */
export const selectMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  Option: vi.fn(() => null),
});
