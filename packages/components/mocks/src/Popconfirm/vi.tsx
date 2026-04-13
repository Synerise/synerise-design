import React from 'react';

type MockPopconfirmProps = {
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  'data-testid'?: string;
};

type MockConfirmMessageProps = {
  children?: React.ReactNode;
  title?: string;
  onClick?: (showMessage: () => void) => void;
  'data-testid'?: string;
};

export const popconfirmMockFactory = () => ({
  default: vi.fn(
    ({
      children,
      title,
      description,
      okText,
      cancelText,
      onConfirm,
      onCancel,
      disabled,
      open,
      'data-testid': dataTestId,
    }: MockPopconfirmProps) => {
      if (disabled) {
        return <>{children}</>;
      }
      const testId = dataTestId || 'ds-popconfirm';
      return (
        <div data-testid={testId}>
          {children}
          {open !== false && (
            <div data-testid={`${testId}-content`}>
              {title && <div data-testid={`${testId}-title`}>{title}</div>}
              {description && (
                <div data-testid={`${testId}-description`}>{description}</div>
              )}
              {cancelText && (
                <button data-testid={`${testId}-cancel`} onClick={onCancel}>
                  {cancelText}
                </button>
              )}
              {okText && (
                <button data-testid={`${testId}-ok`} onClick={onConfirm}>
                  {okText}
                </button>
              )}
            </div>
          )}
        </div>
      );
    },
  ),
  ConfirmMessage: vi.fn(
    ({
      children,
      title: _title,
      onClick,
      'data-testid': dataTestId,
    }: MockConfirmMessageProps) => {
      const testId = dataTestId || 'ds-confirm-message';
      return (
        <div data-testid={testId} onClick={() => onClick?.(() => {})}>
          {children}
        </div>
      );
    },
  ),
});

export const popconfirmMinimalMockFactory = () => ({
  default: vi.fn(({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  )),
  ConfirmMessage: vi.fn(() => null),
});
