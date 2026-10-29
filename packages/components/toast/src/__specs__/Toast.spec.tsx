import React, { type ReactNode } from 'react';

import { TOASTER_DEFAULTS } from '@synerise/ds-core';
import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { type ToastType } from '../Toast.types';
import Toast, { showToast } from '../index';
import { removeToast } from '../utils';

const renderWithToaster = (node: ReactNode) => {
  renderWithProvider(node, undefined, { toasterProps: TOASTER_DEFAULTS });
};
const TEST_DATA: {
  type: ToastType;
  variant: string;
  icon: string;
  show: typeof Toast.success;
}[] = [
  {
    type: 'success',
    variant: 'success',
    icon: 'check-3-m',
    show: Toast.success,
  },
  {
    type: 'warning',
    variant: 'warning',
    icon: 'warning-fill-m',
    show: Toast.warning,
  },
  {
    type: 'negative',
    variant: 'error',
    icon: 'warning-fill-m',
    show: Toast.error,
  },
  {
    type: 'informative',
    variant: 'informative',
    icon: 'info-fill-m',
    show: Toast.info,
  },
];

describe('Toast', () => {
  const MESSAGE = 'Test message';
  const TRIGGER_TEST_ID = 'test-toast';
  const TOAST_TEST_ID = 'toast-test-id';
  it.each(TEST_DATA)(
    'Should render $type with the $variant variant colours',
    ({ type, variant, icon }) => {
      renderWithToaster(
        <Toast data-testid={TOAST_TEST_ID} type={type} message={MESSAGE} />,
      );

      expect(screen.getByText(MESSAGE)).toBeInTheDocument();
      const toast = screen.getByTestId(TOAST_TEST_ID);
      expect(toast).toHaveStyle({
        backgroundColor: `var(--ds-toast-variant-${variant}-bg)`,
      });
      expect(declarationsFor(toast)).toContain(
        `border-top:solid 2px var(--ds-toast-variant-${variant}-border)`,
      );
      expect(
        screen.getByTestId(TOAST_TEST_ID).querySelector(`.${icon}`),
      ).toBeInTheDocument();
    },
  );

  it.each(TEST_DATA)(
    'toaster should display toast',
    async ({ type, variant, icon }) => {
      renderWithToaster(
        <a
          data-testid={TRIGGER_TEST_ID}
          onClick={() =>
            showToast(type, {
              message: <>{MESSAGE}</>,
              'data-testid': TOAST_TEST_ID,
            })
          }
        />,
      );
      removeToast();

      expect(screen.getByTestId(TRIGGER_TEST_ID)).toBeInTheDocument();
      userEvent.click(screen.getByTestId(TRIGGER_TEST_ID));

      await waitFor(() => {
        expect(screen.getByText(MESSAGE)).toBeInTheDocument();
        expect(screen.getByTestId(TOAST_TEST_ID)).toHaveStyle({
          backgroundColor: `var(--ds-toast-variant-${variant}-bg)`,
        });
        expect(
          screen.getByTestId(TOAST_TEST_ID).querySelector(`.${icon}`),
        ).toBeInTheDocument();
      });
    },
  );

  it.each(TEST_DATA)(
    'toaster should display toast using static methods',
    async ({ variant, icon, show }) => {
      renderWithToaster(
        <a
          data-testid={TRIGGER_TEST_ID}
          onClick={() =>
            show({ message: <>{MESSAGE}</>, 'data-testid': TOAST_TEST_ID })
          }
        />,
      );
      removeToast();

      expect(screen.getByTestId(TRIGGER_TEST_ID)).toBeInTheDocument();
      userEvent.click(screen.getByTestId(TRIGGER_TEST_ID));

      await waitFor(() => {
        expect(screen.getByText(MESSAGE)).toBeInTheDocument();
        expect(screen.getByTestId(TOAST_TEST_ID)).toHaveStyle({
          backgroundColor: `var(--ds-toast-variant-${variant}-bg)`,
        });
        expect(
          screen.getByTestId(TOAST_TEST_ID).querySelector(`.${icon}`),
        ).toBeInTheDocument();
      });
    },
  );

  it('toaster should display 2 toasts', async () => {
    renderWithToaster(
      <a
        data-testid={TRIGGER_TEST_ID}
        onClick={() => showToast('success', { message: <>{MESSAGE}</> })}
      />,
    );
    removeToast();

    expect(screen.getByTestId(TRIGGER_TEST_ID)).toBeInTheDocument();

    userEvent.click(screen.getByTestId(TRIGGER_TEST_ID));
    userEvent.click(screen.getByTestId(TRIGGER_TEST_ID));

    await waitFor(() => expect(screen.getAllByText(MESSAGE)).toHaveLength(2));
  });
});

