import React, { type ReactNode } from 'react';

import type { SelectProps } from '@synerise/ds-select';

export type MockSelectProps = SelectProps & {
  'data-testid'?: string;
};

export const mockSelect = () => {
  jest.mock('@synerise/ds-select', () => ({
    __esModule: true,
    default: jest.fn(
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
    Option: jest.fn(
      ({ value, children }: { value: unknown; children: ReactNode }) => (
        <option value={String(value)}>{children}</option>
      ),
    ),
  }));
};

export const mockSelectMinimal = () => {
  jest.mock('@synerise/ds-select', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    Option: jest.fn(() => null),
  }));
};
