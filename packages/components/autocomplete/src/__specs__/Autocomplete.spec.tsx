import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import Autocomplete from '../index';

const { Option } = Autocomplete;
const FIRST_OPTION = 'First option';
const LABEL = 'label';
const DESC = 'desc';
const ERROR = 'error';
const RED = 'red';
const COLORS = ['red', 'green', 'blue'];

const originalOffsetHeight = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetHeight',
);
const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'offsetWidth',
);

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    configurable: true,
    value: 500,
  });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    configurable: true,
    value: 500,
  });
});

afterAll(() => {
  originalOffsetHeight &&
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetHeight',
      originalOffsetHeight,
    );
  originalOffsetWidth &&
    Object.defineProperty(
      HTMLElement.prototype,
      'offsetWidth',
      originalOffsetWidth,
    );
});

describe('Autocomplete', () => {
  it('should render label, description and error', () => {
    renderWithProvider(
      <Autocomplete
        open
        value="first"
        label={LABEL}
        description={DESC}
        errorText={ERROR}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );

    expect(screen.getByText(LABEL)).toBeTruthy();
    expect(screen.getByText(DESC)).toBeTruthy();
    expect(screen.getByText(ERROR)).toBeTruthy();
    expect(screen.getByRole('combobox')).toBeTruthy();
  });

  it('should render options from Option children when open', () => {
    renderWithProvider(
      <Autocomplete open value="">
        {COLORS.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Autocomplete>,
    );

    const options = screen.getAllByTestId('autocomplete-option');
    expect(options).toHaveLength(COLORS.length);
  });

  it('should open dropdown on input focus', () => {
    const onDropdownVisibleChange = vi.fn();
    renderWithProvider(
      <Autocomplete
        onDropdownVisibleChange={onDropdownVisibleChange}
        value="first"
        label={LABEL}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
  });

  it('should open the dropdown when the input is clicked', () => {
    const onDropdownVisibleChange = vi.fn();
    renderWithProvider(
      <Autocomplete
        onDropdownVisibleChange={onDropdownVisibleChange}
        value="first"
        label={LABEL}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.click(input);
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true);
  });

  it('should not toggle the dropdown shut when clicking an already-open input', () => {
    const onDropdownVisibleChange = vi.fn();
    renderWithProvider(
      <Autocomplete
        onDropdownVisibleChange={onDropdownVisibleChange}
        value="first"
        label={LABEL}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');
    // Focus opens the dropdown; the click that accompanies it (or a later click
    // on the focused input) must not toggle it closed — this was the open/close
    // flicker on re-click.
    fireEvent.focus(input);
    onDropdownVisibleChange.mockClear();
    fireEvent.click(input);
    expect(onDropdownVisibleChange).not.toHaveBeenCalledWith(false);
  });

  it('should render readonly and not open the dropdown', () => {
    const onDropdownVisibleChange = vi.fn();
    renderWithProvider(
      <Autocomplete
        onDropdownVisibleChange={onDropdownVisibleChange}
        readOnly
        value="first"
        label={LABEL}
      >
        <Option value="first">{FIRST_OPTION}</Option>
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');
    expect(input).toBeDisabled();
    fireEvent.focus(input);
    expect(onDropdownVisibleChange).not.toHaveBeenCalled();
  });

  it('should call onSearch and onChange on keystroke', () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();

    renderWithProvider(
      <Autocomplete value="red" onChange={onChange} onSearch={onSearch}>
        {COLORS.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Autocomplete>,
    );
    const input = screen.getByRole('combobox');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(onSearch).toHaveBeenCalledWith('test');
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('should call onSelect and onChange when an option is clicked', () => {
    const onChange = vi.fn();
    const onSelect = vi.fn();

    renderWithProvider(
      <Autocomplete open value="" onChange={onChange} onSelect={onSelect}>
        {COLORS.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Autocomplete>,
    );

    const lastOption = screen.getAllByTestId('autocomplete-option').pop();
    fireEvent.click(lastOption as HTMLElement);
    expect(onSelect).toHaveBeenCalledWith('blue');
    expect(onChange).toHaveBeenCalledWith('blue');
  });

  it('should clear input value when the clear button is clicked', () => {
    const onChange = vi.fn();

    renderWithProvider(
      <Autocomplete allowClear value={RED} onChange={onChange}>
        {COLORS.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Autocomplete>,
    );

    const clearBtn = screen.getByTestId('autocomplete-clear');
    expect(clearBtn).toBeTruthy();
    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('should render the placeholder', () => {
    renderWithProvider(<Autocomplete placeholder="type here" />);
    expect(screen.getByPlaceholderText('type here')).toBeTruthy();
  });

  it('should render notFoundContent when there are no options', () => {
    renderWithProvider(
      <Autocomplete open value="" notFoundContent="No data" options={[]} />,
    );
    expect(screen.getByTestId('autocomplete-not-found')).toHaveTextContent(
      'No data',
    );
  });
});
