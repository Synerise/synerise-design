import React from 'react';

import type { InputNumberProps } from '@synerise/ds-input-number';

export type MockInputNumberProps = InputNumberProps & {
  'data-testid'?: string;
};

export const mockInputNumber = () => {
  jest.mock('@synerise/ds-input-number', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        value,
        onChange,
        min,
        max,
        step,
        disabled,
        placeholder,
        className,
        'data-testid': dataTestId,
      }: MockInputNumberProps) => (
        <div
          className={`ds-input-number ${className || ''}`}
          data-testid={dataTestId || 'ds-input-number'}
        >
          <input
            type="number"
            value={value as number}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            min={min as number}
            max={max as number}
            step={step as number}
            disabled={disabled}
            placeholder={placeholder}
          />
        </div>
      ),
    ),
  }));
};

export const mockInputNumberMinimal = () => {
  jest.mock('@synerise/ds-input-number', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
