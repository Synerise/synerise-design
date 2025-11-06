import React from 'react';

import { FileM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';
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
    Element.prototype.scrollTo = jest.fn();
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

  it('should render with add button', () => {
    const onAddTab = jest.fn();
    renderWithProvider(<CardTabs onAddTab={onAddTab} />);

    expect(screen.getByTestId('card-tabs-add-button')).toBeTruthy();
  });

  it('should call onAddTab function', () => {
    const onAddTab = jest.fn();
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
    const onAddTab = jest.fn();
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
    const onSelect = jest.fn();
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
    const onChangeOrder = jest.fn();
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
    const onRemove = jest.fn();
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
    const onDuplicate = jest.fn();
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
    const onChangeName = jest.fn();
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
    const onDuplicate = jest.fn();
    const onChangeName = jest.fn();
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
    const onChangeName = jest.fn();
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
