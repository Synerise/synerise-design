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

export const mockSubtleForm = () => {
  jest.mock('@synerise/ds-subtle-form', () => {
    const TextArea = jest.fn(
      ({ 'data-testid': dataTestId }: SubtleFormTextAreaProps) => (
        <div data-testid={dataTestId || 'ds-subtle-form-textarea'} />
      ),
    );

    const Input = jest.fn(
      ({ 'data-testid': dataTestId }: SubtleFormInputProps) => (
        <div data-testid={dataTestId || 'ds-subtle-form-input'} />
      ),
    );

    const Select = jest.fn(
      ({ 'data-testid': dataTestId }: SubtleFormSelectProps) => (
        <div data-testid={dataTestId || 'ds-subtle-form-select'} />
      ),
    );

    const DatePicker = jest.fn(
      ({ 'data-testid': dataTestId }: SubtleFormDatePickerProps) => (
        <div data-testid={dataTestId || 'ds-subtle-form-date-picker'} />
      ),
    );

    const Field = jest.fn(
      ({ children, 'data-testid': dataTestId }: SubtleFormFieldProps) => (
        <div data-testid={dataTestId || 'ds-subtle-form-field'}>{children}</div>
      ),
    );

    const SubtleForm = Object.assign(
      jest.fn(() => null),
      { TextArea, Input, Select, DatePicker, Field },
    );

    return {
      __esModule: true,
      default: SubtleForm,
    };
  });
};
