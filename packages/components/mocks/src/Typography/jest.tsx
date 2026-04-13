import React from 'react';

type MockTitleProps = {
  children?: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  withoutMargin?: boolean;
  'data-testid'?: string;
};

type MockTextProps = {
  children?: React.ReactNode;
  className?: string;
  size?: 'medium' | 'small' | 'xsmall';
  'data-testid'?: string;
};

type MockParagraphProps = {
  children?: React.ReactNode;
  size?: 'medium' | 'small' | 'xsmall';
  'data-testid'?: string;
};

type MockLabelProps = {
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
  'data-testid'?: string;
};

type MockDescriptionProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  'data-testid'?: string;
};

export const mockTypography = () => {
  jest.mock('@synerise/ds-typography', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    Title: jest.fn(
      ({
        children,
        className,
        level = 1,
        withoutMargin,
        'data-testid': dataTestId,
      }: MockTitleProps) => {
        const Tag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements;
        return (
          <Tag
            className={`ds-title ${className || ''}`}
            data-testid={dataTestId || 'ds-title'}
            data-level={level}
            style={withoutMargin ? { marginBottom: 0 } : undefined}
          >
            {children}
          </Tag>
        );
      },
    ),
    Text: jest.fn(
      ({
        children,
        className,
        size = 'medium',
        'data-testid': dataTestId,
      }: MockTextProps) => (
        <span
          className={`ds-text ${className || ''}`}
          data-testid={dataTestId || 'ds-text'}
          data-size={size}
        >
          {children}
        </span>
      ),
    ),
    Paragraph: jest.fn(
      ({
        children,
        size = 'medium',
        'data-testid': dataTestId,
      }: MockParagraphProps) => (
        <span
          className="ds-paragraph"
          data-testid={dataTestId || 'ds-paragraph'}
          data-size={size}
        >
          {children}
        </span>
      ),
    ),
    Description: jest.fn(
      ({
        children,
        disabled,
        'data-testid': dataTestId,
      }: MockDescriptionProps) => (
        <div
          data-testid={dataTestId || 'ds-description'}
          style={disabled ? { opacity: 0.4 } : undefined}
        >
          {children}
        </div>
      ),
    ),
    ErrorText: jest.fn(
      ({
        children,
        'data-testid': dataTestId,
      }: {
        children?: React.ReactNode;
        'data-testid'?: string;
      }) => <div data-testid={dataTestId || 'ds-error-text'}>{children}</div>,
    ),
    Label: jest.fn(
      ({
        children,
        className,
        htmlFor,
        'data-testid': dataTestId,
      }: MockLabelProps) => (
        <label
          className={`ds-label ${className || ''}`}
          data-testid={dataTestId || 'ds-label'}
          htmlFor={htmlFor}
        >
          {children}
        </label>
      ),
    ),
    macro: {},
  }));
};

export const mockTypographyMinimal = () => {
  jest.mock('@synerise/ds-typography', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    Title: jest.fn(() => null),
    Text: jest.fn(() => null),
    Paragraph: jest.fn(() => null),
    Description: jest.fn(() => null),
    ErrorText: jest.fn(() => null),
    Label: jest.fn(() => null),
    macro: {},
  }));
};
