import React, {
  UIEvent,
  createRef,
  CSSProperties,
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import { VariableSizeList, VariableSizeList as List } from 'react-window';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys, getClosest, useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import { theme } from '@synerise/ds-core';
import { ItemSize } from '@synerise/ds-menu';

import * as S from '../ContextSelector.styles';
import {
  ContextDropdownProps,
  ContextGroup,
  ContextItem,
  ContextItemsInSubGroup,
  DropdownItemProps,
} from '../ContextSelector.types';
import ContextSelectorDropdownItem from './ContextSelectorDropdownItem';
import {
  NO_GROUP_NAME,
  ITEM_SIZE,
  DROPDOWN_HEIGHT,
  TABS_HEIGHT,
  SUBGROUP_HEADER_HEIGHT,
  SEARCH_HEIGHT,
} from '../constants';
import { isGroup, isListTitle } from './utils';

const ContextSelectorDropdown = ({
  texts,
  setSelected,
  onSetGroup,
  groups,
  items,
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
}: ContextDropdownProps) => {
  const listRef = createRef<VariableSizeList>();
  const listStyle: CSSProperties = { overflowX: 'unset', overflowY: 'unset' };
  const defaultTab = useMemo(() => {
    const defaultIndex = groups?.findIndex((group: ContextGroup) => group.defaultGroup);
    return defaultIndex || 0;
  }, [groups]);

  const overlayRef = useRef<HTMLDivElement>(null);

  const [searchInputHandle, setSearchInputHandle] = useState<MutableRefObject<HTMLInputElement | null>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [activeGroup, setActiveGroup] = useState<ContextGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = useState(true);
  const classNames = useMemo(() => {
    return `ds-context-item ds-context-item-${uuid()}`;
  }, []);

  const handleOnSetGroup = useCallback(
    (item: ContextItem | ContextGroup) => {
      if (isGroup(item)) {
        onSetGroup && onSetGroup(item);
        setActiveGroup(item);
      }
    },
    [onSetGroup]
  );

  useOnClickOutside(
    overlayRef,
    event => {
      if (getClosest(event.target as HTMLElement, '.ds-info-card') === null) {
        onClickOutside && onClickOutside();
        setDropdownVisible(false);
      }
    },
    onClickOutsideEvents
  );

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const hideDropdown = useCallback(() => {
    setDropdownVisible(false);
  }, [setDropdownVisible]);

  const currentTabItems = useMemo((): ContextGroup | undefined => {
    return groups?.find((group: ContextGroup, index: number) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const groupByGroupName = useCallback(
    (activeItems): DropdownItemProps[] => {
      const itemsNumber = activeItems.length;
      const groupedItems = {};

      for (let i = 0; i < itemsNumber; i += 1) {
        const item = activeItems[i];
        const groupName = item.groupName || NO_GROUP_NAME;
        const group = groupedItems[groupName] || [];
        group.push(item);
        groupedItems[groupName] = group;
      }

      const resultItems: DropdownItemProps[] = [];
      Object.keys(groupedItems).forEach((key: string) => {
        if (key !== NO_GROUP_NAME && !activeGroup) {
          resultItems.push({
            type: 'title',
            title: key,
          });
        }
        groupedItems[key].forEach((item: ContextItemsInSubGroup) => {
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
                hideDropdown,
                select: setSelected,
                selected: Boolean(value) && item.id === value?.id,
                menuItemHeight,
              };
          resultItems.push(resultItem);
        });
      });
      return resultItems;
    },
    [activeGroup, classNames, searchQuery, handleOnSetGroup, menuItemHeight, hideDropdown, setSelected, value]
  );

  const searchResults = useMemo(() => {
    const result = [];
    const itemsNumber = items.length;
    for (let i = 0; i < itemsNumber; i += 1) {
      const item = items[i];

      const searchQueryInLowerCase = searchQuery.toLowerCase();
      const isMatchingName = item.name?.toLowerCase().includes(searchQueryInLowerCase);
      const isMatchingSubtitle = item.subtitle?.toLowerCase().includes(searchQueryInLowerCase);
      const matching = !searchQuery || isMatchingName || isMatchingSubtitle;

      if (matching) {
        result.push({
          className: classNames,
          item,
          searchQuery,
          clearSearch,
          hideDropdown,
          select: setSelected,
          selected: Boolean(value) && item.id === value?.id,
          menuItemHeight,
        });
      }
    }

    return result;
  }, [classNames, clearSearch, hideDropdown, items, menuItemHeight, searchQuery, setSelected, value]);

  const hasSubgroups = useMemo(() => Boolean(currentTabItems?.subGroups), [currentTabItems]);

  const activeItems = useMemo((): DropdownItemProps[] => {
    if (!onSearch && searchQuery) {
      return searchResults;
    }
    if (hasSubgroups && !activeGroup) {
      const subGroups = currentTabItems?.subGroups
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

      return groupByGroupName([...subGroups, ...subItems]);
    }

    if (activeGroup) {
      return groupByGroupName(items?.filter((item: ContextItem) => activeGroup && item.groupId === activeGroup.id));
    }

    if (activeTab && groups && groups[activeTab]) {
      return groupByGroupName(
        items?.filter((item: ContextItem) => item.groupId === (groups[activeTab] as ContextGroup).id)
      );
    }
    return groupByGroupName(items);
  }, [
    activeGroup,
    activeTab,
    currentTabItems,
    groupByGroupName,
    groups,
    hasSubgroups,
    items,
    onSearch,
    searchQuery,
    searchResults,
  ]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    listRef.current?.resetAfterIndex(0, false);
  }, [activeItems, listRef]);

  const handleSearch = useCallback(
    val => {
      setSearchQuery(val);
      onSearch && onSearch(val);
    },
    [onSearch]
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
    return menuItemHeight ? ITEM_SIZE[menuItemHeight] : ITEM_SIZE[ItemSize.DEFAULT];
  };

  const dropdownContentHeight = useMemo(() => {
    return (
      outerHeight -
      (hasTabs && !searchQuery ? TABS_HEIGHT : 0) -
      (activeGroup ? SUBGROUP_HEADER_HEIGHT : 0) -
      SEARCH_HEIGHT
    );
  }, [activeGroup, hasTabs, outerHeight, searchQuery]);

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
          }}
          placeholder={texts.searchPlaceholder}
          value={searchQuery}
          autofocus={!searchQuery || searchInputCanBeFocused}
          autofocusDelay={50}
          handleInputRef={ref => setSearchInputHandle(ref)}
          iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        />
      )}
      {searchQuery === '' && hasTabs && (
        <S.TabsWrapper>
          <Tabs
            block
            tabs={getTabs}
            activeTab={activeTab}
            handleTabClick={(index: number) => {
              setActiveTab(index);
              setActiveGroup(undefined);
            }}
            visible={visible}
          />
        </S.TabsWrapper>
      )}
      {activeGroup && !searchQuery && (
        <Dropdown.BackAction label={activeGroup.name} onClick={() => setActiveGroup(undefined)} />
      )}

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
            >
              {/*
            // @ts-ignore */}
              <List
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
                  return item && isListTitle(item) ? (
                    <S.Title style={style}>{item.title}</S.Title>
                  ) : (
                    <ContextSelectorDropdownItem style={style} {...item} />
                  );
                }}
              </List>
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
