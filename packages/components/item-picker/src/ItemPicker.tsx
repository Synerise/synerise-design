import React from 'react';

import ItemPickerLegacy from './components/ItemPickerLegacy/ItemPickerLegacy';
import { type ItemPickerProps } from './components/ItemPickerLegacy/ItemPickerLegacy.types';
import { ItemPickerNew } from './components/ItemPickerNew/ItemPickerNew';
import type {
  BaseItemType,
  BaseSectionType,
  ItemPickerProps as ItemPickerPropsNew,
} from './components/ItemPickerNew/ItemPickerNew.types';

const isNewItemPicker = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
>(
  props: ItemPickerProps | ItemPickerPropsNew<ItemType, SectionType>,
): props is ItemPickerPropsNew<ItemType, SectionType> => {
  return 'isNewVersion' in props && props.isNewVersion;
};

const ItemPicker = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
>(
  props: ItemPickerProps | ItemPickerPropsNew<ItemType, SectionType>,
) => {
  if (isNewItemPicker<ItemType, SectionType>(props)) {
    return <ItemPickerNew key="ds-item-picker" {...props} />;
  }
  return <ItemPickerLegacy key="ds-item-picker-legacy" {...props} />;
};

export default ItemPicker;
