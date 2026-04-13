import React from 'react';

type MockPageHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  rightSide?: React.ReactNode;
  'data-testid'?: string;
};

export const mockPageHeader = () => {
  jest.mock('@synerise/ds-page-header', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        children,
        className,
        title,
        description,
        onClose,
        rightSide,
        'data-testid': dataTestId,
      }: MockPageHeaderProps) => {
        const testId = dataTestId || 'ds-page-header';
        return (
          <div
            className={`ds-page-header ${className || ''}`}
            data-testid={testId}
          >
            {title && <div data-testid={`${testId}-title`}>{title}</div>}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {onClose && (
              <button data-testid={`${testId}-close`} onClick={onClose} />
            )}
            {rightSide && (
              <div data-testid={`${testId}-right-side`}>{rightSide}</div>
            )}
            {children}
          </div>
        );
      },
    ),
  }));
};

export const mockPageHeaderMinimal = () => {
  jest.mock('@synerise/ds-page-header', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
