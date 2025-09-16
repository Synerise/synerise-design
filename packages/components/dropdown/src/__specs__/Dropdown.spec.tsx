import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, waitFor } from '@testing-library/react';

import Dropdown from '../index';

describe('Dropdown', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_TEXT = 'test text';
    const BUTTON_TEXT = 'button text';
    const { getByText } = renderWithProvider(
      <Dropdown overlay={<div>{TEST_TEXT}</div>} trigger={['click']}>
        <button>{BUTTON_TEXT}</button>
      </Dropdown>,
    );

    // ACT
    fireEvent.click(getByText(BUTTON_TEXT));

    // ASSERT
    expect(getByText(TEST_TEXT)).toBeTruthy();
  });

  it('by default should open in [data-popup-container]', async () => {
    const { container, getByText } = renderWithProvider(
      <div data-popup-container>
        <Dropdown
          overlay={<p>dropdown content</p>}
          trigger={['click']}
          visible={true}
        >
          <button />
        </Dropdown>
      </div>,
    );

    // make sure the dropdown is already opened before assertion
    await waitFor(() => getByText('dropdown content'));

    expect(container.querySelector('.ant-dropdown')).toBeTruthy();
  });

  it('if no [data-popup-container] open in body', async () => {
    const { container, getByText } = renderWithProvider(
      <div>
        <Dropdown
          overlay={<p>dropdown content</p>}
          trigger={['click']}
          visible={true}
        >
          <button />
        </Dropdown>
      </div>,
    );

    // make sure the dropdown is already opened before assertion
    await waitFor(() => getByText('dropdown content'));

    expect(container.querySelector('.ant-dropdown')).toBeFalsy();
    expect(document.body.querySelector('.ant-dropdown')).toBeTruthy();
  });

  describe('Dropdown.SearchInput', () => {
    it('should handle input', () => {
      // ARRANGE
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

      // ACT
      fireEvent.change(input, { target: { value: TEST_INPUT } });

      // ASSERT
      expect(onSearchChange).toHaveBeenCalledWith(TEST_INPUT);
    });
  });

  describe('Dropdown.BottomAction', () => {
    it('should handle action', () => {
      // ARRANGE
      const onClickAction = jest.fn();
      const ACTION_TEXT = 'Action';
      const { getByText } = renderWithProvider(
        <Dropdown.BottomAction onClickAction={onClickAction}>
          {ACTION_TEXT}
        </Dropdown.BottomAction>,
      );

      // ACT
      fireEvent.click(getByText(ACTION_TEXT));

      // ASSERT
      expect(onClickAction).toHaveBeenCalled();
    });
  });
});
