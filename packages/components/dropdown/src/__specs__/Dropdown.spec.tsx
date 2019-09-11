import * as React from 'react';
import { fireEvent, render } from "@testing-library/react";
import Dropdown from '../index';

describe('Dropdown', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_TEXT = 'test text';
    const BUTTON_TEXT = 'button text';
    const { getByText } = render(<Dropdown overlay={<div>{TEST_TEXT}</div>} trigger={['click']}><button>{BUTTON_TEXT}</button></Dropdown>);

    // ACT
    fireEvent.click(getByText(BUTTON_TEXT));

    // ASSERT
    expect(getByText(TEST_TEXT)).toBeTruthy();
  });
});
