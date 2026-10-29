import React from 'react';

import { FileM } from '@synerise/ds-icon';
import {
  declarationsFor,
  renderWithProvider,
  rulesFor,
} from '@synerise/ds-core/testing';
import {
  customColors,
  orderedBase,
  orderedHover,
} from '@synerise/ds-tokens/names';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CardTab from '../CardTab/CardTab';
import { prefixType } from '../CardTab/CardTab.types';
import CardTabs from '../CardTabs';

describe('Card Tabs', () => {
  const ITEMS = [0, 1, 2].map((i: number) => ({
    id: i,
    name: `Variant ${String.fromCharCode(65 + i).toUpperCase()}`,
    tag: String.fromCharCode(65 + i).toUpperCase(),
  }));
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  it('should render CardTabs container', () => {
    renderWithProvider(<CardTabs />);

    expect(screen.getByTestId('card-tabs-container')).toBeTruthy();
  });

  it('should render CardTabs with 3 CardTabs', () => {
    renderWithProvider(
      <CardTabs>
        {ITEMS.map((item, index) => (
          <CardTab key={index} {...item} prefix={prefixType.TAG} />
        ))}
      </CardTabs>,
    );

    expect(screen.queryAllByTestId('card-tab-container').length).toBe(3);
  });

  it('should colour an active auto-assigned tab from its ordered token slot', () => {
    renderWithProvider(
      <CardTabs>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            active={index === 0}
          />
        ))}
      </CardTabs>,
    );

    // First tab → queue slot 1 → the flipping ordered semantic token (jsdom keeps the var()).
    const firstTab = screen.queryAllByTestId('card-tab-container')[0];
    expect(firstTab).toHaveStyle(
      'background-color: var(--ds-color-ordered-1-base)',
    );
    expect(declarationsFor(firstTab, { state: ':hover' })).toContain(
      `background-color:${orderedHover[0]}`,
    );
  });

  it('should start the ordered slot queue again after its last slot', () => {
    const count = orderedBase.length + 1;
    renderWithProvider(
      <CardTabs>
        {Array.from({ length: count }, (_, index) => (
          <CardTab
            key={index}
            id={index}
            name={`Tab ${index}`}
            prefix={prefixType.TAG}
            tag="T"
            active
          />
        ))}
      </CardTabs>,
    );

    const tabs = screen.queryAllByTestId('card-tab-container');
    expect(tabs[1]).toHaveStyle(`background-color: ${orderedBase[1]}`);
    expect(tabs[count - 1]).toHaveStyle(`background-color: ${orderedBase[0]}`);
  });

  it('should colour a tab with an explicit color from that custom colour, not a slot', () => {
    renderWithProvider(
      <CardTabs>
        <CardTab id={0} name="Tab" prefix={prefixType.TAG} tag="T" color="green" active />
      </CardTabs>,
    );

    const tab = screen.getByTestId('card-tab-container');
    expect(tab).toHaveStyle(`background-color: ${customColors.green['600']}`);
    expect(declarationsFor(tab, { state: ':hover' })).toContain(
      `background-color:${customColors.green['500']}`,
    );
    expect(declarationsFor(tab, { state: 'any' })).not.toContain(
      '--ds-color-ordered-',
    );
  });

  it('should drop the active background for an unknown explicit color', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    renderWithProvider(
      <CardTabs>
        <CardTab id={0} name="Tab" prefix={prefixType.TAG} tag="T" color="not-a-colour" active />
      </CardTabs>,
    );

    const tab = screen.getByTestId('card-tab-container');
    expect(declarationsFor(tab)).not.toMatch(/(?:^|;)background-color:/);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"not-a-colour"'));
    warn.mockRestore();
  });

  it('should render with add button', () => {
    const onAddTab = vi.fn();
    renderWithProvider(<CardTabs onAddTab={onAddTab} />);

    expect(screen.getByTestId('card-tabs-add-button')).toBeTruthy();
  });

  it('should call onAddTab function', () => {
    const onAddTab = vi.fn();
    renderWithProvider(<CardTabs onAddTab={onAddTab} maxTabsCount={5} />);
    const addButton = screen
      .getByTestId('card-tabs-add-button')
      .querySelector('button');

    if (addButton) {
      fireEvent.click(addButton);
    }

    expect(onAddTab).toBeCalled();
  });

  it('should render disabled add button', () => {
    const onAddTab = vi.fn();
    renderWithProvider(
      <CardTabs onAddTab={onAddTab} maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab key={index} {...item} prefix={prefixType.TAG} />
        ))}
      </CardTabs>,
    );
    const addButton = screen
      .getByTestId('card-tabs-add-button')
      .querySelector('button');
    expect(addButton).toBeDisabled();
  });

  it('should call onSelect function', () => {
    const onSelect = vi.fn();
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            onSelectTab={onSelect}
            key={index}
            {...item}
            prefix={prefixType.TAG}
          />
        ))}
      </CardTabs>,
    );

    const firstTab = screen.queryAllByTestId('card-tab-container')[0];
    fireEvent.click(firstTab);

    expect(onSelect).toBeCalled();
  });

  it('should render CardTab with tag', () => {
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab key={index} {...item} prefix={prefixType.TAG} />
        ))}
      </CardTabs>,
    );

    expect(screen.queryAllByTestId('card-tab-tag').length).toBe(3);
  });

  it('should render CardTab with prefix icon', () => {
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.ICON}
            prefixIcon={<FileM />}
          />
        ))}
      </CardTabs>,
    );
    const prefix = screen.queryAllByTestId('card-tab-prefix')[0];

    expect(prefix.getElementsByTagName('svg')).toBeTruthy();
  });

  it('should render CardTab with prefix dot', () => {
    const DOT = 'Color dot';
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.DOT}
            colorDot={DOT}
          />
        ))}
      </CardTabs>,
    );
    const prefix = screen.queryAllByTestId('card-tab-prefix')[0];

    expect(within(prefix).getByText(DOT)).toBeInTheDocument();
  });

  it('should render CardTab with prefix handle', () => {
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab key={index} {...item} prefix={prefixType.HANDLE} />
        ))}
      </CardTabs>,
    );
    const prefix = screen.queryAllByTestId('card-tab-prefix')[0];

    expect(within(prefix).getByTestId('card-tab-handle')).toBeInTheDocument();
  });

  it('should render CardTab with suffix icon', () => {
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            suffixIcon={<FileM />}
          />
        ))}
      </CardTabs>,
    );
    const firsTab = screen.queryAllByTestId('card-tab-container')[0];

    expect(firsTab.querySelector('.ds-card-tabs__suffix-icon')).toBeTruthy();
  });

  it('should render sortable tabs', () => {
    const onChangeOrder = vi.fn();
    renderWithProvider(
      <CardTabs maxTabsCount={3} onChangeOrder={onChangeOrder}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            suffixIcon={<FileM />}
          />
        ))}
      </CardTabs>,
    );

    expect(screen.getAllByTestId('ds-sortable-item').length).toBe(ITEMS.length);
  });

  it('should call removeTab function', () => {
    const onRemove = vi.fn();
    const { container } = renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            onRemoveTab={onRemove}
          />
        ))}
      </CardTabs>,
    );
    const suffix = container.querySelector('.ds-cruds .remove');

    if (suffix) {
      fireEvent.click(suffix);
    }

    expect(onRemove).toBeCalled();
  });

  it('should call onDuplicate function', () => {
    const onDuplicate = vi.fn();
    const { container } = renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            onDuplicateTab={onDuplicate}
          />
        ))}
      </CardTabs>,
    );
    const suffix = container.querySelector('.ds-cruds .duplicate');

    if (suffix) {
      fireEvent.click(suffix);
    }

    expect(onDuplicate).toBeCalled();
  });

  it('should call onChangeName function', async () => {
    const onChangeName = vi.fn();
    const { container } = renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            onChangeName={onChangeName}
          />
        ))}
      </CardTabs>,
    );
    const suffix = container.querySelector('.ds-cruds .edit');

    if (suffix) {
      fireEvent.click(suffix);
    }

    const label = screen.queryAllByTestId('card-tab-label')[0];
    const input = label.querySelector('input');

    if (input) {
      fireEvent.focus(input);
      fireEvent.blur(input);
    }

    await waitFor(() => expect(onChangeName).toBeCalled());
  });

  it('should render disabled tabs', () => {
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            disabled={true}
          />
        ))}
      </CardTabs>,
    );
    const firstTab = screen.queryAllByTestId('card-tab-container')[0];

    expect(firstTab.getAttribute('disabled')).toBe('');
  });

  it('should not render remove button', () => {
    const onRemoveTab = undefined;
    const { container } = renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            onRemoveTab={onRemoveTab}
          />
        ))}
      </CardTabs>,
    );
    const suffix = container.querySelector('.ds-cruds .remove');
    expect(suffix).toBeFalsy();
  });

  it('should not render duplicate button', () => {
    const onDuplicate = undefined;
    const { container } = renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            onDuplicateTab={onDuplicate}
          />
        ))}
      </CardTabs>,
    );
    const suffix = container.querySelector('.ds-cruds .duplicate');
    expect(suffix).toBeFalsy();
  });

  it('should render dropdown menu as suffix', () => {
    const onDuplicate = vi.fn();
    const onChangeName = vi.fn();
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            actionsAsDropdown
            {...item}
            prefix={prefixType.TAG}
            onDuplicateTab={onDuplicate}
            onChangeName={onChangeName}
          />
        ))}
      </CardTabs>,
    );
    const suffix = screen.getAllByTestId('ds-card-tabs-contextmenu')
    expect(suffix).toHaveLength(ITEMS.length);
  });

  it('should enter edit mode on label doubleclick', async () => {
    const onChangeName = vi.fn();
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab
            key={index}
            {...item}
            prefix={prefixType.TAG}
            onChangeName={onChangeName}
          />
        ))}
      </CardTabs>,
    );
    const label = screen.queryAllByTestId('card-tab-label')[0];
    const input = label.querySelector('input');
    expect(input).toBeNull();
    if (label) {
      userEvent.dblClick(label);
    }
    await waitFor(() => {
      const label1 = screen.queryAllByTestId('card-tab-label')[0];
      const input1 = label1.querySelector('input');
      expect(input1).toBeInTheDocument();
    });
  });

  it('should not enter edit mode on label doubleclick if onChangeName is undefined', () => {
    renderWithProvider(
      <CardTabs maxTabsCount={3}>
        {ITEMS.map((item, index) => (
          <CardTab key={index} {...item} prefix={prefixType.TAG} />
        ))}
      </CardTabs>,
    );
    const label = screen.queryAllByTestId('card-tab-label')[0];
    const input = label.querySelector('input');
    expect(input).toBeNull();
    if (label) {
      userEvent.dblClick(label);
    }

    const label1 = screen.queryAllByTestId('card-tab-label')[0];
    const input1 = label1.querySelector('input');
    expect(input1).toBeNull();
  });
});

describe('CardTab icon colour', () => {
  const ICON_DEFAULT = 'var(--ds-card-tabs-variant-grey-icon-default)';
  const ICON_ACTIVE = 'var(--ds-card-tabs-variant-grey-icon-active)';

  it('colours the prefix, handle and suffix icons from their wrappers', () => {
    renderWithProvider(
      <CardTabs>
        <CardTab
          id={0}
          name="Tab"
          prefix={prefixType.ICON}
          prefixIcon={<FileM />}
          suffixIcon={<FileM />}
          draggable
        />
        <CardTab
          id={1}
          name="Active tab"
          prefix={prefixType.ICON}
          prefixIcon={<FileM />}
          suffixIcon={<FileM />}
          active
        />
      </CardTabs>,
    );

    const [tab, activeTab] = screen.getAllByTestId('card-tab-container');
    expect(within(tab).getByTestId('card-tab-prefix')).toHaveStyle(
      `color: ${ICON_DEFAULT}`,
    );
    expect(
      tab.querySelector('.ds-card-tabs__handle-icon'),
    ).toHaveStyle('color: var(--ds-card-tabs-variant-grey-handler-default)');
    expect(tab.querySelector('.ds-card-tabs__suffix-icon')).toHaveStyle(
      `color: ${ICON_DEFAULT}`,
    );
    expect(within(activeTab).getByTestId('card-tab-prefix')).toHaveStyle(
      `color: ${ICON_ACTIVE}`,
    );
    expect(activeTab.querySelector('.ds-card-tabs__suffix-icon')).toHaveStyle(
      `color: ${ICON_ACTIVE}`,
    );
    tab.querySelectorAll('.ds-icon').forEach((icon) => {
      expect(icon?.querySelector('svg')).toHaveStyle('color: inherit');
    });
  });

  it('colours the action icons and the remove icon on the icon, not the svg', () => {
    renderWithProvider(
      <CardTabs>
        <CardTab
          id={0}
          name="Tab"
          prefix={prefixType.TAG}
          tag="A"
          onDuplicateTab={vi.fn()}
          onRemoveTab={vi.fn()}
        />
      </CardTabs>,
    );

    const suffix = screen.getByTestId('card-tab-suffix');
    expect(
      within(suffix).getByTestId('ds-cruds-duplicate').querySelector('.ds-icon'),
    ).toHaveStyle(`color: ${ICON_DEFAULT}`);
    expect(
      within(suffix).getByTestId('ds-cruds-remove').querySelector('.ds-icon'),
    ).toHaveStyle('color: var(--ds-card-tabs-variant-grey-remove-icon)');
  });

  it('switches hover colours on wrappers without forcing svg fill', () => {
    // A lone tab is never draggable, so a second one makes the handle render.
    renderWithProvider(
      <CardTabs>
        <CardTab
          id={0}
          name="Tab"
          prefix={prefixType.ICON}
          prefixIcon={<FileM />}
          draggable
        />
        <CardTab id={1} name="Other" prefix={prefixType.TAG} tag="B" />
      </CardTabs>,
    );

    const [container] = screen.getAllByTestId('card-tab-container');
    // Every state's rules the tab emits for itself and for anything inside it.
    const tabRules = [
      ...rulesFor(container, { state: 'any' }),
      ...Array.from(container.querySelectorAll('*')).flatMap((element) =>
        rulesFor(element, { within: container, state: 'any' }),
      ),
    ];
    const hoverDragRule = rulesFor(
      container.querySelector('.ds-card-tabs__handle-icon'),
      { within: container },
    ).find(({ selector }) => selector.includes(':hover'));

    expect(tabRules.some(({ selector }) => /svg/.test(selector))).toBe(false);
    expect(
      tabRules.map(({ declarations }) => declarations).join(';'),
    ).not.toMatch(/(^|;)fill:/);
    expect(hoverDragRule?.declarations).toContain(`color:${ICON_DEFAULT}`);
  });
});
