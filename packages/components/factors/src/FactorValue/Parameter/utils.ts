import type { ParameterGroup } from '../../Factors.types';
import { DropdownItem } from './Parameter.types';
import { DividerItem, TitleItem } from './ParameterDropdown';

const NO_GROUP_NAME = 'NO_GROUP_NAME';

export const groupItems = (dropdownItems: DropdownItem<ParameterGroup>[], activeGroup: ParameterGroup | undefined) => {
  const itemsNumber = dropdownItems.length;
  const groupedItems = {};
  let resultItems: (DropdownItem<ParameterGroup> | TitleItem | DividerItem)[] = [];

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
