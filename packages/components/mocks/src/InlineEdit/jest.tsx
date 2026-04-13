import React from 'react';

type MockInlineEditProps = {
  input?: React.ReactNode;
  size?: string;
  style?: React.CSSProperties;
  className?: string;
  'data-testid'?: string;
};

type MockInlineSelectProps = {
  children?: React.ReactNode;
  placeholder?: string;
  size?: string;
  className?: string;
  'data-testid'?: string;
};

export const mockInlineEdit = () => {
  jest.mock('@synerise/ds-inline-edit', () => {
    const InlineEdit = jest.fn(
      ({
        input,
        size,
        style,
        className,
        'data-testid': dataTestId,
      }: MockInlineEditProps) => {
        const testId = dataTestId || 'ds-inline-edit';
        return (
          <div
            data-testid={testId}
            className={className}
            style={style}
            data-size={size}
          >
            {input}
          </div>
        );
      },
    );

    const InlineSelect = jest.fn(
      ({
        children,
        placeholder,
        size,
        className,
        'data-testid': dataTestId,
      }: MockInlineSelectProps) => {
        const testId = dataTestId || 'ds-inline-select';
        return (
          <div
            data-testid={testId}
            className={className}
            data-size={size}
            data-placeholder={placeholder}
          >
            {children}
          </div>
        );
      },
    );

    return {
      __esModule: true,
      default: InlineEdit,
      InlineSelect,
    };
  });
};

export const mockInlineEditMinimal = () => {
  jest.mock('@synerise/ds-inline-edit', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    InlineSelect: jest.fn(() => null),
  }));
};
