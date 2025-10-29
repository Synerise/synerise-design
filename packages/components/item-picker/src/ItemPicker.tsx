import React, { forwardRef } from 'react';

import ItemPickerLegacy from './components/ItemPickerLegacy/ItemPickerLegacy';
import { type ItemPickerProps } from './components/ItemPickerLegacy/ItemPickerLegacy.types';
import { type ItemPickerListRef } from './components/ItemPickerList/ItemPickerList.types';
import { ItemPickerNew } from './components/ItemPickerNew/ItemPickerNew';
import type { ItemPickerProps as ItemPickerPropsNew } from './components/ItemPickerNew/ItemPickerNew.types';
import type {
  BaseItemType,
  BaseSectionType,
} from './components/ItemPickerNew/types/baseItemSectionType.types';

const isNewItemPicker = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
>(
  props: ItemPickerProps | ItemPickerPropsNew<ItemType, SectionType>,
): props is ItemPickerPropsNew<ItemType, SectionType> => {
  return 'isNewVersion' in props && props.isNewVersion;
};

const ItemPickerInner = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType | undefined,
>(
  props: ItemPickerProps | ItemPickerPropsNew<ItemType, SectionType>,
  forwardedRef: ItemPickerListRef,
) => {
  if (isNewItemPicker<ItemType, SectionType>(props)) {
    return <ItemPickerNew key="ds-item-picker" {...props} ref={forwardedRef} />;
  }
  return <ItemPickerLegacy key="ds-item-picker-legacy" {...props} />;
};

type ItemPickerType = <
  ItemType extends BaseItemType,
  SectionType extends BaseSectionType,
>(
  p:
    | ItemPickerProps
    | (ItemPickerPropsNew<ItemType, SectionType> & {
        ref?: ItemPickerListRef;
      }),
) => ReturnType<typeof ItemPickerInner>;

const ItemPicker = forwardRef(ItemPickerInner) as ItemPickerType;
export default ItemPicker;
