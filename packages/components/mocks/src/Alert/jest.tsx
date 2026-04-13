import React from 'react';

type MockAlertProps = {
  type?: string;
  message?: React.ReactNode;
  description?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
};

type MockAlertSubComponentProps = {
  children?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
  [key: string]: unknown;
};

export const mockAlert = () => {
  jest.mock('@synerise/ds-alert', () => {
    const Alert = jest.fn(
      ({
        type,
        message,
        description,
        closable,
        onClose,
        children,
        className,
        'data-testid': dataTestId,
      }: MockAlertProps) => {
        const testId = dataTestId || 'ds-alert';
        return (
          <div
            data-testid={testId}
            className={`ds-alert ${className || ''}`}
            data-type={type}
          >
            {message && <div data-testid={`${testId}-message`}>{message}</div>}
            {description && (
              <div data-testid={`${testId}-description`}>{description}</div>
            )}
            {closable && (
              <button data-testid={`${testId}-close`} onClick={onClose}>
                Close
              </button>
            )}
            {children}
          </div>
        );
      },
    );

    const Toast = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
        <div
          data-testid={dataTestId || 'ds-alert-toast'}
          className="ds-alert-toast"
        >
          {children}
        </div>
      ),
    );

    const SectionMessage = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
        <div
          data-testid={dataTestId || 'ds-alert-section-message'}
          className="ds-alert-section-message"
        >
          {children}
        </div>
      ),
    );

    const BroadcastBar = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
        <div
          data-testid={dataTestId || 'ds-alert-broadcast-bar'}
          className="ds-alert-broadcast-bar"
        >
          {children}
        </div>
      ),
    );

    const IconAlert = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
        <div
          data-testid={dataTestId || 'ds-alert-icon-alert'}
          className="ds-alert-icon-alert"
        >
          {children}
        </div>
      ),
    );

    const InlineAlert = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
        <div
          data-testid={dataTestId || 'ds-alert-inline-alert'}
          className="ds-alert-inline-alert"
        >
          {children}
        </div>
      ),
    );

    const AlertInfo = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
        <div
          data-testid={dataTestId || 'ds-alert-info'}
          className="ds-alert-info"
        >
          {children}
        </div>
      ),
    );

    const AlertMessage = jest.fn(
      ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
        <div
          data-testid={dataTestId || 'ds-alert-message'}
          className="ds-alert-message"
        >
          {children}
        </div>
      ),
    );

    return {
      __esModule: true,
      default: Alert,
      Toast,
      SectionMessage,
      BroadcastBar,
      IconAlert,
      InlineAlert,
      AlertInfo,
      AlertStyles: {},
      AlertMessage,
    };
  });
};

export const mockAlertMinimal = () => {
  jest.mock('@synerise/ds-alert', () => ({
    __esModule: true,
    default: jest.fn(() => null),
    Toast: jest.fn(() => null),
    SectionMessage: jest.fn(() => null),
    BroadcastBar: jest.fn(() => null),
    IconAlert: jest.fn(() => null),
    InlineAlert: jest.fn(() => null),
    AlertInfo: jest.fn(() => null),
    AlertStyles: {},
    AlertMessage: jest.fn(() => null),
  }));
};
