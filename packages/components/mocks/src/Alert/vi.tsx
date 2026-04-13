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

/**
 * Factory function for Alert mock.
 * Mocks the entire @synerise/ds-alert package including Alert and all sub-components.
 * NOTE: This is a deprecated package. Most sub-components are re-exports from their own packages.
 *
 * @example
 * ```typescript
 * import { alertMockFactory } from '@synerise/ds-mocks/Alert/vi';
 *
 * vi.mock('@synerise/ds-alert', alertMockFactory);
 * ```
 */
export const alertMockFactory = () => {
  const Alert = vi.fn(
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

  const Toast = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
      <div
        data-testid={dataTestId || 'ds-alert-toast'}
        className="ds-alert-toast"
      >
        {children}
      </div>
    ),
  );

  const SectionMessage = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
      <div
        data-testid={dataTestId || 'ds-alert-section-message'}
        className="ds-alert-section-message"
      >
        {children}
      </div>
    ),
  );

  const BroadcastBar = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
      <div
        data-testid={dataTestId || 'ds-alert-broadcast-bar'}
        className="ds-alert-broadcast-bar"
      >
        {children}
      </div>
    ),
  );

  const IconAlert = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
      <div
        data-testid={dataTestId || 'ds-alert-icon-alert'}
        className="ds-alert-icon-alert"
      >
        {children}
      </div>
    ),
  );

  const InlineAlert = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
      <div
        data-testid={dataTestId || 'ds-alert-inline-alert'}
        className="ds-alert-inline-alert"
      >
        {children}
      </div>
    ),
  );

  const AlertInfo = vi.fn(
    ({ children, 'data-testid': dataTestId }: MockAlertSubComponentProps) => (
      <div
        data-testid={dataTestId || 'ds-alert-info'}
        className="ds-alert-info"
      >
        {children}
      </div>
    ),
  );

  const AlertMessage = vi.fn(
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
};

/**
 * Factory function for minimal Alert mock.
 *
 * @example
 * ```typescript
 * vi.mock('@synerise/ds-alert', alertMinimalMockFactory);
 * ```
 */
export const alertMinimalMockFactory = () => ({
  default: vi.fn(() => null),
  Toast: vi.fn(() => null),
  SectionMessage: vi.fn(() => null),
  BroadcastBar: vi.fn(() => null),
  IconAlert: vi.fn(() => null),
  InlineAlert: vi.fn(() => null),
  AlertInfo: vi.fn(() => null),
  AlertStyles: {},
  AlertMessage: vi.fn(() => null),
});
