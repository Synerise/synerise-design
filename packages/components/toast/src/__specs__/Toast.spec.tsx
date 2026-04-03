import React, { type ReactNode } from 'react';

import { TOASTER_DEFAULTS, renderWithProvider } from '@synerise/ds-core';
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
  icon: string;
  show: typeof Toast.success;
}[] = [
  {
    type: 'success',
    icon: 'check-3-m',
    show: Toast.success,
  },
  {
    type: 'warning',
    icon: 'warning-fill-m',
    show: Toast.warning,
  },
  {
    type: 'negative',
    icon: 'warning-fill-m',
    show: Toast.error,
  },
  {
    type: 'informative',
    icon: 'info-fill-m',
    show: Toast.info,
  },
];

describe('Toast', () => {
  const MESSAGE = 'Test message';
  const TRIGGER_TEST_ID = 'test-toast';
  const TOAST_TEST_ID = 'toast-test-id';
  it.each(TEST_DATA)('Should render correct style', ({ type, icon }) => {
    renderWithToaster(
      <Toast data-testid={TOAST_TEST_ID} type={type} message={MESSAGE} />,
    );

    expect(screen.getByText(MESSAGE)).toBeInTheDocument();
    expect(screen.getByTestId(TOAST_TEST_ID)).toHaveAttribute(
      'data-toasttype',
      type,
    );
    expect(
      screen.getByTestId(TOAST_TEST_ID).querySelector(`.${icon}`),
    ).toBeInTheDocument();
  });

  it.each(TEST_DATA)(
    'toaster should display toast',
    async ({ type, icon }) => {
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
        expect(screen.getByTestId(TOAST_TEST_ID)).toHaveAttribute(
          'data-toasttype',
          type,
        );
        expect(
          screen.getByTestId(TOAST_TEST_ID).querySelector(`.${icon}`),
        ).toBeInTheDocument();
      });
    },
  );

  it.each(TEST_DATA)(
    'toaster should display toast using static methods',
    async ({ type, icon, show }) => {
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
        expect(screen.getByTestId(TOAST_TEST_ID)).toHaveAttribute(
          'data-toasttype',
          type,
        );
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
