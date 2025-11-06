import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, within } from '@testing-library/react';

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
      const onSearchChange = jest.fn();
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
      const onClickAction = jest.fn();
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
});
