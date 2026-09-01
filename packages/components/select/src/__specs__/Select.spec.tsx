import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { act, fireEvent, screen } from '@testing-library/react';

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
      <Select
        showSearch
        placeholder="Pick"
        options={[{ value: 'a', label: 'A' }]}
      />,
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
    expect(
      document.querySelector('.ds-select-selection-item')?.textContent,
    ).toBe('Apple');
    const input = document.querySelector(
      '.ds-select-search',
    ) as HTMLInputElement;
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

    const input = document.querySelector(
      '.ds-select-search',
    ) as HTMLInputElement;
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
    renderWithProvider(
      <Select autoFocus options={OPTIONS} placeholder="Pick" />,
    );

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
      <Select
        showSearch
        options={OPTIONS}
        onBlur={onBlur}
        placeholder="Pick"
      />,
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

    expect(document.querySelectorAll('.ds-select-selection-item')).toHaveLength(
      1,
    );
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

    expect(document.querySelectorAll('.ds-select-selection-item')).toHaveLength(
      1,
    );
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

describe('Select (maxTagCount="responsive")', () => {
  const OPTIONS = [
    { value: 'a', label: 'Apple' },
    { value: 'b', label: 'Banana' },
    { value: 'c', label: 'Cherry' },
    { value: 'd', label: 'Damson' },
  ];
  const ALL = ['a', 'b', 'c', 'd'];
  // Chip 80 + gap 4, overflow chip 40, caret reserve 30 — see useResponsiveTagCount.
  const CHIP_WIDTH = 80;
  const OVERFLOW_WIDTH = 40;
  // A label the width stub reports as narrow, to vary chip widths within a test.
  const NARROW_LABEL = 'Narrow';
  const NARROW_CHIP_WIDTH = 10;

  let areaWidth = 0;
  let resizeCallbacks: Array<() => void> = [];
  let restoreLayout: Array<() => void> = [];

  // jsdom has no layout engine: fake exactly the two boxes the fit calculation reads.
  const overrideLayoutProp = (
    prop: 'clientWidth' | 'offsetWidth',
    get: (this: HTMLElement) => number,
  ): void => {
    const original = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      prop,
    );
    Object.defineProperty(HTMLElement.prototype, prop, {
      configurable: true,
      get,
    });
    restoreLayout.push(() => {
      if (original) {
        Object.defineProperty(HTMLElement.prototype, prop, original);
      } else {
        delete (HTMLElement.prototype as unknown as Record<string, unknown>)[
          prop
        ];
      }
    });
  };

  const visibleChips = (): NodeListOf<Element> =>
    document.querySelectorAll('.ds-select-selection-item');

  const resizeTo = (width: number): void => {
    areaWidth = width;
    act(() => {
      resizeCallbacks.forEach((callback) => callback());
    });
  };

  beforeEach(() => {
    areaWidth = 400;
    resizeCallbacks = [];
    restoreLayout = [];

    overrideLayoutProp('clientWidth', function clientWidth(this: HTMLElement) {
      return this.classList.contains('ds-select-selection-list')
        ? areaWidth
        : 0;
    });
    overrideLayoutProp('offsetWidth', function offsetWidth(this: HTMLElement) {
      if (this.hasAttribute('data-measure-overflow')) {
        return OVERFLOW_WIDTH;
      }
      if (!this.hasAttribute('data-measure-chip')) {
        return 0;
      }
      return this.textContent === NARROW_LABEL ? NARROW_CHIP_WIDTH : CHIP_WIDTH;
    });

    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          resizeCallbacks.push(callback);
        }

        observe = vi.fn();

        unobserve = vi.fn();

        disconnect = vi.fn();
      },
    );
  });

  afterEach(() => {
    restoreLayout.forEach((restore) => restore());
    vi.unstubAllGlobals();
  });

  it('renders every chip when they all fit on one line', () => {
    renderWithProvider(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        options={OPTIONS}
      />,
    );

    expect(visibleChips()).toHaveLength(4);
    expect(screen.queryByTestId('select-tag-overflow')).toBeNull();
  });

  it('collapses the chips that do not fit into the "+N" overflow chip', () => {
    areaWidth = 200;
    renderWithProvider(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        options={OPTIONS}
      />,
    );

    expect(visibleChips()).toHaveLength(1);
    expect(screen.getByTestId('select-tag-overflow').textContent).toBe('+ 3');
  });

  it('recomputes the visible chip count when the selector is resized', () => {
    areaWidth = 200;
    renderWithProvider(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        options={OPTIONS}
      />,
    );
    expect(visibleChips()).toHaveLength(1);

    resizeTo(400);
    expect(visibleChips()).toHaveLength(4);
    expect(screen.queryByTestId('select-tag-overflow')).toBeNull();

    resizeTo(120);
    expect(visibleChips()).toHaveLength(0);
    expect(screen.getByTestId('select-tag-overflow').textContent).toBe('+ 4');
  });

  it('shows only the overflow chip when the selector is too narrow for any chip', () => {
    areaWidth = 60;
    renderWithProvider(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        options={OPTIONS}
      />,
    );

    expect(visibleChips()).toHaveLength(0);
    expect(screen.getByTestId('select-tag-overflow').textContent).toBe('+ 4');
  });

  it('keeps a lone oversized chip instead of collapsing it into "+ 1"', () => {
    areaWidth = 60;
    renderWithProvider(
      <Select
        mode="multiple"
        value={['a']}
        maxTagCount="responsive"
        options={OPTIONS}
      />,
    );

    expect(visibleChips()).toHaveLength(1);
    expect(screen.queryByTestId('select-tag-overflow')).toBeNull();
  });

  it('renders nothing but the placeholder when no value is selected', () => {
    areaWidth = 60;
    renderWithProvider(
      <Select
        mode="multiple"
        value={[]}
        maxTagCount="responsive"
        placeholder="Pick some"
        options={OPTIONS}
      />,
    );

    expect(visibleChips()).toHaveLength(0);
    expect(screen.queryByTestId('select-tag-overflow')).toBeNull();
    expect(screen.getByPlaceholderText('Pick some')).toBeTruthy();
  });

  it('measures the truncated label when maxTagTextLength is set', () => {
    renderWithProvider(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        maxTagTextLength={3}
        options={OPTIONS}
      />,
    );

    const measured = Array.from(
      document.querySelectorAll('[data-measure-chip]'),
    ).map((chip) => chip.textContent);
    expect(measured).toEqual(['App...', 'Ban...', 'Che...', 'Dam...']);
  });

  it('re-measures when a value is swapped without changing the count', () => {
    areaWidth = 160;
    const withNarrow = [...OPTIONS, { value: 'n', label: NARROW_LABEL }];
    const { rerender } = renderWithProvider(
      <Select
        mode="multiple"
        value={['a', 'b']}
        maxTagCount="responsive"
        options={withNarrow}
      />,
    );
    expect(visibleChips()).toHaveLength(1);

    // Same chip count, but the swapped-in chip is narrow enough that both fit.
    rerender(
      <Select
        mode="multiple"
        value={['a', 'n']}
        maxTagCount="responsive"
        options={withNarrow}
      />,
    );
    expect(visibleChips()).toHaveLength(2);
  });

  it('drops the caret reserve when the select is read-only', () => {
    areaWidth = 210;
    const { rerender } = renderWithProvider(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        options={OPTIONS}
      />,
    );
    expect(visibleChips()).toHaveLength(1);

    rerender(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        readOnly
        options={OPTIONS}
      />,
    );
    expect(visibleChips()).toHaveLength(2);
  });

  it('falls back to a window resize listener when ResizeObserver is missing', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    areaWidth = 200;
    renderWithProvider(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        options={OPTIONS}
      />,
    );
    expect(visibleChips()).toHaveLength(1);

    areaWidth = 400;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    expect(visibleChips()).toHaveLength(4);
  });

  it('shows every chip when the selector cannot be measured (SSR / hidden)', () => {
    areaWidth = 0;
    renderWithProvider(
      <Select
        mode="multiple"
        value={ALL}
        maxTagCount="responsive"
        options={OPTIONS}
      />,
    );

    expect(visibleChips()).toHaveLength(4);
    expect(screen.queryByTestId('select-tag-overflow')).toBeNull();
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

describe('Select (virtualised option list)', () => {
  const manyOptions = (
    count: number,
    prefix = 'Option',
  ): { value: string; label: string }[] =>
    Array.from({ length: count }, (_, index) => ({
      value: `v${index}`,
      label: `${prefix} ${index}`,
    }));

  const rows = (): HTMLElement[] => screen.queryAllByTestId('select-option');

  const searchInput = (): HTMLInputElement =>
    document.querySelector('input') as HTMLInputElement;

  const scrollList = (offset: number): void => {
    const container = document.querySelector(
      '.perfect-scrollbar-wrapper',
    ) as HTMLElement;
    Object.defineProperty(container, 'scrollTop', {
      value: offset,
      writable: true,
      configurable: true,
    });
    fireEvent.scroll(container);
  };

  it('mounts only the visible window (plus overscan) for 500 options', () => {
    renderWithProvider(
      <Select defaultOpen showSearch options={manyOptions(500)} />,
    );

    // listHeight 256 / listItemHeight 32 = 8 visible rows; the rest is overscan.
    expect(rows().length).toBeGreaterThan(0);
    expect(rows().length).toBeLessThan(40);
    expect(screen.getByText('Option 0')).toBeTruthy();
    expect(screen.queryByText('Option 499')).toBeNull();
  });

  it('keeps the listbox / option roles on the windowed rows', () => {
    renderWithProvider(<Select defaultOpen options={manyOptions(500)} />);

    const listbox = document.querySelector('[role="listbox"]');
    expect(listbox).toBeTruthy();
    rows().forEach((row) => {
      expect(row.getAttribute('role')).toBe('option');
      expect(listbox?.contains(row)).toBe(true);
    });
  });

  it('states set size and position, which the mounted window no longer implies', () => {
    renderWithProvider(<Select defaultOpen options={manyOptions(500)} />);

    // Only a slice of the 500 is in the DOM, so AT can no longer count the set.
    expect(rows().length).toBeLessThan(500);
    expect(rows()[0].getAttribute('aria-setsize')).toBe('500');
    expect(rows()[0].getAttribute('aria-posinset')).toBe('1');
    expect(rows()[1].getAttribute('aria-posinset')).toBe('2');
  });

  it('narrows the stated set size to the filtered options', () => {
    renderWithProvider(
      <Select defaultOpen showSearch options={manyOptions(500)} />,
    );

    fireEvent.change(searchInput(), { target: { value: 'Option 487' } });

    expect(rows()).toHaveLength(1);
    expect(rows()[0].getAttribute('aria-setsize')).toBe('1');
    expect(rows()[0].getAttribute('aria-posinset')).toBe('1');
  });

  it('renders every option when there are fewer than one window', () => {
    renderWithProvider(<Select defaultOpen options={manyOptions(3)} />);

    expect(rows()).toHaveLength(3);
  });

  it('renders and selects the single match of a narrowing query', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <Select
        defaultOpen
        showSearch
        onChange={onChange}
        options={manyOptions(500)}
      />,
    );

    fireEvent.change(searchInput(), { target: { value: 'Option 487' } });

    expect(rows()).toHaveLength(1);
    fireEvent.click(screen.getByText('Option 487'));
    expect(onChange).toHaveBeenCalledWith(
      'v487',
      expect.objectContaining({ value: 'v487' }),
    );
  });

  it('drives row height and viewport height from listItemHeight / listHeight', () => {
    renderWithProvider(
      <Select
        defaultOpen
        listHeight={100}
        listItemHeight={50}
        options={manyOptions(100)}
      />,
    );

    // 100px of viewport at 50px a row = 2 visible rows (+ overscan).
    expect(rows().length).toBeLessThan(15);
    expect((rows()[0].parentElement as HTMLElement).style.minHeight).toBe(
      '50px',
    );

    // …and scrolling to the end reaches the final option.
    scrollList(100 * 50);
    expect(screen.getByText('Option 99')).toBeTruthy();
  });

  it('scrolls the window during keyboard navigation and keeps aria-activedescendant', () => {
    renderWithProvider(<Select defaultOpen options={manyOptions(200)} />);

    const combobox = document.querySelector('.ds-select') as Element;
    for (let step = 0; step < 30; step += 1) {
      fireEvent.keyDown(combobox, { key: 'ArrowDown' });
    }

    const activeId = combobox.getAttribute('aria-activedescendant');
    expect(activeId).toBeTruthy();
    const active = document.getElementById(activeId as string);
    expect(active).toBeTruthy();
    expect(active?.getAttribute('role')).toBe('option');
    expect(active?.textContent).toBe('Option 30');
    expect(active?.className).toContain('ds-select-item-option-active');
  });

  it('resets the window to the top when remote search swaps the options', () => {
    const { rerender } = renderWithProvider(
      <Select
        defaultOpen
        showSearch
        filterOption={false}
        onSearch={vi.fn()}
        options={manyOptions(300)}
      />,
    );

    scrollList(300 * 32);
    expect(screen.getByText('Option 299')).toBeTruthy();

    fireEvent.change(searchInput(), { target: { value: 'remote' } });
    rerender(
      <Select
        defaultOpen
        showSearch
        filterOption={false}
        onSearch={vi.fn()}
        options={manyOptions(120, 'Remote')}
      />,
    );

    expect(screen.getByText('Remote 0')).toBeTruthy();
    expect(screen.queryByText('Option 299')).toBeNull();
    expect(screen.queryByText('Remote 119')).toBeNull();
  });

  it('keeps multiple-mode selection for rows outside the window', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <Select
        defaultOpen
        mode="multiple"
        value={['v250']}
        onChange={onChange}
        options={manyOptions(500)}
      />,
    );

    // The selected row is far outside the window, but the chip still resolves.
    expect(
      document.querySelector('.ds-select-selection-item')?.textContent,
    ).toContain('Option 250');
    expect(rows().map((row) => row.textContent)).not.toContain('Option 250');

    scrollList(250 * 32);
    const rowNamed = (label: string): HTMLElement =>
      rows().find((row) => row.textContent === label) as HTMLElement;
    expect(rowNamed('Option 250').getAttribute('aria-selected')).toBe('true');

    fireEvent.click(rowNamed('Option 251'));
    expect(onChange).toHaveBeenCalledWith(
      ['v250', 'v251'],
      expect.arrayContaining([expect.objectContaining({ value: 'v251' })]),
    );
  });

  it('does not re-derive options from children on an unrelated parent re-render', () => {
    const seen: { value: unknown }[] = [];
    const rowKey = (option: { value: unknown }): string => {
      seen.push(option);
      return String(option.value);
    };

    const Harness = (): React.ReactElement => {
      const [count, setCount] = React.useState(0);
      return (
        <>
          <button
            type="button"
            data-testid="bump"
            onClick={() => setCount(count + 1)}
          >
            bump {count}
          </button>
          <Select defaultOpen rowKey={rowKey}>
            <Option value="a">
              <span>Alpha</span>
            </Option>
            <Option value="b">
              <span>Beta</span>
            </Option>
          </Select>
        </>
      );
    };

    renderWithProvider(<Harness />);
    const before = seen.find((option) => option.value === 'a');
    expect(before).toBeTruthy();

    seen.length = 0;
    fireEvent.click(screen.getByTestId('bump'));

    const after = seen.find((option) => option.value === 'a');
    expect(after).toBeTruthy();
    // Same object: the children walk was skipped, so every memo below it holds.
    expect(after).toBe(before);
  });

  it('re-derives options when the children actually change', () => {
    const seen: { value: unknown; label?: unknown }[] = [];
    const rowKey = (option: { value: unknown }): string => {
      seen.push(option);
      return String(option.value);
    };

    const Harness = (): React.ReactElement => {
      const [label, setLabel] = React.useState('Alpha');
      return (
        <>
          <button
            type="button"
            data-testid="rename"
            onClick={() => setLabel('Renamed')}
          >
            rename
          </button>
          <Select defaultOpen rowKey={rowKey}>
            <Option value="a">
              <span>{label}</span>
            </Option>
          </Select>
        </>
      );
    };

    renderWithProvider(<Harness />);
    const before = seen.find((option) => option.value === 'a');

    seen.length = 0;
    fireEvent.click(screen.getByTestId('rename'));

    expect(seen.find((option) => option.value === 'a')).not.toBe(before);
    expect(screen.getByText('Renamed')).toBeTruthy();
  });
});

describe('Select (windowed row measurement)', () => {
  const ESTIMATE = 32;
  const TALL_ROW = 64;

  let restoreLayout: (() => void)[] = [];
  let resizeCallbacks: ((entries: unknown[]) => void)[] = [];
  /** Rendered height per option label; anything absent is "not laid out" (0). */
  let heights: Record<string, number>;

  /** Stub a layout property jsdom always reports as 0, and undo it afterwards. */
  const overrideLayoutProp = (
    prop: string,
    getter: (this: HTMLElement) => number,
  ): void => {
    const original = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      prop,
    );
    Object.defineProperty(HTMLElement.prototype, prop, {
      configurable: true,
      get: getter,
    });
    restoreLayout.push(() => {
      if (original) {
        Object.defineProperty(HTMLElement.prototype, prop, original);
      } else {
        delete (HTMLElement.prototype as unknown as Record<string, unknown>)[
          prop
        ];
      }
    });
  };

  /** The row wrapper carrying react-window's offset for the option `label`. */
  const rowFor = (label: string): HTMLElement =>
    screen
      .getAllByTestId('select-option')
      .find((option) => option.textContent === label)
      ?.parentElement as HTMLElement;

  const OPTIONS = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
    { value: 'c', label: 'Gamma' },
  ];

  beforeEach(() => {
    restoreLayout = [];
    resizeCallbacks = [];
    heights = { Alpha: TALL_ROW, Beta: ESTIMATE, Gamma: ESTIMATE };

    // Only the row wrappers measure; everything else keeps jsdom's 0, which
    // `measureRow` reads as "not laid out" and ignores.
    overrideLayoutProp('offsetHeight', function offsetHeight(this: HTMLElement) {
      const child = this.firstElementChild;
      if (child?.getAttribute('data-testid') !== 'select-option') {
        return 0;
      }
      return heights[child.textContent ?? ''] ?? 0;
    });

    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: (entries: unknown[]) => void) {
          resizeCallbacks.push(callback);
        }

        observe = vi.fn();

        unobserve = vi.fn();

        disconnect = vi.fn();
      },
    );
  });

  afterEach(() => {
    restoreLayout.forEach((restore) => restore());
    vi.unstubAllGlobals();
  });

  /**
   * Fire every observer the render registered. The stub is global, so other DS
   * components observing here get called too — hence a well-formed entry.
   */
  const resizeAll = (): void => {
    act(() => {
      resizeCallbacks.forEach((callback) =>
        callback([{ contentRect: { width: 0, height: 0 } }]),
      );
    });
  };

  it('lays a measured row out at its real height, not at listItemHeight', () => {
    renderWithProvider(
      <Select defaultOpen listItemHeight={ESTIMATE} options={OPTIONS} />,
    );

    // Alpha renders taller than the estimate, so it claims its own height…
    expect(rowFor('Alpha').style.minHeight).toBe(`${TALL_ROW}px`);
    expect(rowFor('Beta').style.minHeight).toBe(`${ESTIMATE}px`);
    // …and pushes what follows down instead of being overlapped by it.
    expect(rowFor('Alpha').style.top).toBe('0px');
    expect(rowFor('Beta').style.top).toBe(`${TALL_ROW}px`);
    expect(rowFor('Gamma').style.top).toBe(`${TALL_ROW + ESTIMATE}px`);
  });

  it('re-measures a row whose content changes size after the first paint', () => {
    renderWithProvider(
      <Select defaultOpen listItemHeight={ESTIMATE} options={OPTIONS} />,
    );

    expect(rowFor('Gamma').style.top).toBe(`${TALL_ROW + ESTIMATE}px`);

    // Beta grows (a font swap, a label wrapping) without re-rendering the row.
    heights.Beta = TALL_ROW;
    resizeAll();

    expect(rowFor('Beta').style.minHeight).toBe(`${TALL_ROW}px`);
    expect(rowFor('Gamma').style.top).toBe(`${TALL_ROW * 2}px`);
  });

  it('sizes rows it cannot measure from listItemHeight, and re-sizes on change', () => {
    // Only Alpha reports a height; the other two never lay out.
    heights = { Alpha: TALL_ROW };

    const { rerender } = renderWithProvider(
      <Select defaultOpen listItemHeight={ESTIMATE} options={OPTIONS} />,
    );

    expect(rowFor('Beta').style.minHeight).toBe(`${ESTIMATE}px`);
    expect(rowFor('Gamma').style.top).toBe(`${TALL_ROW + ESTIMATE}px`);

    rerender(<Select defaultOpen listItemHeight={48} options={OPTIONS} />);

    // The unmeasured rows follow the new estimate; Alpha keeps its real height.
    expect(rowFor('Beta').style.minHeight).toBe('48px');
    expect(rowFor('Alpha').style.minHeight).toBe(`${TALL_ROW}px`);
    expect(rowFor('Gamma').style.top).toBe(`${TALL_ROW + 48}px`);
  });
});
