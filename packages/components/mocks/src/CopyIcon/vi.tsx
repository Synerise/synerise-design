import React from 'react';

import type { CopyIconProps } from '@synerise/ds-copy-icon';

export type MockCopyIconProps = CopyIconProps & {
  'data-testid'?: string;
};

export const copyIconMockFactory = () => ({
  default: vi.fn(
    ({
      text,
      onCopy,
      className,
      'data-testid': dataTestId,
    }: MockCopyIconProps) => (
      <button
        className={`ds-copy-icon ${className || ''}`}
        data-testid={dataTestId || 'ds-copy-icon'}
        data-text={text}
        onClick={() => onCopy?.()}
      />
    ),
  ),
});

export const copyIconMinimalMockFactory = () => ({
  default: vi.fn(() => null),
});
