import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils';
import range from 'lodash/range';
import FileIcon from '@synerise/ds-icon/dist/icons/file-m.svg';
import CardTabs from '../CardTabs';
import CardTab, { prefixType } from '../CardTab/CardTab';
import { fireEvent } from '@testing-library/react';

describe('Card Tabs', () => {
  const ITEMS = range(3).map((i: number) => ({
      id: i,
      name: `Variant ${String.fromCharCode(65 + i).toUpperCase()}`,
      tag: String.fromCharCode(65 + i).toUpperCase(),
    }
  ));

  it('should render CardTabs container', () => {
    const { getByTestId } = renderWithProvider(<CardTabs />);
    expect(getByTestId('card-tabs-container')).toBeTruthy();
  });

  it('should render CardTabs with 3 CardTabs', () => {
    const { queryAllByTestId } = renderWithProvider(<CardTabs>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} />) }
    </CardTabs>)

    expect(queryAllByTestId('card-tab-container').length).toBe(3);
  });

  it('should render with add button', () => {
    const onAddTab = jest.fn();
    const { getByTestId } = renderWithProvider(<CardTabs onAddTab={onAddTab} />);

    expect(getByTestId('card-tabs-add-button')).toBeTruthy();
  });

  it('should call onAddTab function', () => {
    const onAddTab = jest.fn();
    const { getByTestId } = renderWithProvider(<CardTabs onAddTab={onAddTab} />);
    const addButton = getByTestId('card-tabs-add-button');
    fireEvent.click(addButton.querySelector('button'));
    expect(onAddTab).toBeCalled();
  });

  it('should render disabled add button', () => {
    const onAddTab = jest.fn();
    const { getByTestId } = renderWithProvider(<CardTabs onAddTab={onAddTab} maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} />) }
    </CardTabs>);
    const addButton = getByTestId('card-tabs-add-button').querySelector('button');
    expect(addButton).toBeDisabled();
  });

  it('should call onSelect function', () => {
    const onSelect = jest.fn();
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab onSelectTab={onSelect} key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} />) }
    </CardTabs>);
    const firstTab = queryAllByTestId('card-tab-container')[0];
    fireEvent.click(firstTab);
    expect(onSelect).toBeCalled();
  });

  it('should render CardTab with tag', () => {
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} />) }
    </CardTabs>);
    expect(queryAllByTestId('card-tab-tag').length).toBe(3);
  });

  it('should render CardTab with prefix icon', () => {
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.ICON} prefixIcon={<FileIcon />} />) }
    </CardTabs>);
    const prefix = queryAllByTestId('card-tab-prefix')[0];
    expect(prefix.getElementsByTagName('svg')).toBeTruthy();
  });

  it('should render CardTab with suffix icon', () => {
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} suffixIcon={<FileIcon />} />) }
    </CardTabs>);
    const firsTab = queryAllByTestId('card-tab-container')[0];
    expect(firsTab.querySelector('.ds-card-tabs__suffix-icon')).toBeTruthy();
  });

  it('should render sortable tabs', () => {
    const onChangeOrder = jest.fn();
    const { getByTestId } = renderWithProvider(<CardTabs maxTabsCount={3} onChangeOrder={onChangeOrder}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} suffixIcon={<FileIcon />} />) }
    </CardTabs>);
    expect(getByTestId('card-tabs-sortable')).toBeTruthy();
  });

  it('should call removeTab function', () => {
    const onRemove = jest.fn();
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} onRemoveTab={onRemove} />) }
    </CardTabs>);
    const suffix = queryAllByTestId('card-tab-suffix')[0];
    const suffixRemoveIcon = suffix.querySelector('.ds-card-tabs__remove-icon');
    fireEvent.click(suffixRemoveIcon);
    expect(onRemove).toBeCalled();
  });

  it('should call onDuplicate function', () => {
    const onDuplicate = jest.fn();
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} onDuplicateTab={onDuplicate} />) }
    </CardTabs>);
    const suffix = queryAllByTestId('card-tab-suffix')[0];
    const suffixDuplicateIcon = suffix.querySelector('.ds-card-tabs__duplicate-icon');
    fireEvent.click(suffixDuplicateIcon);
    expect(onDuplicate).toBeCalled();
  });

  it('should call onChangeName function', () => {
    const onChangeName = jest.fn();
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} onChangeName={onChangeName} />) }
    </CardTabs>);
    const suffix = queryAllByTestId('card-tab-suffix')[0];
    const suffixChangeNameIcon = suffix.querySelector('.ds-card-tabs__change-name-icon');
    fireEvent.click(suffixChangeNameIcon);
    const label = queryAllByTestId('card-tab-label')[0];
    const input = label.querySelector('input');
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(onChangeName).toBeCalled();
  });

  it('should render disabled tabs', () => {
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item, index) => <CardTab key={index} id={item.id} index={index} name={item.name} tag={item.tag} prefix={prefixType.TAG} disabled={true} />) }
    </CardTabs>);
    const firstTab = queryAllByTestId('card-tab-container')[0];
    expect(firstTab.getAttribute('disabled')).toBe("");
  });
});