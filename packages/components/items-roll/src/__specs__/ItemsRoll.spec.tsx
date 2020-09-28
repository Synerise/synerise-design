import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { DSProvider } from '@synerise/ds-core';
import { fireEvent, cleanup } from '@testing-library/react';

import ItemsRoll from '../ItemsRoll';
import { propsFactory, ACTIONS, ITEM_TEXT } from './utils';

const messages = {
  en: {
    DS: {
      'ITEMS-ROLL': {
        'CHANGE-SELECTION': 'Change selection',
        'CLEAR-ALL': 'Clear all',
        'CLEAR-TOOLTIP': 'Clear',
        ITEMS: 'Items',
        MORE: 'more',
        'NO-RESULTS': 'No results',
        'REMOVE-TOOLTIP': 'Remove',
        SHOW: 'Show',
        'SHOW-LESS': 'Show less',
      },
    },
  },
};

const DEFAULT_ITEMS_LENGTH = 100;
const DEFAULT_MAX_TO_SHOW_ITEMS = 10;

afterEach(() => {
  cleanup();
});

describe('ItemsRoll', () => {
  it('renders with default', () => {
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useFooter />
      </DSProvider>,
      {}
    );

    const searchInput = C.container.querySelector('.ant-input')!;

    // ASSERT
    expect(C.getByText(`${DEFAULT_ITEMS_LENGTH}`)).toBeInTheDocument();
    expect(C.getByText('Change selection')).toBeInTheDocument();
    expect(C.getByText(`${DEFAULT_MAX_TO_SHOW_ITEMS}`)).toBeInTheDocument();
    expect(C.queryAllByTestId(`list-element-wrapper`).length).toBe(DEFAULT_MAX_TO_SHOW_ITEMS);
    expect(C.getByText(`Clear all`)).toBeInTheDocument();
    expect(C.container.querySelectorAll('.ant-divider').length).toBe(2);
    expect(searchInput.getAttribute('placeholder')).toBe('Search...');
    expect(searchInput).toHaveValue('');

    // ACT
    const firstListItem = C.queryAllByTestId('list-element-wrapper')[0] as HTMLDivElement;

    fireEvent.mouseOver(firstListItem);

    const removeIcon = C.container.querySelector('.element-remove-icon') as HTMLDivElement;

    // ASSERT
    expect(removeIcon).toBeInTheDocument();

    // ACT
    fireEvent.click(firstListItem);

    // ASSERT
    expect(onItemClick).toHaveBeenCalledTimes(1);

    // ACT
    fireEvent.click(removeIcon);

    // ASSERT
    expect(onItemRemove).toHaveBeenCalledTimes(1);

    // ACT
    const actionMenuTrigger = C.container.querySelector('.ant-dropdown-trigger') as HTMLElement;

    fireEvent.click(actionMenuTrigger);

    const actionMenu = C.getByTestId('items-roll-action-menu') as HTMLElement;

    // ASSERT
    expect(C.getByText('Import')).toBeInTheDocument();
    expect(C.getByText('Export')).toBeInTheDocument();
    expect(actionMenu.querySelectorAll('li').length).toBe(2);
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useFooter />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.queryAllByText('Change selection').length).toBe(0);
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useFooter />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.container.querySelectorAll('.ant-dropdown-trigger').length).toBe(0);
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.queryAllByTestId('items-roll-footer').length).toBe(0);
  });

  it('renders with custom texts', () => {
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
      } as any,
    });

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.getByText('Custom Change Selection')).toBeInTheDocument();
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useVirtualizedList />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.getByTestId('items-roll-virtualized-list')).toBeInTheDocument();
  });

  it('renders with grouped list', () => {
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
      }
    );

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} groups={groups} />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.getByText('Params')).toBeInTheDocument();
    expect(C.getByText('Attributes')).toBeInTheDocument();
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useFooter />
      </DSProvider>,
      {}
    );

    const searchInput = C.container.querySelector('.ant-input') as HTMLElement;

    // ACT
    fireEvent.change(searchInput, {
      target: { value: '5' },
    });

    // ASSERT
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
      true
    );

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useFooter />
      </DSProvider>,
      {}
    );

    const searchInput = C.container.querySelector('.ant-input') as HTMLElement;

    // ASSERT
    expect(searchInput.getAttribute('value')).toBe('5');
  });

  it('fire onClearAll', () => {
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useFooter />
      </DSProvider>,
      {}
    );

    const onClearAllButton = C.getByText('Clear all') as HTMLElement;

    // ACT
    fireEvent.click(onClearAllButton);
    const confirmBtn = document.querySelector('.ant-popover .ant-btn-primary') as HTMLButtonElement;
    fireEvent.click(confirmBtn);

    // ASSERT
    expect(onClearAll).toHaveBeenCalledTimes(1);
  });

  it('fire onChangeSelection', () => {
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} />
      </DSProvider>,
      {}
    );

    const onChangeSelectionButton = C.getByText('Change selection') as HTMLElement;

    // ACT
    fireEvent.click(onChangeSelectionButton);

    // ASSERT
    expect(onChangeSelection).toHaveBeenCalledTimes(1);
  });

  it('renders with No results', () => {
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} items={[]} useVirtualizedList />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.getByText('No results')).toBeInTheDocument();
  });

  it('renders with provided show more / less button', () => {
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useFooter />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.getByText(`${SHOW_MORE_STEP}`)).toBeInTheDocument();
    expect(C.getByText(`${ITEM_TEXT}-${MAX_ITEMS_TO_SHOW - 1}`)).toBeInTheDocument();
  });

  it('renders with calculated show more button', () => {
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

    // ARRANGE
    const C = renderWithProvider(
      <DSProvider locale="en" messages={messages}>
        <ItemsRoll {...props} useFooter />
      </DSProvider>,
      {}
    );

    // ASSERT
    expect(C.getByText(`${SHOW_MORE_STEP - 100 - 10}`)).toBeInTheDocument();
  });
});
