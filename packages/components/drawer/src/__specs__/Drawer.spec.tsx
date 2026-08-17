import React from 'react';

import { closeAllOverlays, renderWithProvider } from '@synerise/ds-core';
import { act, fireEvent, screen } from '@testing-library/react';

import Drawer from '../Drawer';
import { type DrawerProps } from '../Drawer.types';

const DRAWER = (props: Partial<DrawerProps>) => (
  <Drawer width={400} placement="right" {...props}>
    <Drawer.DrawerHeader data-testid="ds-drawer">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 24,
        }}
      >
        <h4 style={{ flex: 1, margin: 0 }}>Example drawer</h4>
      </div>
    </Drawer.DrawerHeader>
    <Drawer.DrawerBody>
      <Drawer.DrawerContent>
        <p>Content</p>
      </Drawer.DrawerContent>
    </Drawer.DrawerBody>
  </Drawer>
);

describe('Drawer component', () => {
  it('should render when open', () => {
    renderWithProvider(DRAWER({ open: true }));

    expect(screen.getByTestId('ds-drawer')).toBeTruthy();
  });

  it('should not render when never opened', () => {
    renderWithProvider(DRAWER({ open: false }));

    expect(screen.queryAllByTestId('ds-drawer').length).toBe(0);
  });

  it('should render after the open prop flips to true', () => {
    const { rerender } = renderWithProvider(DRAWER({ open: false }));
    expect(screen.queryAllByTestId('ds-drawer').length).toBe(0);

    rerender(DRAWER({ open: true }));
    expect(screen.queryAllByTestId('ds-drawer').length).toBe(1);
  });

  it('should accept the legacy `visible` prop as an alias for `open`', () => {
    renderWithProvider(DRAWER({ visible: true }));

    expect(screen.getByTestId('ds-drawer')).toBeTruthy();
  });

  it('should call onClose when the mask is clicked', () => {
    const onClose = vi.fn();
    renderWithProvider(DRAWER({ open: true, onClose }));

    const mask = document.querySelector('.ds-drawer-mask');
    expect(mask).toBeTruthy();
    fireEvent.click(mask as Element);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose on mask click when maskClosable is false', () => {
    const onClose = vi.fn();
    renderWithProvider(DRAWER({ open: true, onClose, maskClosable: false }));

    fireEvent.click(document.querySelector('.ds-drawer-mask') as Element);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should call onClose on Escape when keyboard is enabled', () => {
    const onClose = vi.fn();
    renderWithProvider(DRAWER({ open: true, onClose }));

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not render a mask when mask is false (inline mode)', () => {
    renderWithProvider(DRAWER({ open: true, mask: false }));

    expect(document.querySelector('.ds-drawer-mask')).toBeNull();
    expect(screen.getByTestId('ds-drawer')).toBeTruthy();
  });

  it('should name the dialog from an explicit aria-label', () => {
    renderWithProvider(DRAWER({ open: true, 'aria-label': 'Filters' }));

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Filters');
  });

  it('should fall back to `title` for the dialog accessible name', () => {
    renderWithProvider(DRAWER({ open: true, title: 'Audit log' }));

    expect(screen.getByRole('dialog')).toHaveAttribute(
      'aria-label',
      'Audit log',
    );
  });

  it('should prefer aria-labelledby over aria-label/title', () => {
    renderWithProvider(
      DRAWER({
        open: true,
        title: 'Audit log',
        'aria-labelledby': 'heading-id',
      }),
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'heading-id');
    expect(dialog).not.toHaveAttribute('aria-label');
  });

  describe('closeAllOverlays', () => {
    it('calls onClose with a usable event', async () => {
      const onClose = vi.fn();
      renderWithProvider(DRAWER({ open: true, onClose }));

      await act(async () => {
        await closeAllOverlays();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
      const [event] = onClose.mock.calls[0];
      expect(event.target).toBeInstanceOf(HTMLElement);
      expect(() => event.preventDefault()).not.toThrow();
    });

    it('does not call onClose when the drawer is closed', async () => {
      const onClose = vi.fn();
      renderWithProvider(DRAWER({ open: false, onClose }));

      await act(async () => {
        await closeAllOverlays();
      });

      expect(onClose).not.toHaveBeenCalled();
    });

    it('leaves the drawer alone when another kind is targeted', async () => {
      const onClose = vi.fn();
      renderWithProvider(DRAWER({ open: true, onClose }));

      await act(async () => {
        await closeAllOverlays({ kinds: ['modal'] });
      });

      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
