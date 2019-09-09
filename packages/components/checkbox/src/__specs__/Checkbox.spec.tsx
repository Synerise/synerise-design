import * as React from 'react';
import { fireEvent, render } from "@testing-library/react";
import Checkbox from '../index';

describe('Checkbox', () => {
  const CHECKBOX_LABEL = 'Checkbox Label';
  const onChange = jest.fn();

  it('clicking input should trigger onChange event', () => {
    // ARRANGE
    const { getByLabelText } = render(<Checkbox onChange={onChange}>{CHECKBOX_LABEL}</Checkbox>);

    // ACT
    fireEvent.click(getByLabelText(CHECKBOX_LABEL));

    // ASSERT
    expect(onChange).toBeCalled();
  });

  it('should render', () => {
    // ARRANGE
    const { getByText } = render(<Checkbox onChange={onChange}>{CHECKBOX_LABEL}</Checkbox>);

    // ASSERT
    getByText(CHECKBOX_LABEL);
  });
});
