import React from 'react';

import { closeAllOverlays, renderWithProvider } from '@synerise/ds-core';
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';

import Dropdown from '../index';

const OVERLAY_ID = 'OVERLAY_ID'
const OVERLAY_TEXT = 'OVERLAY_TEXT'
const OVERLAY_CONTENT = <div data-testid={OVERLAY_ID}>{OVERLAY_TEXT}</div>;

describe('Dropdown', () => {
  it('should render', () => {
    
    const BUTTON_TEXT = 'button text';
    renderWithProvider(
      <Dropdown overlay={OVERLAY_CONTENT} trigger={['click']}>
        <button>{BUTTON_TEXT}</button>
      </Dropdown>,
    );

    fireEvent.click(screen.getByText(BUTTON_TEXT));

    expect(screen.getByText(OVERLAY_TEXT)).toBeTruthy();
  });

  it.skip('by default should open in [data-popup-container]', async () => {
    const { container } = renderWithProvider(
      <div data-popup-container>
        <Dropdown
          overlay={OVERLAY_CONTENT}
          trigger={['click']}
          open={true}
        >
          <button />
        </Dropdown>
      </div>,
    );

    await screen.findByText(OVERLAY_TEXT);
    
    expect(within(container).getByTestId(OVERLAY_ID)).toBeTruthy();
  });

  it('if no [data-popup-container] open in body', async () => {
    const { container } = renderWithProvider(
      <div>
        <Dropdown
          overlay={OVERLAY_CONTENT}
          trigger={['click']}
          open={true}
        >
          <button />
        </Dropdown>
      </div>,
    );

    await screen.findByText(OVERLAY_TEXT);

    expect(within(container).queryByTestId(OVERLAY_ID)).toBeFalsy();
    expect(within(document.body).getByTestId(OVERLAY_ID)).toBeTruthy();
  });

  describe('Dropdown.SearchInput', () => {
    it('should handle input', () => {
      const onSearchChange = vi.fn();
      const PLACEHOLDER = 'Placeholder';
      const TEST_INPUT = 'Test input';
      const { getByPlaceholderText } = renderWithProvider(
        <Dropdown.SearchInput
          onSearchChange={onSearchChange}
          placeholder={PLACEHOLDER}
          value=""
        />,
      );

      const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

      fireEvent.change(input, { target: { value: TEST_INPUT } });

      expect(onSearchChange).toHaveBeenCalledWith(TEST_INPUT);
    });
  });

  describe('Dropdown.BottomAction', () => {
    it('should handle action', () => {
      const onClickAction = vi.fn();
      const ACTION_TEXT = 'Action';
      const { getByText } = renderWithProvider(
        <Dropdown.BottomAction onClickAction={onClickAction}>
          {ACTION_TEXT}
        </Dropdown.BottomAction>,
      );

        fireEvent.click(getByText(ACTION_TEXT));

      expect(onClickAction).toHaveBeenCalled();
    });
  });

  describe('closeAllOverlays', () => {
    const BUTTON_TEXT = 'button text';

    it('closes an open dropdown', async () => {
      renderWithProvider(
        <Dropdown overlay={OVERLAY_CONTENT} trigger={['click']}>
          <button>{BUTTON_TEXT}</button>
        </Dropdown>,
      );
      fireEvent.click(screen.getByText(BUTTON_TEXT));
      expect(screen.getByText(OVERLAY_TEXT)).toBeTruthy();

      await act(async () => {
        await closeAllOverlays();
      });

      await waitFor(() =>
        expect(screen.queryByText(OVERLAY_TEXT)).not.toBeInTheDocument(),
      );
    });

    it('notifies the consumer via onOpenChange', async () => {
      // `useDropdownVisibility` throttles onOpenChange with a skipDuplicates
      // ref, so assert the programmatic close still reaches the consumer.
      const onOpenChange = vi.fn();
      renderWithProvider(
        <Dropdown
          overlay={OVERLAY_CONTENT}
          trigger={['click']}
          onOpenChange={onOpenChange}
        >
          <button>{BUTTON_TEXT}</button>
        </Dropdown>,
      );
      fireEvent.click(screen.getByText(BUTTON_TEXT));
      onOpenChange.mockClear();

      await act(async () => {
        await closeAllOverlays();
      });

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('is targetable as the dropdown kind', async () => {
      renderWithProvider(
        <Dropdown overlay={OVERLAY_CONTENT} trigger={['click']}>
          <button>{BUTTON_TEXT}</button>
        </Dropdown>,
      );
      fireEvent.click(screen.getByText(BUTTON_TEXT));

      await act(async () => {
        await closeAllOverlays({ kinds: ['modal'] });
      });
      expect(screen.getByText(OVERLAY_TEXT)).toBeTruthy();

      await act(async () => {
        await closeAllOverlays({ kinds: ['dropdown'] });
      });
      await waitFor(() =>
        expect(screen.queryByText(OVERLAY_TEXT)).not.toBeInTheDocument(),
      );
    });
  });
});
