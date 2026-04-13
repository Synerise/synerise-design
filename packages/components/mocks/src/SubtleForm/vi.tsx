import React, { type ReactNode } from 'react';

type SubtleFormTextAreaProps = {
  value?: string;
  onChange?: (...args: unknown[]) => void;
  placeholder?: string;
  'data-testid'?: string;
};

type SubtleFormInputProps = {
  value?: string;
  onChange?: (...args: unknown[]) => void;
  placeholder?: string;
  'data-testid'?: string;
};

type SubtleFormSelectProps = {
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  placeholder?: string;
  'data-testid'?: string;
};

type SubtleFormDatePickerProps = {
  value?: unknown;
  onChange?: (...args: unknown[]) => void;
  'data-testid'?: string;
};

type SubtleFormFieldProps = {
  children?: ReactNode;
  label?: ReactNode;
  'data-testid'?: string;
};

/**
 * Factory function for SubtleForm mock.
 * Mocks the entire @synerise/ds-subtle-form package including SubtleForm and its compound sub-components.
 *
 * @example
 * ```typescript
 * import { subtleFormMockFactory } from '@synerise/ds-mocks/SubtleForm/vi';
 *
 * vi.mock('@synerise/ds-subtle-form', subtleFormMockFactory);
 * ```
 */
export const subtleFormMockFactory = () => {
  const TextArea = vi.fn(
    ({ 'data-testid': dataTestId }: SubtleFormTextAreaProps) => (
      <div data-testid={dataTestId || 'ds-subtle-form-textarea'} />
    ),
  );

  const Input = vi.fn(({ 'data-testid': dataTestId }: SubtleFormInputProps) => (
    <div data-testid={dataTestId || 'ds-subtle-form-input'} />
  ));

  const Select = vi.fn(
    ({ 'data-testid': dataTestId }: SubtleFormSelectProps) => (
      <div data-testid={dataTestId || 'ds-subtle-form-select'} />
    ),
  );

  const DatePicker = vi.fn(
    ({ 'data-testid': dataTestId }: SubtleFormDatePickerProps) => (
      <div data-testid={dataTestId || 'ds-subtle-form-date-picker'} />
    ),
  );

  const Field = vi.fn(
    ({ children, 'data-testid': dataTestId }: SubtleFormFieldProps) => (
      <div data-testid={dataTestId || 'ds-subtle-form-field'}>{children}</div>
    ),
  );

  const SubtleForm = Object.assign(
    vi.fn(() => null),
    { TextArea, Input, Select, DatePicker, Field },
  );

  return {
    default: SubtleForm,
  };
};
