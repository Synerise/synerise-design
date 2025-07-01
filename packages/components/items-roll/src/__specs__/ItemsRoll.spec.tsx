import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';
import { cleanup, fireEvent, screen, within } from '@testing-library/react';

import ItemsRoll from '../ItemsRoll';
import { ACTIONS, ITEM_TEXT, propsFactory } from './utils';

const DEFAULT_ITEMS_LENGTH = 100;
const DEFAULT_MAX_TO_SHOW_ITEMS = 10;

afterEach(() => {
  cleanup();
});

describe('ItemsRoll', () => {
  it('renders with default', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const onItemClick = jest.fn();
    const onItemRemove = jest.fn();

    const props = propsFactory({
      actions: ACTIONS,
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
      onItemClick,
      onItemRemove,
    });

    const { container } = renderWithProvider(
      <ItemsRoll {...props} useFooter />,
    );

    const searchInput = container.querySelector('.ant-input')!;

    expect(
      await screen.findByText(`${DEFAULT_ITEMS_LENGTH}`),
    ).toBeInTheDocument();
    expect(await screen.findByText('Change selection')).toBeInTheDocument();
    expect(
      await screen.findByText(`${DEFAULT_MAX_TO_SHOW_ITEMS}`),
    ).toBeInTheDocument();
    expect(container.querySelectorAll(`.items-roll-list-item`).length).toBe(
      DEFAULT_MAX_TO_SHOW_ITEMS,
    );
    expect(await screen.findByText(`Clear all`)).toBeInTheDocument();
    expect(container.querySelectorAll('.ant-divider').length).toBe(2);
    expect(searchInput.getAttribute('placeholder')).toBe('Search...');
    expect(searchInput).toHaveValue('');

    const firstListItem = container.querySelectorAll(
      '.items-roll-list-item',
    )[0] as HTMLDivElement;

    fireEvent.mouseOver(firstListItem);

    const removeIcon = container.querySelector(
      '.element-remove-icon',
    ) as HTMLDivElement;

    expect(removeIcon).toBeInTheDocument();

    fireEvent.click(firstListItem);

    expect(onItemClick).toHaveBeenCalledTimes(1);

    fireEvent.click(removeIcon);

    expect(onItemRemove).toHaveBeenCalledTimes(1);

    const actionMenuTrigger = container.querySelector(
      '.ant-dropdown-trigger',
    ) as HTMLElement;

    fireEvent.click(actionMenuTrigger);

    const actionMenu = (await screen.findByTestId(
      'items-roll-action-menu',
    )) as HTMLElement;

    expect(await screen.findByText('Import')).toBeInTheDocument();
    expect(await screen.findByText('Export')).toBeInTheDocument();
    expect(within(actionMenu).queryAllByRole('menuitem').length).toBe(2);
  });

  it('renders without change selection when onChangeSelection is NOT provided', () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
    });

    renderWithProvider(<ItemsRoll {...props} useFooter />);

    expect(screen.queryAllByText('Change selection').length).toBe(0);
  });

  it('renders without actions menu', () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
    });

    const { container } = renderWithProvider(
      <ItemsRoll {...props} useFooter />,
    );

    expect(container.querySelectorAll('.ant-dropdown-trigger').length).toBe(0);
  });

  it('renders without footer', () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
    });

    renderWithProvider(<ItemsRoll {...props} />);

    expect(screen.queryAllByTestId('items-roll-footer').length).toBe(0);
  });

  it('renders with custom texts', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
      texts: {
        changeSelectionLabel: 'Custom Change Selection',
      },
    });

    renderWithProvider(<ItemsRoll {...props} />);

    expect(
      await screen.findByText('Custom Change Selection'),
    ).toBeInTheDocument();
  });

  it('renders with virtualized list', () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
    });

    renderWithProvider(<ItemsRoll {...props} useVirtualizedList />);

    expect(
      screen.getByTestId('items-roll-virtualized-list'),
    ).toBeInTheDocument();
  });

  it('renders with grouped list', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();
    const groups = ['Params', 'Attributes'];

    const props = propsFactory(
      {
        onSearch,
        onSearchClear,
        onClearAll,
        onChangeSelection,
      },
      {
        groups,
      },
    );

    renderWithProvider(<ItemsRoll {...props} groups={groups} />);

    expect(await screen.findByText('Params')).toBeInTheDocument();
    expect(await screen.findByText('Attributes')).toBeInTheDocument();
  });

  it('fire onSearch', () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const props = propsFactory({
      actions: ACTIONS,
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
    });

    const { container } = renderWithProvider(
      <ItemsRoll {...props} useFooter />,
    );

    const searchInput = container.querySelector('.ant-input') as HTMLElement;

    fireEvent.change(searchInput, {
      target: { value: '5' },
    });

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('render Input with Value', () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const props = propsFactory(
      {
        actions: ACTIONS,
        onSearch,
        onSearchClear,
        onClearAll,
        onChangeSelection,
      },
      undefined,
      true,
    );

    const { container } = renderWithProvider(
      <ItemsRoll {...props} useFooter />,
    );

    const searchInput = container.querySelector('.ant-input') as HTMLElement;

    expect(searchInput.getAttribute('value')).toBe('5');
  });

  it('fire onClearAll', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
    });

    renderWithProvider(<ItemsRoll {...props} useFooter />);

    const onClearAllButton = (await screen.findByText(
      'Clear all',
    )) as HTMLElement;

    fireEvent.click(onClearAllButton);
    const confirmBtn = document.querySelector(
      '.ant-popover .ant-btn-primary',
    ) as HTMLButtonElement;
    fireEvent.click(confirmBtn);

    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('fire onChangeSelection', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
    });

    renderWithProvider(<ItemsRoll {...props} />);

    const onChangeSelectionButton = (await screen.findByText(
      'Change selection',
    )) as HTMLElement;

    fireEvent.click(onChangeSelectionButton);

    expect(onChangeSelection).toHaveBeenCalledTimes(1);
  });

  it('renders with No results', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
    });

    renderWithProvider(<ItemsRoll {...props} items={[]} useVirtualizedList />);

    expect(await screen.findByText('No results')).toBeInTheDocument();
  });

  it('renders with provided show more / less button', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const MAX_ITEMS_TO_SHOW = 22;
    const SHOW_MORE_STEP = 33;

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
      maxToShowItems: MAX_ITEMS_TO_SHOW,
      showMoreStep: SHOW_MORE_STEP,
    });

    renderWithProvider(<ItemsRoll {...props} useFooter />);

    expect(await screen.findByText(`${SHOW_MORE_STEP}`)).toBeInTheDocument();
    expect(
      await screen.findByText(`${ITEM_TEXT}-${MAX_ITEMS_TO_SHOW - 1}`),
    ).toBeInTheDocument();
  });

  it('renders with calculated show more button', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const SHOW_MORE_STEP = 200;

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
      showMoreStep: SHOW_MORE_STEP,
    });

    renderWithProvider(<ItemsRoll {...props} useFooter />);

    expect(
      await screen.findByText(`${SHOW_MORE_STEP - 100 - 10}`),
    ).toBeInTheDocument();
  });

  it('renders withChangeSelectionDropdown', async () => {
    const CHANGE_SELECTION_BTN = 'Change selection';
    const onVisibleChange = jest.fn();
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();
    const changeSelectionDropdownProps = {
      overlay: <div>Overlay content</div>,
      trigger: ['click' as const],
      onVisibleChange,
    };

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
      changeSelectionDropdownProps,
      texts: {
        changeSelectionLabel: CHANGE_SELECTION_BTN,
      },
    });

    renderWithProvider(<ItemsRoll {...props} />);

    fireEvent.click(await screen.findByText(CHANGE_SELECTION_BTN));

    expect(onChangeSelection).toHaveBeenCalled();
    expect(onVisibleChange).toHaveBeenCalled();
  });

  it('renders with custom counter', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();
    const CUSTOM_COUNTER = 'custom counter';
    const renderCount = (count: number) => <>{`${CUSTOM_COUNTER}-${count}`}</>;

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
    });

    renderWithProvider(<ItemsRoll {...props} renderCount={renderCount} />);

    expect(
      await screen.findByText(`${CUSTOM_COUNTER}-${props.items.length}`),
    ).toBeInTheDocument();
  });
  it('does not render clear / remove buttons if isDisabled prop is true', async () => {
    const onSearch = jest.fn();
    const onSearchClear = jest.fn();
    const onClearAll = jest.fn();
    const onChangeSelection = jest.fn();

    const props = propsFactory({
      onSearch,
      onSearchClear,
      onClearAll,
      onChangeSelection,
    });

    renderWithProvider(<ItemsRoll {...props} isDisabled />);
    expect(await screen.findByText('Change selection')).toBeInTheDocument();
    expect(
      screen.queryByTestId('items-roll-remove-icon'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Clear all')).not.toBeInTheDocument();
  });
});
