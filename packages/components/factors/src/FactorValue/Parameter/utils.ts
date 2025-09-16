import { type ParameterGroup } from '../../Factors.types';
import {
  type DividerItem,
  type DropdownItem,
  type MixedDropdownItemProps,
  type ParameterDropdownTitleProps,
  type TitleItem,
} from './Parameter.types';

const NO_GROUP_NAME = 'NO_GROUP_NAME';

export const groupItems = (
  dropdownItems: DropdownItem<ParameterGroup>[],
  activeGroup: ParameterGroup | undefined,
) => {
  const itemsNumber = dropdownItems.length;
  const groupedItems: Record<string, DropdownItem<ParameterGroup>[]> = {};
  let resultItems: (DropdownItem<ParameterGroup> | TitleItem | DividerItem)[] =
    [];

  for (let i = 0; i < itemsNumber; i += 1) {
    const item = dropdownItems[i];
    const groupName = item.item.groupName || NO_GROUP_NAME;
    const group = groupedItems[groupName] || [];
    group.push(item);
    groupedItems[groupName] = group;
  }

  Object.keys(groupedItems).forEach((key: string, index) => {
    if (key !== NO_GROUP_NAME && !activeGroup) {
      if (index > 0) {
        resultItems.push({
          type: 'divider',
        });
      }
      resultItems.push({
        type: 'title',
        title: key,
      });
    }
    resultItems = resultItems.concat(groupedItems[key]);
  });

  return resultItems;
};

export const isListTitle = (
  element?: MixedDropdownItemProps,
): element is ParameterDropdownTitleProps => {
  return (element as ParameterDropdownTitleProps).title !== undefined;
};

export const isDivider = (
  item: MixedDropdownItemProps | TitleItem | DividerItem,
): item is DividerItem => {
  return (item as DividerItem).type === 'divider';
};
