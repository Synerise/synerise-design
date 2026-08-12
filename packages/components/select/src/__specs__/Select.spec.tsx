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

  it('keeps the search input editable over the selected label (showSearch + value)', () => {
    renderWithProvider(
      <Select
        showSearch
        value="a"
        placeholder="Pick"
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
        ]}
      />,
    );

    // The selected label and the (overlaid) search input coexist.
    expect(document.querySelector('.ds-select-selection-item')?.textContent).toBe('Apple');
    const input = document.querySelector('.ds-select-search') as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.readOnly).toBe(false);

    // Typing a query hides the label so only the query text remains.
    fireEvent.change(input, { target: { value: 'ban' } });
    expect(document.querySelector('.ds-select-selection-item')).toBeNull();
  });

  it('blurs the search input after selecting an option (single-select showSearch)', () => {
    renderWithProvider(
      <Select
        showSearch
        defaultOpen
        placeholder="Pick"
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
        ]}
      />,
    );

    const input = document.querySelector('.ds-select-search') as HTMLInputElement;
    input.focus();
    expect(document.activeElement).toBe(input);

    // Highlight an option and commit it — the input should lose focus.
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(document.activeElement).not.toBe(input);
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

describe('Select (antd parity shims)', () => {
  it('falls back to the React key when an Option value is omitted', () => {
    renderWithProvider(
      <Select value="lucy">
        <Option key="lucy">Lucy</Option>
        <Option key="jack">Jack</Option>
      </Select>,
    );

    expect(
      document.querySelector('.ds-select-selection-item')?.textContent,
    ).toBe('Lucy');
  });

  it('fires onClear when the clear control is used', () => {
    const onClear = vi.fn();
    renderWithProvider(
      <Select
        allowClear
        value="lucy"
        onClear={onClear}
        options={[{ value: 'lucy', label: 'Lucy' }]}
      />,
    );

    fireEvent.click(document.querySelector('.ds-select-clear') as Element);
    expect(onClear).toHaveBeenCalled();
  });

  it('exposes option.key in the onChange option payload', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <Select defaultOpen onChange={onChange}>
        <Option value="a">Apple</Option>
        <Option value="b">Banana</Option>
      </Select>,
    );

    const combobox = document.querySelector('.ds-select') as Element;
    fireEvent.keyDown(combobox, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(
      'a',
      expect.objectContaining({ key: 'a' }),
    );
  });

  it('uses a controlled searchValue for the input', () => {
    renderWithProvider(
      <Select
        showSearch
        searchValue="ban"
        placeholder="Pick"
        options={[{ value: 'b', label: 'Banana' }]}
      />,
    );

    const input = document.querySelector(
      '.ds-select-search',
    ) as HTMLInputElement;
    expect(input.value).toBe('ban');
  });

  it('accepts a numeric dropdownMatchSelectWidth without error', () => {
    renderWithProvider(
      <Select
        defaultOpen
        dropdownMatchSelectWidth={200}
        options={[{ value: 'a', label: 'Apple' }]}
      />,
    );

    expect(document.querySelector('.ds-select')).toBeTruthy();
  });

  it('forwards data-* / aria-* attributes to the select root', () => {
    renderWithProvider(
      <Select
        data-testid="my-select"
        aria-label="pick one"
        options={[{ value: 'a', label: 'Apple' }]}
        placeholder="Pick"
      />,
    );

    const root = screen.getByTestId('my-select');
    expect(root).toBeTruthy();
    expect(root.getAttribute('aria-label')).toBe('pick one');
  });

  it('renders Option children in the dropdown row and `label` in the selector (optionLabelProp)', () => {
    renderWithProvider(
      <Select defaultOpen value="+48" optionLabelProp="label">
        <Option value="+48" label={<span>flag +48</span>}>
          Poland (+48)
        </Option>
      </Select>,
    );

    expect(
      document.querySelector('.ds-select-selection-item')?.textContent,
    ).toBe('flag +48');
    expect(
      document.querySelector('.ds-select-item-option')?.textContent,
    ).toContain('Poland (+48)');
  });

  it('filters on the field named by optionFilterProp', () => {
    renderWithProvider(
      <Select defaultOpen showSearch optionFilterProp="title">
        <Option value="+48" title="Poland" label={<span>flag +48</span>}>
          Poland (+48)
        </Option>
        <Option value="+49" title="Germany" label={<span>flag +49</span>}>
          Germany (+49)
        </Option>
      </Select>,
    );

    fireEvent.change(document.querySelector('.ds-select-search') as Element, {
      target: { value: 'pol' },
    });

    const rows = document.querySelectorAll('.ds-select-item-option');
    expect(rows).toHaveLength(1);
    expect(rows[0].textContent).toContain('Poland (+48)');
  });

  it('forwards per-option data-* / aria-* to the rendered option row', () => {
    renderWithProvider(
      <Select defaultOpen>
        <Option value="a" data-testid="opt-a">
          Apple
        </Option>
        <Option value="b" data-testid="opt-b">
          Banana
        </Option>
      </Select>,
    );

    const optA = screen.getByTestId('opt-a');
    expect(optA).toBeTruthy();
    expect(optA.getAttribute('role')).toBe('option');
    expect(screen.getByTestId('opt-b')).toBeTruthy();
  });
});

describe('Select (focus / blur)', () => {
  const OPTIONS = [
    { value: 'a', label: 'Apple' },
    { value: 'b', label: 'Banana' },
  ];

  it('autoFocuses the selector in select-only mode', () => {
    renderWithProvider(<Select autoFocus options={OPTIONS} placeholder="Pick" />);

    expect(document.activeElement).toBe(document.querySelector('.ds-select'));
  });

  it('fires onBlur when focus leaves the select', () => {
    const onBlur = vi.fn();
    renderWithProvider(
      <Select options={OPTIONS} onBlur={onBlur} placeholder="Pick" />,
    );

    const wrapper = document.querySelector('.ds-select-wrapper') as Element;
    fireEvent.focusOut(wrapper, { relatedTarget: document.body });

    expect(onBlur).toHaveBeenCalled();
  });

  it('does not fire onBlur when focus moves within the select', () => {
    const onBlur = vi.fn();
    renderWithProvider(
      <Select showSearch options={OPTIONS} onBlur={onBlur} placeholder="Pick" />,
    );

    const wrapper = document.querySelector('.ds-select-wrapper') as Element;
    const input = document.querySelector('.ds-select-search') as Element;
    fireEvent.focusOut(wrapper, { relatedTarget: input });

    expect(onBlur).not.toHaveBeenCalled();
  });

  it('fires onFocus when focus enters the select', () => {
    const onFocus = vi.fn();
    renderWithProvider(
      <Select options={OPTIONS} onFocus={onFocus} placeholder="Pick" />,
    );

    const wrapper = document.querySelector('.ds-select-wrapper') as Element;
    fireEvent.focusIn(wrapper, { relatedTarget: document.body });

    expect(onFocus).toHaveBeenCalled();
  });
});

describe('Select (tag display limits)', () => {
  const OPTIONS = [
    { value: 'a', label: 'Apple' },
    { value: 'b', label: 'Banana' },
    { value: 'c', label: 'Cherry' },
  ];

  it('collapses chips beyond maxTagCount into a "+N" overflow chip', () => {
    renderWithProvider(
      <Select
        mode="multiple"
        value={['a', 'b', 'c']}
        maxTagCount={1}
        options={OPTIONS}
      />,
    );

    expect(
      document.querySelectorAll('.ds-select-selection-item'),
    ).toHaveLength(1);
    expect(screen.getByTestId('select-tag-overflow').textContent).toBe('+ 2');
  });

  it('renders no overflow chip when the count is within maxTagCount', () => {
    renderWithProvider(
      <Select
        mode="multiple"
        value={['a']}
        maxTagCount={3}
        options={OPTIONS}
      />,
    );

    expect(
      document.querySelectorAll('.ds-select-selection-item'),
    ).toHaveLength(1);
    expect(screen.queryByTestId('select-tag-overflow')).toBeNull();
  });

  it('renders a custom maxTagPlaceholder node for the overflow chip', () => {
    renderWithProvider(
      <Select
        mode="multiple"
        value={['a', 'b', 'c']}
        maxTagCount={1}
        maxTagPlaceholder="+2 more"
        options={OPTIONS}
      />,
    );

    expect(screen.getByTestId('select-tag-overflow').textContent).toBe(
      '+2 more',
    );
  });

  it('passes the omitted options to a maxTagPlaceholder render function', () => {
    renderWithProvider(
      <Select
        mode="multiple"
        value={['a', 'b', 'c']}
        maxTagCount={1}
        maxTagPlaceholder={(omitted) => `and ${omitted.length} more`}
        options={OPTIONS}
      />,
    );

    expect(screen.getByTestId('select-tag-overflow').textContent).toBe(
      'and 2 more',
    );
  });

  it('truncates chip labels longer than maxTagTextLength', () => {
    renderWithProvider(
      <Select
        mode="multiple"
        value={['b']}
        maxTagTextLength={3}
        options={OPTIONS}
      />,
    );

    expect(
      document.querySelector('.ds-select-selection-item-label')?.textContent,
    ).toBe('Ban...');
  });
});

describe('Select (onPopupScroll)', () => {
  it('fires onPopupScroll as the open option list scrolls', () => {
    const onPopupScroll = vi.fn();
    renderWithProvider(
      <Select
        defaultOpen
        onPopupScroll={onPopupScroll}
        options={[
          { value: 'a', label: 'Apple' },
          { value: 'b', label: 'Banana' },
        ]}
      />,
    );

    const scrollContainer = document.querySelector(
      '.perfect-scrollbar-wrapper',
    ) as Element;
    expect(scrollContainer).toBeTruthy();

    fireEvent.scroll(scrollContainer);
    expect(onPopupScroll).toHaveBeenCalled();
  });
});
