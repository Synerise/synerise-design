import React from 'react';

import { closeAllOverlays, renderWithProvider } from '@synerise/ds-core';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover, PopoverContent, PopoverTrigger} from '../index';

const TRIGGER_LABEL = 'trigger'
const TRIGGER = <button>{TRIGGER_LABEL}</button>
const OVERLAY_CONTENT = 'the overlay';
const OVERLAY = <div>{OVERLAY_CONTENT}</div>

describe('Popover', () => {
    it('should render', () => {
        renderWithProvider(<Popover>
            <PopoverTrigger>
              {TRIGGER}
            </PopoverTrigger>
            <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>)
        
        expect(screen.getByText(TRIGGER_LABEL)).toBeInTheDocument();
        expect(screen.queryByText(OVERLAY_CONTENT)).not.toBeInTheDocument();
    })
    it('should show overlay on click', async () => {
        renderWithProvider(<Popover>
            <PopoverTrigger>
              {TRIGGER}
            </PopoverTrigger>
            <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>)
        
        expect(screen.getByText(TRIGGER_LABEL)).toBeInTheDocument();
        userEvent.click(screen.getByText(TRIGGER_LABEL));
        await waitFor(() =>  expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument())
    })
    it('should show overlay on hover', async () => {
        renderWithProvider(<Popover trigger='hover'>
            <PopoverTrigger>
              {TRIGGER}
            </PopoverTrigger>
            <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>)
        
        expect(screen.getByText(TRIGGER_LABEL)).toBeInTheDocument();
        
        userEvent.hover(screen.getByRole('button'));
        await waitFor(() =>  expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument())
    })

  describe('closeAllOverlays', () => {
    it('closes an uncontrolled popover', async () => {
      renderWithProvider(
        <Popover>
          <PopoverTrigger>{TRIGGER}</PopoverTrigger>
          <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>,
      );
      userEvent.click(screen.getByText(TRIGGER_LABEL));
      await waitFor(() =>
        expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument(),
      );

      await act(async () => {
        await closeAllOverlays();
      });

      await waitFor(() =>
        expect(screen.queryByText(OVERLAY_CONTENT)).not.toBeInTheDocument(),
      );
    });

    it('notifies a controlled owner via onOpenChange and onDismiss', async () => {
      const onOpenChange = vi.fn();
      const onDismiss = vi.fn();
      renderWithProvider(
        <Popover open onOpenChange={onOpenChange} onDismiss={onDismiss}>
          <PopoverTrigger>{TRIGGER}</PopoverTrigger>
          <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>,
      );
      await waitFor(() =>
        expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument(),
      );

      await act(async () => {
        await closeAllOverlays();
      });

      expect(onOpenChange).toHaveBeenCalledWith(
        false,
        undefined,
        'escape-key',
      );
      expect(onDismiss).toHaveBeenCalledWith(undefined, 'escape-key');
    });

    it('closes a popover mounted into a custom popup container', async () => {
      const container = document.createElement('div');
      document.body.appendChild(container);

      renderWithProvider(
        <Popover getPopupContainer={() => container}>
          <PopoverTrigger>{TRIGGER}</PopoverTrigger>
          <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>,
      );
      userEvent.click(screen.getByText(TRIGGER_LABEL));
      await waitFor(() =>
        expect(container).toHaveTextContent(OVERLAY_CONTENT),
      );

      await act(async () => {
        await closeAllOverlays();
      });

      await waitFor(() =>
        expect(container).not.toHaveTextContent(OVERLAY_CONTENT),
      );
      document.body.removeChild(container);
    });

    it('leaves the popover open when another kind is targeted', async () => {
      renderWithProvider(
        <Popover>
          <PopoverTrigger>{TRIGGER}</PopoverTrigger>
          <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>,
      );
      userEvent.click(screen.getByText(TRIGGER_LABEL));
      await waitFor(() =>
        expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument(),
      );

      await act(async () => {
        await closeAllOverlays({ kinds: ['modal'] });
      });

      expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument();
    });

    it('closes a nested popover before its parent', async () => {
      const order: string[] = [];
      const NESTED_TRIGGER = 'nested trigger';
      const NESTED_CONTENT = 'nested overlay';

      renderWithProvider(
        // Tracked via onDismiss, not onOpenChange: passing onOpenChange
        // replaces usePopover's state setter, leaving the popover unable to
        // open on its own.
        <Popover onDismiss={() => order.push('parent')}>
          <PopoverTrigger>{TRIGGER}</PopoverTrigger>
          <PopoverContent>
            <Popover onDismiss={() => order.push('nested')}>
              <PopoverTrigger>
                <button>{NESTED_TRIGGER}</button>
              </PopoverTrigger>
              <PopoverContent>
                <div>{NESTED_CONTENT}</div>
              </PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover>,
      );
      userEvent.click(screen.getByText(TRIGGER_LABEL));
      await waitFor(() =>
        expect(screen.getByText(NESTED_TRIGGER)).toBeInTheDocument(),
      );
      userEvent.click(screen.getByText(NESTED_TRIGGER));
      await waitFor(() =>
        expect(screen.getByText(NESTED_CONTENT)).toBeInTheDocument(),
      );
      order.length = 0;

      await act(async () => {
        await closeAllOverlays();
      });

      expect(order).toEqual(['nested', 'parent']);
      await waitFor(() =>
        expect(screen.queryByText(NESTED_CONTENT)).not.toBeInTheDocument(),
      );
    });

    it('reports the overlayKind it was given', async () => {
      renderWithProvider(
        <Popover overlayKind="tooltip">
          <PopoverTrigger>{TRIGGER}</PopoverTrigger>
          <PopoverContent>{OVERLAY}</PopoverContent>
        </Popover>,
      );
      userEvent.click(screen.getByText(TRIGGER_LABEL));
      await waitFor(() =>
        expect(screen.getByText(OVERLAY_CONTENT)).toBeInTheDocument(),
      );

      await act(async () => {
        await closeAllOverlays({ kinds: ['tooltip'] });
      });

      await waitFor(() =>
        expect(screen.queryByText(OVERLAY_CONTENT)).not.toBeInTheDocument(),
      );
    });
  });
})
