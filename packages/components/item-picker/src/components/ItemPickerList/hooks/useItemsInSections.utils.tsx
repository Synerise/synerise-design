import React, { ReactNode } from 'react';
import Icon, { FolderM, ArrowRightCircleM } from '@synerise/ds-icon';
import { ListItemProps } from '@synerise/ds-list-item';
import InformationCard from '@synerise/ds-information-card';

import { TitleListItemProps, ItemPickerListTexts } from '../ItemPickerList.types';
import {
  ActionType,
  BaseItemType,
  BaseSectionType,
  BaseSectionTypeWithFolders,
} from '../../ItemPickerNew/ItemPickerNew.types';
import { createTitleFromTitlePath } from '../utils';

export const getFolderItem = (item: ListItemProps, onClick: ListItemProps['onClick']): ListItemProps => {
  return {
    ...item,
    prefixel: <Icon component={<FolderM />} />,
    onClick,
  };
};

export const getShowMoreItem = (label: ReactNode, onClick: ListItemProps['onClick']): ListItemProps => {
  return {
    text: label,
    prefixel: <Icon component={<ArrowRightCircleM />} />,
    onClick,
  };
};

export const getTitleItem = (titleText: ReactNode): TitleListItemProps => {
  return {
    type: 'title',
    text: titleText,
  };
};

export const getListItem = <ItemType extends ListItemProps>(
  item: ItemType,
  isSelected: (item: ItemType) => boolean,
  searchQuery?: string,
  onItemSelect?: (item: ItemType) => void,
  renderHoverTooltip?: () => JSX.Element
): ListItemProps => {
  return {
    ...item,
    highlight: searchQuery,
    selected: isSelected(item),
    renderHoverTooltip,
    onClick: onItemSelect ? () => onItemSelect(item) : undefined,
  };
};

export const getActionItem = (action: ActionType, searchQuery?: string): ListItemProps => {
  return {
    ...action,
    highlight: searchQuery,
    onClick: 'onClick' in action && action.onClick ? () => action.onClick(action) : undefined,
  };
};

export const matchesSearchQuery = (text: ReactNode, searchQuery: string) => {
  return String(text).toLowerCase().includes(searchQuery.toLowerCase());
};

export const getItemsSectionTitle = (
  texts: ItemPickerListTexts,
  showItemsSectionLabel: boolean,
  searchQuery?: string
) => {
  if (searchQuery) return [getTitleItem(texts.resultsSectionLabel)];
  return showItemsSectionLabel ? [getTitleItem(texts.itemsSectionLabel)] : [];
};

export const getActionItems = ({
  actions,
  texts,
  searchQuery,
}: {
  actions?: ActionType[];
  texts: ItemPickerListTexts;
  searchQuery?: string;
}) => {
  return actions?.length
    ? [getTitleItem(texts.actionsSectionLabel), ...actions.map(action => getActionItem(action, searchQuery))]
    : [];
};

export const getSectionActionItems = ({
  actions,
  texts,
  sectionId,
  searchQuery,
}: {
  actions?: ActionType[];
  texts: ItemPickerListTexts;
  sectionId?: string;
  searchQuery?: string;
}) => {
  const filteredActions = actions?.filter(
    action => action.sectionId === sectionId && (!searchQuery || matchesSearchQuery(action.text, searchQuery))
  );
  return getActionItems({ actions: filteredActions, texts, searchQuery });
};

export const getRecentItems = <ItemType extends BaseItemType>({
  recents,
  texts,
  isSelected,
  handleItemSelect,
  searchQuery,
}: {
  recents?: ItemType[];
  texts: ItemPickerListTexts;
  isSelected: (item: ItemType) => boolean;
  handleItemSelect?: (item: ItemType) => void;
  searchQuery?: string;
}) => {
  return recents?.length && !searchQuery
    ? [
        getTitleItem(texts.recentsSectionLabel),
        ...recents.map(item =>
          getListItem(item, isSelected, searchQuery, handleItemSelect, getInformationCardTooltip(item))
        ),
      ]
    : [];
};

export const getItems = <ItemType extends BaseItemType>({
  items,
  texts,
  titlePath,
  searchQuery,
  isSelected,
  handleItemSelect,
  showItemsSectionLabel,
  showMoreOnClick,
  maxItems,
}: {
  items?: ItemType[];
  titlePath?: ReactNode[];
  texts: ItemPickerListTexts;
  isSelected: (item: ItemType) => boolean;
  handleItemSelect?: (item: ItemType) => void;
  showMoreOnClick?: () => void;
  searchQuery?: string;
  showItemsSectionLabel: boolean;
  maxItems?: number;
}) => {
  const sectionTitle = titlePath
    ? [getTitleItem(createTitleFromTitlePath(titlePath))]
    : getItemsSectionTitle(texts, showItemsSectionLabel, searchQuery);

  const results = items?.length
    ? [
        ...sectionTitle,
        ...items.map(item =>
          getListItem(item, isSelected, searchQuery, handleItemSelect, getInformationCardTooltip(item))
        ),
      ]
    : [];

  if (maxItems) {
    const maxItemsWithTitle = maxItems + (sectionTitle.length ? 1 : 0);
    const hasMore = results.splice(maxItemsWithTitle, Infinity);

    if (hasMore.length) {
      results.push(getShowMoreItem(texts.showMoreResultsLabel, showMoreOnClick));
    }
  }
  return results;
};

export const getFolderItems = <SectionType extends BaseSectionTypeWithFolders<BaseSectionType>>({
  handleSectionChange,
  sections,
}: {
  sections?: SectionType[];
  handleSectionChange: (section?: SectionType | BaseSectionType) => void;
}) => {
  return sections
    ? sections.reduce((itemsArray, section) => {
        const folderItemsWithTitle = section.folders?.length
          ? [
              getTitleItem(section.text),
              ...section.folders.map(folder => getFolderItem(folder, () => handleSectionChange(folder))),
            ]
          : [];

        return [...itemsArray, ...folderItemsWithTitle];
      }, [] as (ListItemProps | TitleListItemProps)[])
    : [];
};

export const getInformationCardTooltip = <ItemType extends BaseItemType>(item: ItemType) => {
  const { informationCardProps, renderHoverTooltip } = item;
  if (informationCardProps) {
    return () => {
      return <InformationCard {...informationCardProps} />;
    };
  }
  return renderHoverTooltip;
};
