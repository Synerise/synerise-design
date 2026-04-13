import React from 'react';

type MockFlexProps = {
  children?: React.ReactNode;
  className?: string;
  alignItems?: string;
  justifyContent?: string;
  flexDirection?: string;
  flexWrap?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
  [key: string]: unknown;
};

type MockBoxProps = {
  children?: React.ReactNode;
  className?: string;
  width?: string | number | (string | number)[];
  style?: React.CSSProperties;
  'data-testid'?: string;
  [key: string]: unknown;
};

export const flexBoxMockFactory = async () => {
  const original = await vi.importActual<Record<string, unknown>>(
    '@synerise/ds-flex-box',
  );
  return {
    ...original,
    Flex: vi.fn(
      ({
        children,
        className,
        alignItems,
        justifyContent,
        flexDirection,
        flexWrap,
        'data-testid': dataTestId,
      }: MockFlexProps) => (
        <div
          className={`ds-flex ${className || ''}`}
          data-testid={dataTestId || 'ds-flex'}
          style={{
            display: 'flex',
            alignItems,
            justifyContent,
            flexDirection,
            flexWrap,
          }}
        >
          {children}
        </div>
      ),
    ),
    Box: vi.fn(
      ({ children, className, 'data-testid': dataTestId }: MockBoxProps) => (
        <div
          className={`ds-box ${className || ''}`}
          data-testid={dataTestId || 'ds-box'}
        >
          {children}
        </div>
      ),
    ),
  };
};

export const flexBoxMinimalMockFactory = () => ({
  Flex: vi.fn(() => null),
  Box: vi.fn(() => null),
});
