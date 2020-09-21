import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import {range} from 'lodash';
import CardTabs from '../CardTabs';
import CardTab from '../CardTab/CardTab';
import { fireEvent } from '@testing-library/react';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import { CardTabsItem } from '../CardTabs.types';
import { prefixType } from '../CardTab/CardTab.types';

describe('Card Tabs', () => {
  const ITEMS: CardTabsItem[] = range(3).map((i: number) => ({
      id: i,
      name: `Variant ${String.fromCharCode(65 + i).toUpperCase()}`,
      tag: String.fromCharCode(65 + i).toUpperCase(),
    }
  ));

  it('should render CardTabs container', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(<CardTabs />);

    // ASSERT
    expect(getByTestId('card-tabs-container')).toBeTruthy();
  });

  it('should render CardTabs with 3 CardTabs', () => {
    // ARRANGE
    const { queryAllByTestId } = renderWithProvider(<CardTabs>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} />) }
    </CardTabs>)

    // ASSERT
    expect(queryAllByTestId('card-tab-container').length).toBe(3);
  });

  it('should render with add button', () => {
    // ARRANGE
    const onAddTab = jest.fn();
    const { getByTestId } = renderWithProvider(<CardTabs onAddTab={onAddTab} />);

    // ASSERT
    expect(getByTestId('card-tabs-add-button')).toBeTruthy();
  });

  it('should call onAddTab function', () => {
    // ARRANGE
    const onAddTab = jest.fn();
    const { getByTestId } = renderWithProvider(<CardTabs onAddTab={onAddTab} maxTabsCount={5} />);
    const addButton = getByTestId('card-tabs-add-button').querySelector('button');

    // ACT
    if(addButton){
      fireEvent.click(addButton);
    }

    // ASSERT
    expect(onAddTab).toBeCalled();
  });

  it('should render disabled add button', () => {
    // ARRANGE
    const onAddTab = jest.fn();
    const { getByTestId } = renderWithProvider(<CardTabs onAddTab={onAddTab} maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} />) }
    </CardTabs>);
    const addButton = getByTestId('card-tabs-add-button').querySelector('button');
    // ASSERT
    expect(addButton).toBeDisabled();
  });

  it('should call onSelect function', () => {
    // ARRANGE
    const onSelect = jest.fn();
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab onSelectTab={onSelect} key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} />) }
    </CardTabs>);

    // ACT
    const firstTab = queryAllByTestId('card-tab-container')[0];
    fireEvent.click(firstTab);

    // ASSERT
    expect(onSelect).toBeCalled();
  });

  it('should render CardTab with tag', () => {
    // ARRANGE
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} />) }
    </CardTabs>);

    // ASSERT
    expect(queryAllByTestId('card-tab-tag').length).toBe(3);
  });

  it('should render CardTab with prefix icon', () => {
    // ARRANGE
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.ICON} prefixIcon={<FileM />} />) }
    </CardTabs>);
    const prefix = queryAllByTestId('card-tab-prefix')[0];

    // ASSERT
    expect(prefix.getElementsByTagName('svg')).toBeTruthy();
  });

  it('should render CardTab with suffix icon', () => {
    // ARRANGE
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} suffixIcon={<FileM />} />) }
    </CardTabs>);
    const firsTab = queryAllByTestId('card-tab-container')[0];

    // ASSERT
    expect(firsTab.querySelector('.ds-card-tabs__suffix-icon')).toBeTruthy();
  });

  it('should render sortable tabs', () => {
    // ARRANGE
    const onChangeOrder = jest.fn();
    const { getByTestId } = renderWithProvider(<CardTabs maxTabsCount={3} onChangeOrder={onChangeOrder}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} suffixIcon={<FileM />} />) }
    </CardTabs>);

    // ASSERT
    expect(getByTestId('card-tabs-sortable')).toBeTruthy();
  });

  it('should call removeTab function', () => {
    // ARRANGE
    const onRemove = jest.fn();
    const { container } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} onRemoveTab={onRemove} />) }
    </CardTabs>);
    const suffix = container.querySelector('.ds-cruds .remove');

    //ACT
    if(suffix) {
      fireEvent.click(suffix);
    }

    // ASSERT
    expect(onRemove).toBeCalled();
  });

  it('should call onDuplicate function', () => {
    // ARRANGE
    const onDuplicate = jest.fn();
    const { container } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} onDuplicateTab={onDuplicate} />) }
    </CardTabs>);
    const suffix = container.querySelector('.ds-cruds .duplicate');

    // ACT
    if(suffix) {
      fireEvent.click(suffix);
    }

    // ASSERT
    expect(onDuplicate).toBeCalled();
  });

  it('should call onChangeName function', () => {
    // ARRANGE
    const onChangeName = jest.fn();
    const { container, queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} onChangeName={onChangeName} />) }
    </CardTabs>);
    const suffix = container.querySelector('.ds-cruds .edit');

    // ACT
    if(suffix){
      fireEvent.click(suffix);
    }

    // ASSERT
    const label = queryAllByTestId('card-tab-label')[0];
    const input = label.querySelector('input');

    // ACT
    if(input){
      fireEvent.focus(input);
      fireEvent.blur(input);
    }

    // ASSERT
    expect(onChangeName).toBeCalled();
  });

  it('should render disabled tabs', () => {
    // ARRANGE
    const { queryAllByTestId } = renderWithProvider(<CardTabs maxTabsCount={3}>
      { ITEMS.map((item: CardTabsItem, index: number) => <CardTab key={index} id={item.id} name={item.name} tag={item.tag} prefix={prefixType.TAG} disabled={true} />) }
    </CardTabs>);
    const firstTab = queryAllByTestId('card-tab-container')[0];

    // ASSERT
    expect(firstTab.getAttribute('disabled')).toBe("");
  });
});
