import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { act, fireEvent, screen } from '@testing-library/react';

import { DropdownMenu } from '../components/DropdownMenu/DropdownMenu';

const TRIGGER_TEXT = 'Open menu';
const ITEM_TEXT = 'First item';

const renderMenu = (onOpenChange: (open: boolean) => void) =>
  renderWithProvider(
    <DropdownMenu dataSource={[{ itemKey: 'a', text: ITEM_TEXT }]} trigger={['click']} onOpenChange={onOpenChange}>
      <button type="button">{TRIGGER_TEXT}</button>
    </DropdownMenu>
  );

/**
 * Clicking an item closes the overlay on a short timer, so the item's own `onClick` finishes before
 * the row it was fired from is unmounted. The timer has to be cancelled when the list goes, or it
 * runs against a tree that is no longer mounted.
 */
describe('DropdownMenu close timer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('closes the overlay a tick after an item is clicked', () => {
    const onOpenChange = vi.fn();
    renderMenu(onOpenChange);

    fireEvent.click(screen.getByText(TRIGGER_TEXT));
    fireEvent.click(screen.getByText(ITEM_TEXT));

    expect(onOpenChange).not.toHaveBeenCalledWith(false);

    act(() => {
      vi.advanceTimersByTime(50);
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not close an overlay that has already been unmounted', () => {
    const onOpenChange = vi.fn();
    const { unmount } = renderMenu(onOpenChange);

    fireEvent.click(screen.getByText(TRIGGER_TEXT));
    fireEvent.click(screen.getByText(ITEM_TEXT));

    unmount();
    onOpenChange.mockClear();

    act(() => {
      vi.advanceTimersByTime(50);
    });

    // Without the cleanup this fires against an unmounted tree — harmless in a browser, but under
    // jsdom the document may be gone and React's scheduler throws reaching for `window`.
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
