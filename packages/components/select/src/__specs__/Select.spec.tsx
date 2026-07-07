import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen } from '@testing-library/react';

import Select from '../Select';

const { Option } = Select;

describe('Select (DS-native, single-select)', () => {
  it('renders the placeholder when there is no value', () => {
    renderWithProvider(<Select placeholder="Pick one" />);

    expect(screen.getByText('Pick one')).toBeTruthy();
  });

  it('renders the selected label from a controlled value (options prop)', () => {
    renderWithProvider(
      <Select
        value="lucy"
        options={[
          { value: 'lucy', label: 'Lucy' },
          { value: 'jack', label: 'Jack' },
        ]}
      />,
    );

    const selection = document.querySelector('.ds-select-selection-item');
    expect(selection?.textContent).toBe('Lucy');
  });

  it('resolves the selected label from <Select.Option> children', () => {
    renderWithProvider(
      <Select value="lucy">
        <Option value="lucy">Lucy</Option>
        <Option value="jack">Jack</Option>
      </Select>,
    );

    expect(
      document.querySelector('.ds-select-selection-item')?.textContent,
    ).toBe('Lucy');
  });

  it('renders label, description and errorText (FormField chrome)', () => {
    renderWithProvider(
      <Select
        label="Owner"
        description="Choose the owner"
        errorText="Required"
        placeholder="Pick"
      />,
    );

    expect(screen.getByText('Owner')).toBeTruthy();
    expect(screen.getByText('Choose the owner')).toBeTruthy();
    expect(screen.getByText('Required')).toBeTruthy();
  });

  it('shows a clear control when allowClear + value, and clears on click', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <Select
        allowClear
        value="lucy"
        onChange={onChange}
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />,
    );

    const clear = document.querySelector('.ds-select-clear');
    expect(clear).toBeTruthy();

    fireEvent.click(clear as Element);
    expect(onChange).toHaveBeenCalledWith(undefined, undefined);
  });

  it('renders the arrow (no clear) when there is no value', () => {
    renderWithProvider(<Select allowClear placeholder="Pick" />);

    expect(document.querySelector('.ds-select-arrow')).toBeTruthy();
    expect(document.querySelector('.ds-select-clear')).toBeNull();
  });
});
