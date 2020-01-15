import * as React from 'react';
import { renderWithProvider } from "@synerise/ds-utils";
import { fireEvent } from "@testing-library/react";
import Dropdown from '../index';

describe('Dropdown', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_TEXT = 'test text';
    const BUTTON_TEXT = 'button text';
    const { getByText } = renderWithProvider(<Dropdown overlay={<div>{TEST_TEXT}</div>} trigger={['click']}><button>{BUTTON_TEXT}</button></Dropdown>);

    // ACT
    fireEvent.click(getByText(BUTTON_TEXT));

    // ASSERT
    expect(getByText(TEST_TEXT)).toBeTruthy();
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
        />
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
        <Dropdown.BottomAction
          onClickAction={onClickAction}
        >
          {ACTION_TEXT}
        </Dropdown.BottomAction>
      );

      // ACT
      fireEvent.click(getByText(ACTION_TEXT));

      // ASSERT
      expect(onClickAction).toHaveBeenCalled();
    });
  });
});
