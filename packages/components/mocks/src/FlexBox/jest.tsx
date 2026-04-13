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

export const mockFlexBox = () => {
  jest.mock('@synerise/ds-flex-box', () => ({
    __esModule: true,
    ...jest.requireActual('@synerise/ds-flex-box'),
    Flex: jest.fn(
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
    Box: jest.fn(
      ({ children, className, 'data-testid': dataTestId }: MockBoxProps) => (
        <div
          className={`ds-box ${className || ''}`}
          data-testid={dataTestId || 'ds-box'}
        >
          {children}
        </div>
      ),
    ),
  }));
};

export const mockFlexBoxMinimal = () => {
  jest.mock('@synerise/ds-flex-box', () => ({
    __esModule: true,
    Flex: jest.fn(() => null),
    Box: jest.fn(() => null),
  }));
};
