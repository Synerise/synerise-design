import React, {
  type CSSProperties,
  type MutableRefObject,
  type UIEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { VariableSizeList } from 'react-window';
import { v4 as uuid } from 'uuid';

import { theme } from '@synerise/ds-core';
import Divider from '@synerise/ds-divider';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { ArrowRightCircleM, SearchM } from '@synerise/ds-icon';
import { ListContextProvider, itemSizes } from '@synerise/ds-list-item';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import Tabs from '@synerise/ds-tabs';
import {
  focusWithArrowKeys,
  getActiveTabGroup,
  getGroupName,
  useSearchResults,
} from '@synerise/ds-utils';

import * as S from '../ContextSelector.styles';
import {
  type ContextDropdownProps,
  type ContextGroup,
  type ContextItem,
  type ContextItemsInSubGroup,
  type DropdownItemProps,
  type ListDivider,
  isContextItemsInSubGroup,
} from '../ContextSelector.types';
import { DROPDOWN_HEIGHT, NO_GROUP_NAME } from '../constants';
import ContextSelectorDropdownItem from './ContextSelectorDropdownItem';
import {
  getDropdownContentHeight,
  getListWindowHeight,
  isGroup,
  isListTitle,
} from './utils';

const ITEM_SIZE = {
  [itemSizes.LARGE]: 50,
  [itemSizes.DEFAULT]: 32,
  title: 32,
  divider: 16,
};

const FOCUSABLE_SELECTOR =
  'button, [role="button"], a[href], input, select, textarea, [contenteditable="true"], [tabindex]:not([tabindex="-1"])';

function isDivider(element: DropdownItemProps): element is ListDivider {
  return (element as ListDivider).type === 'divider';
}

const VirtualizedRow = ({
  index,
  style,
  data,
}: {
  index: number;
  style: CSSProperties;
  data: { items: DropdownItemProps[] };
}) => {
  const item = data.items[index];
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
};

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
  onSearch,
  onFetchData,
  hasMoreItems,
  outerHeight = DROPDOWN_HEIGHT,
  popoverDelay,
  maxSearchResultsInGroup = 4,
}: ContextDropdownProps) => {
  const listStyle: CSSProperties = { overflowX: 'unset', overflowY: 'unset' };
  const defaultTab = useMemo(() => {
    const defaultIndex = groups?.findIndex(
      (group: ContextGroup) => group.defaultGroup,
    );
    return defaultIndex || 0;
  }, [groups]);

  const listRef = useRef<VariableSizeList>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollBarRef = useRef<HTMLDivElement>(null);
  const topSectionRef = useRef<HTMLDivElement>(null);

  const [searchInputHandle, setSearchInputHandle] =
    useState<MutableRefObject<HTMLInputElement | null>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [activeGroup, setActiveGroup] = useState<ContextGroup | undefined>(
    undefined,
  );
  const [searchInputCanBeFocused, setSearchInputFocus] = useState(true);
  const [topSectionHeight, setTopSectionHeight] = useState(0);
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
    [onSetGroup, setActiveGroup, resetList],
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
    [defaultTab, setSelected],
  );

  const currentTabItems = useMemo((): ContextGroup | undefined => {
    return groups ? getActiveTabGroup(activeTab, groups) : undefined;
  }, [groups, activeTab]);

  const activeTopSection =
    !searchQuery && !activeGroup ? currentTabItems?.topSection : undefined;

  useLayoutEffect(() => {
    const node = topSectionRef.current;
    if (!node) {
      setTopSectionHeight(0);
      return undefined;
    }
    const measure = () => setTopSectionHeight(node.offsetHeight);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [activeTopSection, activeTab]);

  const groupByGroupName = useCallback(
    (
      dropdownItems: (ContextItemsInSubGroup | ContextGroup)[],
      maxItemsInGroup?: number,
    ): DropdownItemProps[] => {
      const itemsNumber = dropdownItems?.length;
      const groupedItems: Record<
        string,
        (ContextItemsInSubGroup | ContextGroup)[]
      > = {};

      for (let i = 0; i < itemsNumber; i += 1) {
        const item = dropdownItems[i];
        // @ts-expect-error Property 'groupName' does not exist on type 'ContextGroup
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
        const groupItems = maxItemsInGroup
          ? groupedItems[key].slice(0, maxItemsInGroup)
          : groupedItems[key];
        groupItems.forEach((item: ContextItemsInSubGroup | ContextGroup) => {
          const resultItem = isContextItemsInSubGroup(item)
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
          const anyItem = groupItems[0] as ContextItemsInSubGroup;
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
    ],
  );

  const { searchResults } = useSearchResults(
    items,
    groups,
    activeTab,
    groupByGroupName,
    activeGroup,
    searchQuery,
    maxSearchResultsInGroup,
  );

  const hasSubgroups = useMemo(
    () => Boolean(currentTabItems?.subGroups),
    [currentTabItems],
  );

  const activeItems = useMemo((): DropdownItemProps[] => {
    if (!onSearch && searchQuery) {
      return searchResults;
    }

    if (hasSubgroups && !activeGroup) {
      const subGroups = hasSubgroups
        ? currentTabItems?.subGroups?.map((group) => ({
            ...group,
            isGroup: true,
          }))
        : [];
      const subItems = items?.reduce(
        (prev: ContextItemsInSubGroup[], curr: ContextItem) => {
          if (curr.groupId === currentTabItems?.id) {
            prev.push({
              ...curr,
              isGroup: false,
            });
          }
          return prev;
        },
        [],
      );

      return groupByGroupName([...(subGroups || []), ...subItems]);
    }

    if (activeGroup) {
      return groupByGroupName(
        items?.filter(
          (item: ContextItem) => activeGroup && item.groupId === activeGroup.id,
        ),
      );
    }

    if (activeTab && groups && groups[activeTab]) {
      return groupByGroupName(
        items?.filter(
          (item: ContextItem) =>
            item.groupId === (groups[activeTab] as ContextGroup).id,
        ),
      );
    }

    if ((recentItems || []).length > 0) {
      const recentItemsWithGroup = (recentItems || []).map((item) => ({
        ...item,
        groupName: texts.recentItemsGroupName,
      }));
      const itemsWithAllGroup = (items || []).map((item) => ({
        ...item,
        groupName: texts.allItemsGroupName,
      }));
      const result = groupByGroupName(
        recentItemsWithGroup.concat(itemsWithAllGroup),
      );

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
    listRef.current?.resetAfterIndex(0, false);
  }, [activeItems, listRef]);

  const itemData = useMemo(() => ({ items: activeItems }), [activeItems]);

  const handleSearch = useCallback(
    (val: string) => {
      setSearchQuery(val);
      resetList();
      onSearch && onSearch(val);
    },
    [setSearchQuery, resetList, onSearch],
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
    () => (
      <Result noSearchResults type="no-results" description={texts.noResults} />
    ),
    [texts],
  );

  const handleScroll = ({ currentTarget }: UIEvent) => {
    const { scrollTop } = currentTarget;
    if (listRef.current !== null) {
      listRef.current.scrollTo(Math.max(0, scrollTop - topSectionHeight));
    }
  };

  const getItemSize = (index: number) => {
    const item = activeItems[index];
    if (isListTitle(item)) {
      return ITEM_SIZE.title;
    }
    if (isDivider(item)) {
      return ITEM_SIZE.divider;
    }
    return menuItemHeight
      ? ITEM_SIZE[menuItemHeight]
      : ITEM_SIZE[itemSizes.DEFAULT];
  };

  const dropdownContentHeight = useMemo(() => {
    return getDropdownContentHeight({
      outerHeight,
      hasTabs,
      hasSearchQuery: Boolean(searchQuery),
      hasActiveGroup: Boolean(activeGroup),
    });
  }, [activeGroup, hasTabs, outerHeight, searchQuery]);

  useEffect(() => {
    if (scrollBarRef.current && listRef.current) {
      scrollBarRef.current.scrollTo({ top: 0 });
      listRef.current.resetAfterIndex(0);
    }
  }, [searchQuery, activeGroup, activeTab]);

  const previousTabRef = useRef({ activeTab, activeGroup });
  useEffect(() => {
    const previous = previousTabRef.current;
    if (
      previous.activeTab !== activeTab ||
      previous.activeGroup !== activeGroup
    ) {
      previousTabRef.current = { activeTab, activeGroup };
      searchInputHandle?.current?.focus();
    }
  }, [activeTab, activeGroup, searchInputHandle]);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }
    const recoverLostFocus = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
        return;
      }
      if (document.activeElement !== document.body) {
        return;
      }
      const overlay = overlayRef.current;
      if (!overlay) {
        return;
      }
      const navClass = classNames.split(' ')[1];
      const firstRenderedRow = overlay.querySelector<HTMLElement>(
        `.${navClass}`,
      );
      const target = firstRenderedRow ?? searchInputHandle?.current ?? null;
      if (target) {
        event.preventDefault();
        target.focus();
      }
    };
    document.addEventListener('keydown', recoverLostFocus);
    return () => document.removeEventListener('keydown', recoverLostFocus);
  }, [visible, classNames, searchInputHandle]);

  return (
    <Dropdown.Wrapper
      style={dropdownWrapperStyles}
      ref={overlayRef}
      data-testid="context-selector-dropdown"
      onKeyDown={(event) => {
        const searchInput = searchInputHandle?.current ?? null;
        if (document?.activeElement === searchInput) {
          setSearchInputFocus(false);
        }

        if (event.key === 'ArrowUp' && document.activeElement === searchInput) {
          event.preventDefault();
          return;
        }

        const navClass = classNames.split(' ')[1];
        const active = document.activeElement as HTMLElement | null;
        const topSectionItems = topSectionRef.current
          ? Array.from(
              topSectionRef.current.querySelectorAll<HTMLElement>(
                FOCUSABLE_SELECTOR,
              ),
            )
          : [];
        const firstListItem =
          overlayRef.current?.querySelector<HTMLElement>(`.${navClass}`) ??
          null;
        const topIndex = active ? topSectionItems.indexOf(active) : -1;
        const activeIsListItem = Boolean(active?.classList?.contains(navClass));

        if (topIndex !== -1) {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            const nextIndex =
              event.key === 'ArrowRight'
                ? Math.min(topIndex + 1, topSectionItems.length - 1)
                : Math.max(topIndex - 1, 0);
            topSectionItems[nextIndex].focus();
            return;
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setSearchInputFocus(true);
            searchInput?.focus();
            return;
          }
          if (event.key === 'Enter') {
            event.preventDefault();
            active?.click();
            return;
          }
        }

        if (
          event.key === 'ArrowDown' &&
          topIndex === -1 &&
          !activeIsListItem &&
          topSectionItems.length
        ) {
          event.preventDefault();
          topSectionItems[0].focus();
          return;
        }

        if (event.key === 'ArrowUp' && active === firstListItem) {
          event.preventDefault();
          if (topSectionItems.length) {
            topSectionItems[0].focus();
          } else {
            setSearchInputFocus(true);
            searchInput?.focus();
          }
          return;
        }

        focusWithArrowKeys(event, navClass, () => {
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
          handleInputRef={setSearchInputHandle}
          iconLeft={
            <Icon component={<SearchM />} color={theme.palette['grey-600']} />
          }
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
              {activeTopSection && (
                <div ref={topSectionRef}>{activeTopSection}</div>
              )}
              <ListContextProvider popoverDelay={popoverDelay}>
                <VariableSizeList
                  className="ds-context-selector-list"
                  key={`list-${activeGroup}-${activeTab}`}
                  width="100%"
                  height={getListWindowHeight(dropdownContentHeight)}
                  itemCount={activeItems.length}
                  itemSize={getItemSize}
                  style={listStyle}
                  ref={listRef}
                  overscanCount={8}
                  itemData={itemData}
                >
                  {VirtualizedRow}
                </VariableSizeList>
              </ListContextProvider>
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
