import React, { ReactNode } from 'react';
import { renderHook, screen, waitFor } from '@testing-library/react';

import { DSProvider } from '@synerise/ds-core';
import { showToast, removeToast } from '@synerise/ds-toast';
import { useToaster } from '../index';

import userEvent from '@testing-library/user-event';
import { TOASTER_DEFAULTS } from '../constants';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

const renderWithToaster = (node: ReactNode) => {
  renderWithProvider(node, undefined, { toasterProps: TOASTER_DEFAULTS });
}

describe('Toaster', () => {
  it('should return toaster props', async () => {
    const { result } = renderHook(() => useToaster(), {
      wrapper: ({ children }) => <DSProvider toasterProps={TOASTER_DEFAULTS}>{children}</DSProvider>,
    });
    expect(result.current.options).toEqual(TOASTER_DEFAULTS);
  });

  it('toaster should render toast', async () => {
    const TEST_MESSAGE = 'TEST_MESSAGE';
    const TRIGGER = 'TRIGGER';
    renderWithToaster(<div onClick={() => showToast('success', { message: TEST_MESSAGE })}>{TRIGGER}</div>);
    await waitFor(() => expect(screen.queryByText(TEST_MESSAGE)).not.toBeInTheDocument());
    userEvent.click(screen.getByText(TRIGGER));
    await waitFor(() => expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument());
    removeToast()
  });


  it('toaster should render 2 toasts', async () => {
    const TEST_MESSAGE = 'TEST_MESSAGE';
    const TRIGGER = 'TRIGGER';
    renderWithToaster(<div onClick={() => showToast('success', { message: TEST_MESSAGE })}>{TRIGGER}</div>);
    await waitFor(() => expect(screen.queryByText(TEST_MESSAGE)).not.toBeInTheDocument());
    userEvent.click(screen.getByText(TRIGGER));
    userEvent.click(screen.getByText(TRIGGER));
    await waitFor(() => expect(screen.getAllByText(TEST_MESSAGE)).toHaveLength(2));
    removeToast()
  });

});
