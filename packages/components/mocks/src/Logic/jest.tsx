import React from 'react';

type MockLogicProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockMatchingProps = {
  value?: unknown;
  onChange?: (value: unknown) => void;
  texts?: Record<string, string>;
  'data-testid'?: string;
};

type MockPlaceholderProps = {
  children?: React.ReactNode;
  'data-testid'?: string;
};

export const mockLogic = () => {
  jest.mock('@synerise/ds-logic', () => {
    const Matching = jest.fn(
      ({
        value,
        onChange: _onChange,
        texts,
        'data-testid': dataTestId,
      }: MockMatchingProps) => (
        <div
          data-testid={dataTestId || 'ds-logic-matching'}
          data-value={
            value !== null && value !== undefined ? String(value) : undefined
          }
        >
          {texts && Object.values(texts).join(', ')}
        </div>
      ),
    );

    const Placeholder = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockPlaceholderProps) => (
        <div data-testid={dataTestId || 'ds-logic-placeholder'}>{children}</div>
      ),
    );

    const Logic = Object.assign(
      jest.fn(
        ({
          children,
          className,
          'data-testid': dataTestId,
        }: MockLogicProps) => (
          <div data-testid={dataTestId || 'ds-logic'} className={className}>
            {children}
          </div>
        ),
      ),
      { Matching },
    );

    return {
      __esModule: true,
      default: Logic,
      Matching,
      Placeholder,
    };
  });
};

export const mockLogicMinimal = () => {
  jest.mock('@synerise/ds-logic', () => {
    const Matching = jest.fn(() => null);

    const Logic = Object.assign(
      jest.fn(() => null),
      { Matching },
    );

    return {
      __esModule: true,
      default: Logic,
      Matching,
      Placeholder: jest.fn(() => null),
    };
  });
};
