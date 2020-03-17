import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import Autocomplete from '../index';

const { Option } = Autocomplete;
const FIRST_OPTION = 'First option';
const LABEL = 'label';
const DESC = 'desc';
const ERROR = 'error';
const RED = 'red';

const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 500 })
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 })
})

afterAll(() => {
  originalOffsetHeight && Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
  originalOffsetWidth && Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
})


describe('Autocomplete', () => {
  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <Autocomplete open value="first" label={LABEL} description={DESC} errorText={ERROR}>
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>
    );

    // ASSERT
    expect(getByText(FIRST_OPTION)).toBeTruthy();
    expect(getByText(LABEL)).toBeTruthy();
    expect(getByText(DESC)).toBeTruthy();
    expect(getByText(ERROR)).toBeTruthy();
  });

  it('call on Change', () => {
    // ARRANGE
    const options = ['red', 'green', 'blue'];
    const onChange = jest.fn();

    const C = renderWithProvider(
      <Autocomplete value="red" onChange={onChange}>
        {options.map(o => (
          <Option key={o} value={o}>{o}</Option>
        ))}
      </Autocomplete>
    );
    C.debug()
    const input = document.querySelector('.ant-select-selection-search-input') as HTMLInputElement;

    // ACT
    fireEvent.change(input, { target: { value: 'test' } });
    const liBlue = document.querySelector('.ant-select-item-option:last-child') as HTMLInputElement;
    fireEvent.click(liBlue);
    // ASSERT
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('should clear input value', async () => {
    // ARRANGE
    const options = ['red', 'green', 'blue'];

    renderWithProvider(
      <Autocomplete allowClear>
        {options.map(o => (
          <Option key={o} value={o}>{o}</Option>
        ))}
      </Autocomplete>
    );
    const input = document.querySelector('.ant-select-selection-search-input') as HTMLInputElement;

    // ACT
    fireEvent.change(input, { target: { value: RED } });

    // ASSERT
    expect(input.value).toBe(RED);

    const clearBtn = document.querySelector('.ant-select-clear span') as HTMLInputElement;
    // ACT
    fireEvent.click(clearBtn);
    // ASSERT
    expect(clearBtn).toBeTruthy();
  });
});
