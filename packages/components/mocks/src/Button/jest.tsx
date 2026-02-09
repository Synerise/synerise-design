import React from 'react';

import type { ButtonProps } from '@synerise/ds-button';

export type MockButtonProps = ButtonProps & {
  'data-testid'?: string;
};

export const mockButton = () => {
  jest.mock('@synerise/ds-button', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        onClick,
        type,
        mode,
        disabled,
        loading,
        className,
        'data-testid': dataTestId,
      }: MockButtonProps) => (
        <button
          className={`ds-button ${className || ''}`}
          data-testid={dataTestId || 'ds-button'}
          data-type={type}
          data-mode={mode}
          data-loading={!!loading}
          onClick={onClick}
          disabled={disabled || !!loading}
        >
          {loading ? 'Loading...' : children}
        </button>
      ),
    ),
  }));
};

export const mockButtonMinimal = () => {
  jest.mock('@synerise/ds-button', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
