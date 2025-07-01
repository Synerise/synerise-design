import React, {
  type UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type VariableSizeList } from 'react-window';
import { v4 as uuid } from 'uuid';

import { theme } from '@synerise/ds-core';
import Divider from '@synerise/ds-divider';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { ArrowRightCircleM, SearchM } from '@synerise/ds-icon';
import { itemSizes } from '@synerise/ds-list-item';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import Tabs from '@synerise/ds-tabs';
import {
  focusWithArrowKeys,
  getClosest,
  getGroupName,
  useOnClickOutside,
  useSearchResults,
} from '@synerise/ds-utils';

import {
  type ParameterDropdownProps,
  type ParameterGroup,
  type ParameterItem,
} from '../../Factors.types';
import {
  DROPDOWN_HEIGHT,
  ITEM_SIZE,
  LIST_STYLE,
  NO_GROUP_NAME,
  SEARCH_HEGIHT,
  SUBGROUP_HEADER_HEIGHT,
  TABS_HEIGHT,
} from './Parameter.constants';
import * as S from './Parameter.style';
import type {
  DropdownItem,
  MixedDropdownItemProps,
  ParameterDropdownTitleProps,
} from './Parameter.types';
import ParameterDropdownItem from './ParameterDropdownItem';
import { useGroups } from './useGroups';
import { groupItems } from './utils';

export type TitleItem = { type: 'title'; title: string };
export type DividerItem = { type: 'divider' };

const isListTitle = (
  element?: MixedDropdownItemProps,
): element is ParameterDropdownTitleProps => {
  return (element as ParameterDropdownTitleProps).title !== undefined;
};

const isDivider = (
  item: MixedDropdownItemProps | TitleItem | DividerItem,
): item is DividerItem => {
  return (item as DividerItem).type === 'divider';
};

const ParameterDropdown = ({
  setSelected,
  texts,
  groups,
  items,
  recentItems,
  setDropdownVisible,
  loading,
  onFetchData,
  hasMoreItems,
  outerHeight = DROPDOWN_HEIGHT,
  value,
  renderEmptyGroups = false,
  maxSearchResultsInGroup = 4,
}: ParameterDropdownProps) => {
  const listRef = useRef<VariableSizeList>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const { visibleGroups, tabs, defaultTab } = useGroups(
    items,
    groups,
    renderEmptyGroups,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(defaultTab);
  const [activeGroup, setActiveGroup] = useState<ParameterGroup | undefined>(
    undefined,
  );
  const [searchInputCanBeFocused, setSearchInputFocus] = useState(true);

  const classNames = useMemo(() => {
    return `ds-parameter-item ds-parameter-item-${uuid()}`;
  }, []);

  useOnClickOutside(overlayRef, (event) => {
    if (getClosest(event.target as HTMLElement, '.ds-info-card') === null) {
      setDropdownVisible(false);
    }
  });

  const currentTabItems = useMemo((): ParameterGroup | undefined => {
    return visibleGroups?.find((_group: ParameterGroup, index: number) => {
      return activeTab === index;
    });
  }, [visibleGroups, activeTab]);

  const resetList = React.useCallback(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0, false);
    }
  }, [listRef]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    resetList();
  }, [setSearchQuery, resetList]);

  const handleOnSetGroup = useCallback((item: ParameterGroup) => {
    setActiveGroup(item);
  }, []);

  const hideDropdown = useCallback(() => {
    setDropdownVisible(false);
    resetList();
  }, [setDropdownVisible, resetList]);

  const groupByGroupName = useCallback(
    (
      dropdownItems: (ParameterItem | ParameterGroup)[],
      maxItemsInGroup?: number,
    ): MixedDropdownItemProps[] => {
      const itemsNumber = dropdownItems?.length;
      const groupedItems = {};

      for (let i = 0; i < itemsNumber; i += 1) {
        const item = dropdownItems[i];
        const groupName = item.groupName || NO_GROUP_NAME;
        const group = groupedItems[groupName] || [];
        group.push(item);
        groupedItems[groupName] = group;
      }

      const resultItems: MixedDropdownItemProps[] = [];
      Object.keys(groupedItems).forEach((key: string) => {
        if (key !== NO_GROUP_NAME && !activeGroup) {
          resultItems.push({
            type: 'title',
            title: key,
          });
        }
        const maxGroupedItems = maxItemsInGroup
          ? groupedItems[key].slice(0, maxItemsInGroup)
          : groupedItems[key];
        maxGroupedItems.forEach((item: ParameterItem) => {
          const resultItem = !item.groupId
            ? {
                className: classNames,
                item,
                searchQuery,
                select: handleOnSetGroup,
              }
            : {
                className: classNames,
                item,
                searchQuery,
                clearSearch,
                hideDropdown,
                select: setSelected,
                selected: value && item.id === value?.id,
              };
          resultItems.push(resultItem);
        });
        if (maxItemsInGroup && groupedItems[key].length > maxItemsInGroup) {
          const anyItem = maxGroupedItems[0];
          resultItems.push({
            className: classNames,
            select: handleOnSetGroup,
            searchQuery,
            label: <S.ShowMoreItem>{texts.parameter.showMore}</S.ShowMoreItem>,
            item: {
              isGroup: true,
              id: anyItem.groupId,
              name: getGroupName(anyItem.groupId, groups || []) || '',
              icon: <ArrowRightCircleM />,
            } as ParameterGroup,
          });
        }
      });
      return resultItems;
    },
    [
      activeGroup,
      classNames,
      searchQuery,
      handleOnSetGroup,
      clearSearch,
      hideDropdown,
      setSelected,
      value,
      texts.parameter.showMore,
      groups,
    ],
  );

  const { searchResults } = useSearchResults(
    items || [],
    groups || [],
    activeTab,
    groupByGroupName,
    activeGroup,
    searchQuery,
    maxSearchResultsInGroup,
  );

  const mapItemToDropdownItem = React.useCallback(
    (item: ParameterItem) => {
      return {
        className: classNames,
        item,
        searchQuery,
        hideDropdown,
        select: setSelected,
      };
    },
    [classNames, searchQuery, hideDropdown, setSelected],
  );

  const currentItems = useMemo((): MixedDropdownItemProps[] | undefined => {
    if (searchQuery) {
      return searchResults;
    }
    const hasSubgroups = Boolean(currentTabItems?.subGroups);
    if (hasSubgroups && !activeGroup) {
      const groupedItems = (items || [])
        .filter((item: ParameterItem) => item.groupId === currentTabItems?.id)
        .map(mapItemToDropdownItem);
      const subGroups = (currentTabItems?.subGroups || []).map(
        (subGroup: ParameterGroup) => {
          return {
            className: classNames,
            item: subGroup,
            searchQuery,
            select: (group: ParameterGroup) => {
              setActiveGroup(group);
              resetList();
            },
          };
        },
      );

      return groupItems([...groupedItems, ...subGroups], activeGroup);
    }
    if (activeGroup) {
      return groupItems(
        (items || [])
          .filter((item: ParameterItem) => item.groupId === activeGroup.id)
          .map(mapItemToDropdownItem),
        activeGroup,
      );
    }

    if (activeTab && visibleGroups && visibleGroups[activeTab]) {
      return items
        ?.filter(
          (item: ParameterItem) =>
            item.groupId === (visibleGroups[activeTab] as ParameterGroup).id,
        )
        .map((item: ParameterItem) => {
          return {
            className: classNames,
            item,
            searchQuery,
            hideDropdown,
            select: setSelected,
          };
        });
    }

    if (activeTab && groups && groups[activeTab]) {
      return groupItems(
        (items || [])
          .filter(
            (item: ParameterItem) =>
              item.groupId === (groups[activeTab] as ParameterGroup).id,
          )
          .map(mapItemToDropdownItem),
        activeGroup,
      );
    }

    if ((recentItems || []).length > 0) {
      const recentItemsWithGroup = (recentItems || []).map((item) => ({
        ...item,
        groupName: texts.parameter.recentItemsGroupName,
      }));
      const itemsWithAllGroup = (items || []).map((item) => ({
        ...item,
        groupName: texts.parameter.allItemsGroupName,
      }));
      const result = groupByGroupName(
        recentItemsWithGroup.concat(itemsWithAllGroup),
      );

      return result;
    }

    return items?.map((item: ParameterItem) => {
      return {
        className: classNames,
        item,
        searchQuery,
        hideDropdown,
        select: setSelected,
      };
    });
  }, [
    searchQuery,
    currentTabItems,
    activeGroup,
    visibleGroups,
    items,
    searchResults,
    classNames,
    hideDropdown,
    setSelected,
    activeTab,
    groupByGroupName,
    recentItems,
    groups,
    mapItemToDropdownItem,
    resetList,
    texts.parameter.allItemsGroupName,
    texts.parameter.recentItemsGroupName,
  ]);

  const handleSearch = useCallback(
    (newSearchQuery: string) => {
      setSearchQuery(newSearchQuery);
    },
    [setSearchQuery],
  );

  const getNoResultContainer = useMemo(
    () => (
      <Result
        noSearchResults
        type="no-results"
        description={texts.parameter.noResults}
      />
    ),
    [texts],
  );

  const handleScroll = ({ currentTarget }: UIEvent) => {
    const { scrollTop } = currentTarget;
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  useEffect(() => {
    if (scrollBarRef.current && listRef.current) {
      scrollBarRef.current.scrollTo({ top: 0 });
      listRef.current.resetAfterIndex(0);
    }
  }, [searchQuery, activeGroup, activeTab]);

  const getItemSize = (index: number) => {
    const item = currentItems && currentItems[index];
    if (isListTitle(item)) {
      return ITEM_SIZE.title;
    }
    return ITEM_SIZE[itemSizes.DEFAULT];
  };

  const hasTabs = tabs.length > 1;
  const hasSearch = Boolean(searchQuery);

  const dropdownContentHeight = useMemo(() => {
    const fixedContentHeight =
      SEARCH_HEGIHT +
      (!hasSearch && hasTabs ? TABS_HEIGHT : 0) +
      (activeGroup ? SUBGROUP_HEADER_HEIGHT : 0);
    return outerHeight - fixedContentHeight;
  }, [activeGroup, hasSearch, hasTabs, outerHeight]);

  return (
    <Dropdown.Wrapper
      data-testid="ds-factors-parameter-dropdown-wrapper"
      style={{ width: '300px' }}
      ref={overlayRef}
      onKeyDown={(event) => {
        setSearchInputFocus(false);

        searchQuery &&
          focusWithArrowKeys(event, classNames.split(' ')[1], () => {
            setSearchInputFocus(true);
          });
      }}
    >
      <Dropdown.SearchInput
        onSearchChange={handleSearch}
        onClearInput={() => handleSearch('')}
        placeholder={texts.parameter.searchPlaceholder}
        value={searchQuery}
        autofocus={!searchQuery || searchInputCanBeFocused}
        autofocusDelay={50}
        iconLeft={
          <Icon component={<SearchM />} color={theme.palette['grey-600']} />
        }
      />
      {tabs.length > 1 && (
        <S.TabsWrapper>
          <Tabs
            block
            tabs={tabs}
            activeTab={activeTab}
            handleTabClick={(index: number) => {
              setActiveTab(index);
              setActiveGroup(undefined);
              resetList();
            }}
          />
        </S.TabsWrapper>
      )}
      {activeGroup && (
        <Dropdown.BackAction
          label={activeGroup.name}
          onClick={() => setActiveGroup(undefined)}
        />
      )}
      {loading ? (
        <S.Skeleton
          contentHeight={dropdownContentHeight}
          size="M"
          numberOfSkeletons={3}
        />
      ) : (
        <S.ItemsList contentHeight={dropdownContentHeight}>
          {currentItems?.length ? (
            <Scrollbar
              absolute
              style={{ padding: 8 }}
              loading={loading}
              hasMore={hasMoreItems}
              onYReachEnd={onFetchData}
              onScroll={handleScroll}
              maxHeight={dropdownContentHeight}
              ref={scrollBarRef}
            >
              <S.StyledList
                width="100%"
                height={300}
                itemCount={currentItems.length}
                itemSize={getItemSize}
                style={LIST_STYLE}
                ref={listRef}
              >
                {({ index, style }) => {
                  const listItem = currentItems[index];
                  if (listItem && isDivider(listItem)) {
                    return (
                      <div style={style}>
                        <Divider marginTop={8} marginBottom={8} />
                      </div>
                    );
                  }
                  return isListTitle(listItem) ? (
                    <S.Title style={style}>{listItem.title}</S.Title>
                  ) : (
                    <ParameterDropdownItem
                      style={style}
                      {...(listItem as DropdownItem<typeof listItem.item>)}
                    />
                  );
                }}
              </S.StyledList>
            </Scrollbar>
          ) : (
            getNoResultContainer
          )}
        </S.ItemsList>
      )}
    </Dropdown.Wrapper>
  );
};

export default ParameterDropdown;
