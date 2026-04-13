import React from 'react';

import type { SwitchProps } from '@synerise/ds-switch';

export type MockSwitchProps = SwitchProps & {
  'data-testid'?: string;
};

export const mockSwitch = () => {
  jest.mock('@synerise/ds-switch', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        className,
        checked,
        disabled,
        onChange,
        label,
        'data-testid': dataTestId,
      }: MockSwitchProps) => {
        const testId = dataTestId || 'ds-switch';
        return (
          <div className={`ds-switch ${className || ''}`} data-testid={testId}>
            <button
              data-testid={`${testId}-toggle`}
              role="switch"
              aria-checked={!!checked}
              onClick={() => onChange?.(!checked)}
              disabled={disabled}
            >
              {checked ? 'ON' : 'OFF'}
            </button>
            {label && <span data-testid={`${testId}-label`}>{label}</span>}
          </div>
        );
      },
    ),
    RawSwitch: jest.fn(
      ({
        checked,
        disabled,
        onChange,
        'data-testid': dataTestId,
      }: MockSwitchProps) => (
        <button
          data-testid={dataTestId || 'ds-raw-switch'}
          role="switch"
          aria-checked={!!checked}
          onClick={() => onChange?.(!checked)}
          disabled={disabled}
        >
          {checked ? 'ON' : 'OFF'}
        </button>
      ),
    ),
  }));
};

export const mockSwitchMinimal = () => {
  jest.mock('@synerise/ds-switch', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    RawSwitch: jest.fn(() => null),
  }));
};
