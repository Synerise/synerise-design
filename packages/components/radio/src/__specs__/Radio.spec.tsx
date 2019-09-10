import * as React from 'react';
import { fireEvent, render } from "@testing-library/react";
import Radio from '../index';

describe('Radio', () => {
  it('should render', () => {
    // ARRANGE
    const RADIO_LABEL = 'Radio label';
    const { getByText } = render(<Radio>{RADIO_LABEL}</Radio>);

    // ASSERT
    getByText(RADIO_LABEL);
  });

  describe('Radio Group', () => {
    it('should trigger onChange event', () => {
      // ARRANGE
      const onChange = jest.fn();
      const TEST_LABEL = "B";
      const TEST_VALUE = "b";

      const { getByLabelText } = render(
        <Radio.Group buttonStyle="solid" defaultValue="a" onChange={onChange}>
          <Radio.Button value="a">A</Radio.Button>
          <Radio.Button value={TEST_VALUE}>{TEST_LABEL}</Radio.Button>
          <Radio.Button value="c">C</Radio.Button>
        </Radio.Group>
      );

      // ACT
      fireEvent.click(getByLabelText(TEST_LABEL));

      // ASSERT
      expect(onChange).toBeCalled();
      expect(onChange).toBeCalledWith(
        expect.objectContaining({ target: expect.objectContaining({ value: TEST_VALUE }) })
      );
    });
  });
});