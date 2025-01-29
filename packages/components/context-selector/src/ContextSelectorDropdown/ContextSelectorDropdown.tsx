import React, {
  CSSProperties,
  MutableRefObject,
  UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { VariableSizeList } from 'react-window';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { ArrowRightCircleM, SearchM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import {
  focusWithArrowKeys,
  getClosest,
  useOnClickOutside,
  useSearchResults,
  getActiveTabGroup,
  getGroupName,
} from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import Divider from '@synerise/ds-divider';
import { theme } from '@synerise/ds-core';
import { itemSizes } from '@synerise/ds-list-item';

import * as S from '../ContextSelector.styles';
import {
  ContextDropdownProps,
  ContextGroup,
  ContextItem,
  ContextItemsInSubGroup,
  DropdownItemProps,
  ListDivider,
} from '../ContextSelector.types';
import ContextSelectorDropdownItem from './ContextSelectorDropdownItem';

import { NO_GROUP_NAME, DROPDOWN_HEIGHT, TABS_HEIGHT, SUBGROUP_HEADER_HEIGHT, SEARCH_HEIGHT } from '../constants';
import { isGroup, isListTitle } from './utils';

const ITEM_SIZE = {
  [itemSizes.LARGE]: 50,
  [itemSizes.DEFAULT]: 32,
  title: 32,
  divider: 16,
};

function isDivider(element: DropdownItemProps): element is ListDivider {
  return (element as ListDivider).type === 'divider';
}

const ContextSelectorDropdown = ({
  texts,
  setSelected,
  onSetGroup,
  groups,
  items,
  recentItems,
  setDropdownVisible,
  value,
  visible,
  hideSearchField = false,
  loading,
  menuItemHeight,
  dropdownWrapperStyles,
  onClickOutsideEvents,
  onClickOutside,
  onSearch,
  onFetchData,
  hasMoreItems,
  outerHeight = DROPDOWN_HEIGHT,
  maxSearchResultsInGroup = 4,
}: ContextDropdownProps) => {
  const listStyle: CSSProperties = { overflowX: 'unset', overflowY: 'unset' };
  const defaultTab = useMemo(() => {
    const defaultIndex = groups?.findIndex((group: ContextGroup) => group.defaultGroup);
    return defaultIndex || 0;
  }, [groups]);

  const listRef = useRef<VariableSizeList>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);

  const [searchInputHandle, setSearchInputHandle] = useState<MutableRefObject<HTMLInputElement | null>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [activeGroup, setActiveGroup] = useState<ContextGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = useState(true);
  const classNames = useMemo(() => {
    return `ds-context-item ds-context-item-${uuid()}`;
  }, []);

  const resetList = useCallback(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0, false);
    }
  }, [listRef]);

  const handleOnSetGroup = useCallback(
    (item: ContextItem | ContextGroup) => {
      if (isGroup(item)) {
        onSetGroup && onSetGroup(item);
        setActiveGroup(item);
        resetList();
      }
    },
    [onSetGroup, setActiveGroup, resetList]
  );

  useOnClickOutside(
    overlayRef,
    event => {
      if (getClosest(event.target as HTMLElement, '.ds-info-card') === null) {
        onClickOutside && onClickOutside();
        setDropdownVisible(false);
        resetList();
      }
    },
    onClickOutsideEvents
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    resetList();
  }, [setSearchQuery, resetList]);

  const hideDropdown = useCallback(() => {
    setDropdownVisible(false);
  }, [setDropdownVisible]);

  const handleSelect = useCallback(
    (parameter: ContextItem | ContextGroup) => {
      setSelected(parameter);
      setActiveGroup(undefined);
      setActiveTab(defaultTab);
    },
    [defaultTab, setSelected]
  );

  const currentTabItems = useMemo((): ContextGroup | undefined => {
    return groups ? getActiveTabGroup(activeTab, groups) : undefined;
  }, [groups, activeTab]);

  const groupByGroupName = useCallback(
    (dropdownItems: (ContextItemsInSubGroup | ContextGroup)[], maxItemsInGroup?: number): DropdownItemProps[] => {
      const itemsNumber = dropdownItems?.length;
      const groupedItems = {};

      for (let i = 0; i < itemsNumber; i += 1) {
        const item = dropdownItems[i];
        // @ts-ignore
        const groupName = item.groupName || NO_GROUP_NAME;
        const group = groupedItems[groupName] || [];
        group.push(item);
        groupedItems[groupName] = group;
      }

      const resultItems: DropdownItemProps[] = [];
      Object.keys(groupedItems).forEach((key: string, index) => {
        if (index > 0) {
          resultItems.push({
            type: 'divider',
          });
        }
        if (key !== NO_GROUP_NAME && !activeGroup) {
          resultItems.push({
            type: 'title',
            title: key,
          });
        }
        const groupItems = maxItemsInGroup ? groupedItems[key].slice(0, maxItemsInGroup) : groupedItems[key];
        groupItems.forEach((item: ContextItemsInSubGroup) => {
          const resultItem = item.isGroup
            ? {
                className: classNames,
                item,
                searchQuery,
                select: handleOnSetGroup,
                menuItemHeight,
              }
            : {
                className: classNames,
                item,
                searchQuery,
                clearSearch,
                hideDropdown,
                select: handleSelect,
                selected: Boolean(value) && item.id === value?.id,
                menuItemHeight,
              };
          resultItems.push(resultItem);
        });
        if (maxItemsInGroup && groupedItems[key].length > maxItemsInGroup) {
          const anyItem = groupItems[0];
          resultItems.push({
            className: classNames,
            select: handleOnSetGroup,
            menuItemHeight,
            label: <S.ShowMoreItem>{texts.showMore}</S.ShowMoreItem>,
            item: {
              isGroup: true,
              id: anyItem.groupId,
              name: getGroupName(anyItem.groupId, groups) || '',
              icon: <ArrowRightCircleM />,
            } as ContextGroup,
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
      menuItemHeight,
      clearSearch,
      hideDropdown,
      handleSelect,
      value,
      texts.showMore,
      groups,
    ]
  );

  const { searchResults } = useSearchResults(
    items,
    groups,
    activeTab,
    groupByGroupName,
    activeGroup,
    searchQuery,
    maxSearchResultsInGroup
  );

  const hasSubgroups = useMemo(() => Boolean(currentTabItems?.subGroups), [currentTabItems]);

  const activeItems = useMemo((): DropdownItemProps[] => {
    if (!onSearch && searchQuery) {
      return searchResults;
    }

    if (hasSubgroups && !activeGroup) {
      const subGroups = hasSubgroups
        ? currentTabItems?.subGroups?.map(group => ({
            ...group,
            isGroup: true,
          }))
        : [];
      const subItems = items?.reduce((prev: ContextItemsInSubGroup[], curr: ContextItem) => {
        if (curr.groupId === currentTabItems?.id) {
          prev.push({
            ...curr,
            isGroup: false,
          });
        }
        return prev;
      }, []);

      return groupByGroupName([...(subGroups || []), ...subItems]);
    }

    if (activeGroup) {
      return groupByGroupName(items?.filter((item: ContextItem) => activeGroup && item.groupId === activeGroup.id));
    }

    if (activeTab && groups && groups[activeTab]) {
      return groupByGroupName(
        items?.filter((item: ContextItem) => item.groupId === (groups[activeTab] as ContextGroup).id)
      );
    }

    if ((recentItems || []).length > 0) {
      const recentItemsWithGroup = (recentItems || []).map(item => ({
        ...item,
        groupName: texts.recentItemsGroupName,
      }));
      const itemsWithAllGroup = (items || []).map(item => ({
        ...item,
        groupName: texts.allItemsGroupName,
      }));
      const result = groupByGroupName(recentItemsWithGroup.concat(itemsWithAllGroup));

      return result;
    }

    return groupByGroupName(items);
  }, [
    onSearch,
    searchQuery,
    hasSubgroups,
    activeGroup,
    activeTab,
    groups,
    groupByGroupName,
    items,
    searchResults,
    currentTabItems?.subGroups,
    currentTabItems?.id,
    recentItems,
    texts.recentItemsGroupName,
    texts.allItemsGroupName,
  ]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    listRef.current?.resetAfterIndex(0, false);
  }, [activeItems, listRef]);

  const handleSearch = useCallback(
    (val: string) => {
      setSearchQuery(val);
      resetList();
      onSearch && onSearch(val);
    },
    [setSearchQuery, resetList, onSearch]
  );

  const getTabs = useMemo(() => {
    return (
      groups?.map((group: ContextGroup) => ({
        label: group.name,
      })) || []
    );
  }, [groups]);

  const hasTabs = getTabs.length > 1;

  const getNoResultContainer = useMemo(
    () => <Result noSearchResults type="no-results" description={texts.noResults} />,
    [texts]
  );

  const handleScroll = ({ currentTarget }: UIEvent) => {
    const { scrollTop } = currentTarget;
    if (listRef.current !== null) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  const getItemSize = (index: number) => {
    const item = activeItems[index];
    if (isListTitle(item)) return ITEM_SIZE.title;
    if (isDivider(item)) return ITEM_SIZE.divider;
    return menuItemHeight ? ITEM_SIZE[menuItemHeight] : ITEM_SIZE[itemSizes.DEFAULT];
  };

  const dropdownContentHeight = useMemo(() => {
    return (
      outerHeight -
      (hasTabs && !searchQuery ? TABS_HEIGHT : 0) -
      (activeGroup ? SUBGROUP_HEADER_HEIGHT : 0) -
      SEARCH_HEIGHT
    );
  }, [activeGroup, hasTabs, outerHeight, searchQuery]);

  useEffect(() => {
    if (scrollBarRef.current && listRef.current) {
      scrollBarRef.current.scrollTo({ top: 0 });
      listRef.current.resetAfterIndex(0);
    }
  }, [searchQuery, activeGroup, activeTab]);

  return (
    <Dropdown.Wrapper
      style={{ width: '300px', ...dropdownWrapperStyles }}
      ref={overlayRef}
      onKeyDown={event => {
        if (document?.activeElement === searchInputHandle?.current) {
          setSearchInputFocus(false);
        }
        searchQuery &&
          focusWithArrowKeys(event, classNames.split(' ')[1], () => {
            setSearchInputFocus(true);
          });
      }}
    >
      {!hideSearchField && (
        <Dropdown.SearchInput
          onSearchChange={handleSearch}
          onClearInput={() => {
            handleSearch('');
            onSearch && onSearch('');
            resetList();
          }}
          placeholder={texts.searchPlaceholder}
          value={searchQuery}
          autofocus={!searchQuery || searchInputCanBeFocused}
          autofocusDelay={50}
          handleInputRef={ref => setSearchInputHandle(ref)}
          iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        />
      )}
      {hasTabs && (
        <S.TabsWrapper>
          <Tabs
            block
            tabs={getTabs}
            activeTab={activeTab}
            handleTabClick={(index: number) => {
              setActiveTab(index);
              setActiveGroup(undefined);
              resetList();
            }}
            visible={visible}
          />
        </S.TabsWrapper>
      )}
      {activeGroup && <Dropdown.BackAction label={activeGroup.name} onClick={() => setActiveGroup(undefined)} />}
      {loading ? (
        <S.Skeleton contentHeight={dropdownContentHeight} size="M" numberOfSkeletons={3} />
      ) : (
        <S.ItemsList contentHeight={dropdownContentHeight}>
          {activeItems?.length ? (
            <Scrollbar
              absolute
              style={{ padding: 8 }}
              loading={loading}
              hasMore={hasMoreItems}
              onYReachEnd={onFetchData}
              onScroll={handleScroll}
              ref={scrollBarRef}
            >
              {/*
            // @ts-ignore */}
              <VariableSizeList
                className="ds-context-selector-list"
                key={`list-${activeGroup}-${activeTab}`}
                width="100%"
                height={300}
                itemCount={activeItems.length}
                itemSize={getItemSize}
                style={listStyle}
                ref={listRef}
              >
                {({ index, style }) => {
                  const item = activeItems[index];
                  if (item && isDivider(item)) {
                    return (
                      <div style={style}>
                        <Divider marginTop={8} marginBottom={8} />
                      </div>
                    );
                  }
                  return item && isListTitle(item) ? (
                    <S.Title style={style}>{item.title}</S.Title>
                  ) : (
                    <ContextSelectorDropdownItem style={style} {...item} />
                  );
                }}
              </VariableSizeList>
            </Scrollbar>
          ) : (
            getNoResultContainer
          )}
        </S.ItemsList>
      )}
    </Dropdown.Wrapper>
  );
};

export default ContextSelectorDropdown;
