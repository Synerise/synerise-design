import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    renderWithProvider(
      <Autocomplete open value="first" label={LABEL} description={DESC} errorText={ERROR}>
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>
    );

    expect(screen.getByText(LABEL)).toBeTruthy();
    expect(screen.getByText(DESC)).toBeTruthy();
    expect(screen.getByText(ERROR)).toBeTruthy();
  });

  it('should open dropdown on input click', () => {
    const onDropdownVisibleChange = jest.fn();
    renderWithProvider(
      <Autocomplete onDropdownVisibleChange={onDropdownVisibleChange} value="first" label={LABEL} description={DESC} errorText={ERROR}>
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>
    );
    const input = screen.getByRole('combobox');
    userEvent.click(input);
    expect(onDropdownVisibleChange).toHaveBeenCalled();
  });

  it('should render readonly', () => {
    const onDropdownVisibleChange = jest.fn();
    renderWithProvider(
      <Autocomplete onDropdownVisibleChange={onDropdownVisibleChange} readOnly value="first" label={LABEL} description={DESC} errorText={ERROR}>
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>
    );
    const input = screen.getByRole('combobox');
    expect(input).toBeDisabled();
    userEvent.click(input);
    expect(onDropdownVisibleChange).not.toHaveBeenCalled()
  });

  it('call on Change', () => {
    const options = ['red', 'green', 'blue'];
    const onChange = jest.fn();
    
    renderWithProvider(
      <Autocomplete value="red" onChange={onChange}>
        {options.map(o => (
          <Option key={o} value={o}>{o}</Option>
        ))}
      </Autocomplete>
    );
    const input = document.querySelector('.ant-select-selection-search-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    const liBlue = document.querySelector('.ant-select-item-option:last-child') as HTMLInputElement;
    fireEvent.click(liBlue);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('should clear input value', async () => {
    const options = ['red', 'green', 'blue'];

    renderWithProvider(
      <Autocomplete allowClear>
        {options.map(o => (
          <Option key={o} value={o}>{o}</Option>
        ))}
      </Autocomplete>
    );
    const input = document.querySelector('.ant-select-selection-search-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: RED } });

    expect(input.value).toBe(RED);

    const clearBtn = document.querySelector('.ant-select-clear span') as HTMLInputElement;
    fireEvent.click(clearBtn);
    expect(clearBtn).toBeTruthy();
  });
});
