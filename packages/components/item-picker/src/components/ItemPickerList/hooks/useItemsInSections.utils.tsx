import React, { type ReactNode } from 'react';

import Icon, { ArrowRightCircleM, FolderM } from '@synerise/ds-icon';
import InformationCard from '@synerise/ds-information-card';
import { type ListItemProps } from '@synerise/ds-list-item';

import {
  type ActionType,
  type BaseItemType,
  type BaseSectionType,
  type BaseSectionTypeWithFolders,
  type SearchActionType,
} from '../../ItemPickerNew/ItemPickerNew.types';
import {
  type ItemPickerListTexts,
  type TitleListItemProps,
} from '../ItemPickerList.types';
import { createTitleFromTitlePath, isTruthy } from '../utils';
import { getGlobalOrLocalSearchActionType } from '../utils/getGlobalOrLocalSearchActionType';

export const getFolderItem = (
  item: ListItemProps,
  onClick: ListItemProps['onClick'],
): ListItemProps => {
  return {
    ...item,
    prefixel: <Icon component={<FolderM />} />,
    onClick,
  };
};

export const getShowMoreItem = (
  label: ReactNode,
  onClick: ListItemProps['onClick'],
): ListItemProps => {
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
  renderHoverTooltip?: () => JSX.Element,
  isSearchParam?: boolean,
): ListItemProps => {
  return {
    ...item,
    highlight: !isSearchParam ? searchQuery : undefined,
    selected: isSelected(item),
    renderHoverTooltip,
    onClick: onItemSelect ? () => onItemSelect(item) : undefined,
  };
};

export const getActionItem = (
  action: ActionType & { onClick?: (action: ActionType) => void },
  searchQuery?: string,
): ListItemProps => {
  return {
    ...action,
    highlight: searchQuery,
    onClick:
      'onClick' in action && action.onClick
        ? () => action.onClick?.(action)
        : undefined,
  };
};

export const matchesSearchQuery = (text: ReactNode, searchQuery: string) => {
  return String(text).toLowerCase().includes(searchQuery.toLowerCase());
};

export const getItemsSectionTitle = (
  texts: ItemPickerListTexts,
  showItemsSectionLabel: boolean,
  searchQuery?: string,
) => {
  if (searchQuery) {
    return [getTitleItem(texts.resultsSectionLabel)];
  }
  return showItemsSectionLabel ? [getTitleItem(texts.itemsSectionLabel)] : [];
};

export const getActionItems = ({
  actions,
  texts,
  searchQuery,
  sectionId,
  setSearchActionSection,
  changeSearchQuery,
}: {
  actions?: ActionType[];
  texts: ItemPickerListTexts;
  searchQuery?: string;
  sectionId: string | undefined;
  setSearchActionSection: (value: SearchActionType | undefined) => void;
  changeSearchQuery: (query: string) => void;
}) => {
  const globalSearchByParameterAction = getGlobalOrLocalSearchActionType(
    actions,
    undefined,
  );
  const localSearchByParameterAction = getGlobalOrLocalSearchActionType(
    actions,
    sectionId,
  );

  const searchByParameterAction =
    localSearchByParameterAction || globalSearchByParameterAction;
  const searchByParameterActionVisible = searchByParameterAction?.searchParams
    ?.length
    ? searchByParameterAction
    : undefined;

  let isExistSearchByParameter = false;
  return actions?.length
    ? [
        getTitleItem(texts.actionsSectionLabel),
        ...actions.map((action) => {
          if (action.actionType === 'search') {
            if (isExistSearchByParameter) {
              return undefined;
            }
            isExistSearchByParameter = true;
            return searchByParameterActionVisible
              ? getActionItem(
                  {
                    ...searchByParameterActionVisible,
                    onClick: () => {
                      changeSearchQuery('');
                      setSearchActionSection(searchByParameterActionVisible);
                    },
                  },
                  searchQuery,
                )
              : undefined;
          }
          return getActionItem(action, searchQuery);
        }),
      ].filter(isTruthy)
    : [];
};

export const getSectionActionItems = ({
  actions,
  texts,
  sectionId,
  searchQuery,
  setSearchActionSection,
  changeSearchQuery,
}: {
  actions?: ActionType[];
  texts: ItemPickerListTexts;
  sectionId?: string;
  searchQuery?: string;
  setSearchActionSection: (value: SearchActionType | undefined) => void;
  changeSearchQuery: (query: string) => void;
}) => {
  const filteredActions = actions?.filter(
    (action) =>
      (action.actionType === 'search' || action.sectionId === sectionId) &&
      (!searchQuery || matchesSearchQuery(action.text, searchQuery)),
  );
  return getActionItems({
    actions: filteredActions,
    texts,
    searchQuery,
    sectionId,
    setSearchActionSection,
    changeSearchQuery,
  });
};

export const getRecentItems = <ItemType extends BaseItemType>({
  recents,
  texts,
  isSelected,
  handleItemSelect,
  searchQuery,
  isSearchParam,
}: {
  recents?: ItemType[];
  texts: ItemPickerListTexts;
  isSelected: (item: ItemType) => boolean;
  handleItemSelect?: (item: ItemType) => void;
  searchQuery?: string;
  isSearchParam: boolean;
}) => {
  return recents?.length && !searchQuery
    ? [
        getTitleItem(texts.recentsSectionLabel),
        ...recents.map((item) =>
          getListItem(
            item,
            isSelected,
            searchQuery,
            handleItemSelect,
            getInformationCardTooltip(item),
            isSearchParam,
          ),
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
  isSearchParam,
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
  isSearchParam: boolean;
}) => {
  const sectionTitle = titlePath
    ? [getTitleItem(createTitleFromTitlePath(titlePath))]
    : getItemsSectionTitle(texts, showItemsSectionLabel, searchQuery);

  const results = items?.length
    ? [
        ...sectionTitle,
        ...items.map((item) =>
          getListItem(
            item,
            isSelected,
            searchQuery,
            handleItemSelect,
            getInformationCardTooltip(item),
            isSearchParam,
          ),
        ),
      ]
    : [];

  if (maxItems) {
    const maxItemsWithTitle = maxItems + (sectionTitle.length ? 1 : 0);
    const hasMore = results.splice(maxItemsWithTitle, Infinity);

    if (hasMore.length) {
      results.push(
        getShowMoreItem(texts.showMoreResultsLabel, showMoreOnClick),
      );
    }
  }
  return results;
};

export const getFolderItems = <
  SectionType extends BaseSectionTypeWithFolders<BaseSectionType>,
>({
  handleSectionChange,
  sections,
}: {
  sections?: SectionType[];
  handleSectionChange: (section?: SectionType | BaseSectionType) => void;
}) => {
  return sections
    ? sections.reduce(
        (itemsArray, section) => {
          const folderItemsWithTitle = section.folders?.length
            ? [
                getTitleItem(section.text),
                ...section.folders.map((folder) =>
                  getFolderItem(folder, () => handleSectionChange(folder)),
                ),
              ]
            : [];

          return [...itemsArray, ...folderItemsWithTitle];
        },
        [] as (ListItemProps | TitleListItemProps)[],
      )
    : [];
};

export const getInformationCardTooltip = <ItemType extends BaseItemType>(
  item: ItemType,
) => {
  const { informationCardProps, renderHoverTooltip } = item;
  if (informationCardProps) {
    return () => {
      return <InformationCard {...informationCardProps} />;
    };
  }
  return renderHoverTooltip;
};
