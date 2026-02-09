import React from 'react';

import type { ModalProps } from '@synerise/ds-modal';

export type MockModalProps = ModalProps & {
  'data-testid'?: string;
};

export const mockModal = () => {
  jest.mock('@synerise/ds-modal', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        open,
        visible,
        title,
        children,
        onCancel,
        onOk,
        footer,
        closable = true,
        size,
        texts,
        'data-testid': dataTestId,
      }: MockModalProps) => {
        const isOpen = open ?? visible;
        if (!isOpen) {
          return null;
        }

        const testId = dataTestId || 'ds-modal';

        return (
          <div
            data-testid={testId}
            className="ds-modal"
            data-size={size}
            role="dialog"
          >
            <div data-testid={`${testId}-header`}>
              {title && <div data-testid={`${testId}-title`}>{title}</div>}
              {closable && (
                <button
                  data-testid={`${testId}-close`}
                  onClick={onCancel}
                  aria-label="Close"
                >
                  ×
                </button>
              )}
            </div>
            <div data-testid={`${testId}-body`}>{children}</div>
            {footer !== null && (
              <div data-testid={`${testId}-footer`}>
                {footer || (
                  <>
                    <button data-testid={`${testId}-cancel`} onClick={onCancel}>
                      {texts?.cancelButton || 'Cancel'}
                    </button>
                    <button data-testid={`${testId}-ok`} onClick={onOk}>
                      {texts?.okButton || 'OK'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      },
    ),
  }));
};

export const mockModalMinimal = () => {
  jest.mock('@synerise/ds-modal', () => ({
    __esModule: true,
    default: jest.fn(({ open, visible, children }: MockModalProps) => {
      const isOpen = open ?? visible;
      return isOpen ? <div data-testid="ds-modal">{children}</div> : null;
    }),
  }));
};
