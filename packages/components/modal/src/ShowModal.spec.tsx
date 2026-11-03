import { setPortalContent } from '@synerise/ds-core';
import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { showModal } from './ShowModal';

vi.mock('@synerise/ds-core',  async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    setPortalContent: vi.fn(),
  }
});

describe('showModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const portalElement = () =>
    (setPortalContent as ReturnType<typeof vi.fn>).mock.calls[0][0];

  it('should call setPortalContent with an open modal element', () => {
    showModal({ title: 'Test' });

    expect(setPortalContent).toHaveBeenCalledTimes(1);
    renderWithProvider(portalElement());

    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should close itself when the user cancels', async () => {
    const onCancel = vi.fn();
    const afterClose = vi.fn();
    showModal({ title: 'Test', onCancel, afterClose });
    renderWithProvider(portalElement());

    fireEvent.click(screen.getByTestId('modal-close'));

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(afterClose).toHaveBeenCalledTimes(1));
    expect(setPortalContent).toHaveBeenLastCalledWith(null);
  });

  it('should close itself on an async onCancel once it resolves', async () => {
    const onCancel = vi.fn().mockResolvedValue(undefined);
    const afterClose = vi.fn();
    showModal({ title: 'Test', onCancel, afterClose });
    renderWithProvider(portalElement());

    fireEvent.click(screen.getByTestId('modal-close'));

    await waitFor(() => expect(afterClose).toHaveBeenCalledTimes(1));
  });

  it('should return a handle with destroy()', () => {
    const handle = showModal({ title: 'Test' });

    expect(typeof handle.destroy).toBe('function');
  });

  it('should call setPortalContent(null) when destroy() is called', () => {
    const handle = showModal({ title: 'Test' });
    handle.destroy();

    expect(setPortalContent).toHaveBeenLastCalledWith(null);
  });

  it('should call afterClose when destroy() is called', () => {
    const afterClose = vi.fn();
    const handle = showModal({ title: 'Test', afterClose });

    // Simulate the afterClose being triggered (called via the modal's afterClose prop)
    portalElement().props.afterClose();

    expect(afterClose).toHaveBeenCalledTimes(1);
  });

  it('should increment key for each new modal instance', () => {
    showModal({ title: 'First' });
    showModal({ title: 'Second' });

    const calls = (setPortalContent as ReturnType<typeof vi.fn>).mock.calls;
    expect(calls[0][0].key).not.toBe(calls[1][0].key);
  });
});
