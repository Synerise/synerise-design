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

  it('renders a removable chip per value in multiple mode', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <Select
        mode="multiple"
        value={['a', 'b']}
        onChange={onChange}
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
        ]}
      />,
    );

    const chips = document.querySelectorAll('.ds-select-selection-item');
    expect(chips).toHaveLength(2);
    expect(chips[0].textContent).toContain('Apple');

    const remove = document.querySelector('.ds-select-selection-item-remove');
    fireEvent.mouseDown(remove as Element);
    expect(onChange).toHaveBeenCalledWith(['b'], expect.anything());
  });

  it('renders an in-selector search input when showSearch is set', () => {
    renderWithProvider(
      <Select showSearch placeholder="Pick" options={[{ value: 'a', label: 'A' }]} />,
    );

    expect(document.querySelector('.ds-select-search')).toBeTruthy();
  });
});

describe('Select (keyboard + ARIA)', () => {
  const OPTIONS = [
    { value: 'a', label: 'Apple' },
    { value: 'b', label: 'Banana' },
    { value: 'c', label: 'Cherry' },
  ];

  it('marks the select-only trigger as a combobox with a listbox popup', () => {
    renderWithProvider(<Select options={OPTIONS} placeholder="Pick" />);

    const combobox = document.querySelector('.ds-select') as Element;
    expect(combobox.getAttribute('role')).toBe('combobox');
    expect(combobox.getAttribute('aria-haspopup')).toBe('listbox');
    expect(combobox.getAttribute('aria-expanded')).toBe('false');
    expect(combobox.getAttribute('tabindex')).toBe('0');
  });

  it('opens on ArrowDown and closes on Escape', () => {
    renderWithProvider(<Select options={OPTIONS} placeholder="Pick" />);

    const combobox = document.querySelector('.ds-select') as Element;
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    expect(combobox.getAttribute('aria-expanded')).toBe('true');

    fireEvent.keyDown(combobox, { key: 'Escape' });
    expect(combobox.getAttribute('aria-expanded')).toBe('false');
  });

  it('highlights with ArrowDown and selects the active option on Enter', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <Select defaultOpen options={OPTIONS} onChange={onChange} />,
    );

    const combobox = document.querySelector('.ds-select') as Element;
    // Opens highlighting the first option (Apple); move to the second (Banana).
    fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    fireEvent.keyDown(combobox, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith('b', expect.anything());
  });
});
