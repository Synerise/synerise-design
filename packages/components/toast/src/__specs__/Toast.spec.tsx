import React, { type ReactNode } from 'react';

import { theme } from '@synerise/ds-core';
import { TOASTER_DEFAULTS } from '@synerise/ds-toaster';
import { renderWithProvider } from '@synerise/ds-utils';
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
  color: string;
  icon: string;
  show: typeof Toast.success;
}[] = [
  {
    type: 'success',
    color: theme.palette['green-600'],
    icon: 'check-3-m',
    show: Toast.success,
  },
  {
    type: 'warning',
    color: theme.palette['yellow-600'],
    icon: 'warning-fill-m',
    show: Toast.warning,
  },
  {
    type: 'negative',
    color: theme.palette['red-500'],
    icon: 'warning-fill-m',
    show: Toast.error,
  },
  {
    type: 'informative',
    color: theme.palette['grey-050'],
    icon: 'info-fill-m',
    show: Toast.info,
  },
];

describe('Toast', () => {
  const MESSAGE = 'Test message';
  const TRIGGER_TEST_ID = 'test-toast';
  const TOAST_TEST_ID = 'toast-test-id';
  it.each(TEST_DATA)('Should render correct style', ({ type, color, icon }) => {
    renderWithToaster(
      <Toast data-testid={TOAST_TEST_ID} type={type} message={MESSAGE} />,
    );

    expect(screen.getByText(MESSAGE)).toBeInTheDocument();
    expect(screen.getByTestId(TOAST_TEST_ID)).toHaveStyle({
      backgroundColor: color,
    });
    expect(
      screen.getByTestId(TOAST_TEST_ID).querySelector(`.${icon}`),
    ).toBeInTheDocument();
  });

  it.each(TEST_DATA)(
    'toaster should display toast',
    async ({ type, color, icon }) => {
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
          backgroundColor: color,
        });
        expect(
          screen.getByTestId(TOAST_TEST_ID).querySelector(`.${icon}`),
        ).toBeInTheDocument();
      });
    },
  );

  it.each(TEST_DATA)(
    'toaster should display toast using static methods',
    async ({ color, icon, show }) => {
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
          backgroundColor: color,
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
