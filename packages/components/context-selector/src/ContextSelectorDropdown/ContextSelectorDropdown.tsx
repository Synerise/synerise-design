import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';

import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import Loader from '@synerise/ds-loader';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { v4 as uuid } from 'uuid';
import { VariableSizeList, VariableSizeList as List } from 'react-window';

import { ItemSize } from '@synerise/ds-menu';
import type { MenuItemProps } from '@synerise/ds-menu/src/Elements/Item/MenuItem.types';
import type { MaybePopoverProps } from '@synerise/ds-menu/src/Elements/Item/Text/Text';

import * as S from '../ContextSelector.styles';
import {
  ContextDropdownProps,
  ContextGroup,
  ContextItem,
  ContextItemsInSubGroup,
  DropdownItemProps,
  ListTitle,
} from '../ContextSelector.types';
import ContextSelectorDropdownItem from './ContextSelectorDropdownItem';

const NO_GROUP_NAME = 'NO_GROUP_NAME';
const ITEM_SIZE = {
  [ItemSize.LARGE]: 50,
  [ItemSize.DEFAULT]: 32,
  title: 32,
};

function isListTitle(element: DropdownItemProps): element is ListTitle {
  return (element as ListTitle).title !== undefined;
}

const ContextSelectorDropdown: React.FC<ContextDropdownProps> = ({
  texts,
  setSelected,
  onSetGroup,
  groups,
  items,
  setDropdownVisible,
  value,
  visible,
  loading,
  menuItemHeight,
  dropdownWrapperStyles,
  onClickOutsideEvents,
  onClickOutside,
  onSearch,
  onFetchData,
  hasMoreItems,
}) => {
  const listRef = React.createRef<VariableSizeList>();
  // const listContainer = React.useRef<HTMLElement>();
  const poopoverRef = React.useRef<Record<string, HTMLElement>>({});
  const listStyle: React.CSSProperties = { overflowX: 'unset', overflowY: 'unset' };
  const defaultTab = React.useMemo(() => {
    const defaultIndex = groups?.findIndex((group: ContextGroup) => group.defaultGroup);
    return defaultIndex || 0;
  }, [groups]);

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<number>(defaultTab);
  const [activeGroup, setActiveGroup] = React.useState<ContextGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = React.useState(true);
  // const [popoverVisibilityCounter, setPopoverVisibilityCounter] = React.useState(0);
  const classNames = React.useMemo(() => {
    return `ds-context-item ds-context-item-${uuid()}`;
  }, []);

  const handleOnSetGroup = React.useCallback(
    (item: ContextItem | ContextGroup) => {
      onSetGroup && onSetGroup(item);
      setActiveGroup(item);
    },
    [onSetGroup]
  );

  useOnClickOutside(
    overlayRef,
    () => {
      if (onClickOutside && onClickOutside()) {
        // if callback returned non-false value - terminate hiding dropdown
        return;
      }
      console.info('setting dropdown visibile to false')
      setDropdownVisible(false);
      // if (popoverVisibilityCounter === 0) {
      //   setDropdownVisible(false);
      // } else {
      //   setTimeout(() => {
      //     setDropdownVisible(false);
      //   }, 3000);
      // }
    },
    onClickOutsideEvents,
    // [...Object.values(poopoverRef.current)]
    poopoverRef
  );

  const clearSearch = React.useCallback(() => {
    setSearchQuery('');
  }, []);

  const hideDropdown = React.useCallback(() => {
    setDropdownVisible(false);
  }, [setDropdownVisible]);

  const currentTabItems = React.useMemo((): ContextGroup | undefined => {
    return groups?.find((group: ContextGroup, index: number) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const groupByGroupName = React.useCallback(
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

  const searchResults = React.useMemo(() => {
    const result = [];
    const itemsNumber = items.length;
    for (let i = 0; i < itemsNumber; i += 1) {
      const item = items[i];
      const matching = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase());
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

  const hasSubgroups = React.useMemo(() => Boolean(currentTabItems?.subGroups), [currentTabItems]);

  const activeItems = React.useMemo((): DropdownItemProps[] => {
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

  React.useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    listRef.current?.resetAfterIndex(0, false);
  }, [activeItems, listRef]);

  const handleSearch = React.useCallback(
    val => {
      setSearchQuery(val);
      onSearch && onSearch(val);
    },
    [onSearch]
  );

  const getTabs = React.useMemo(() => {
    return (
      groups?.map((group: ContextGroup) => ({
        label: group.name,
      })) || []
    );
  }, [groups]);

  const getNoResultContainer = React.useMemo(
    () => <Result noSearchResults type="no-results" description={texts.noResults} />,
    [texts]
  );

  const handleScroll = ({ currentTarget }: React.UIEvent): void => {
    const { scrollTop } = currentTarget;
    if (listRef.current !== null) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  const getItemSize = (index: number): number => {
    const item = activeItems[index];
    if (isListTitle(item)) return ITEM_SIZE.title;
    return menuItemHeight ? ITEM_SIZE[menuItemHeight] : ITEM_SIZE[ItemSize.DEFAULT];
  };

  return (
    <Dropdown.Wrapper
      style={{ width: '300px', ...dropdownWrapperStyles }}
      ref={overlayRef}
      onKeyDown={(e): void => {
        setSearchInputFocus(false);
        searchQuery &&
          focusWithArrowKeys(e, classNames.split(' ')[1], () => {
            setSearchInputFocus(true);
          });
      }}
    >
      <Dropdown.SearchInput
        onSearchChange={handleSearch}
        onClearInput={(): void => {
          handleSearch('');
          onSearch && onSearch('');
        }}
        placeholder={texts.searchPlaceholder}
        value={searchQuery}
        autofocus={!searchQuery || searchInputCanBeFocused}
        autofocusDelay={50}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
      />
      {searchQuery === '' && getTabs.length > 1 && (
        <S.TabsWrapper>
          <Tabs
            block
            tabs={getTabs}
            activeTab={activeTab}
            handleTabClick={(index: number): void => {
              setActiveTab(index);
              setActiveGroup(undefined);
            }}
            visible={visible}
          />
        </S.TabsWrapper>
      )}
      {activeGroup && !searchQuery && (
        <Dropdown.BackAction label={activeGroup.name} onClick={(): void => setActiveGroup(undefined)} />
      )}

      {loading ? (
        <S.LoaderWrapper>
          <Loader label={texts.loadingResults} labelPosition="bottom" />
        </S.LoaderWrapper>
      ) : (
        <S.ItemsList>
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
                width="100%"
                height={300}
                itemCount={activeItems.length}
                itemSize={getItemSize}
                style={listStyle}
                ref={listRef}
              >
                {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
                {({ index, style }) => {
                  const item = activeItems[index];
                  if (item && isListTitle(item)) {
                    return (<S.Title style={style}>{item.title}</S.Title>);
                  }
                  // if (listContainer.current) {
                  //   nonTitleItem.popoverProps.getPopupContainer = () => listContainer.current
                  // }
                  console.info('123', item)
                  if (overlayRef.current && item) {
                    // This seems to be the only place where we can inject `overlayRef`.
                    // const nonTitleItem = (item as ContextItem);
                    // const { popoverProps || 'item.popoverProps' } = (item as unknown as ContextItem);
                    let { popoverProps } = (item as unknown as ContextItem);
                    popoverProps = popoverProps || item.popoverProps || item.item.popoverProps
                    // if (popoverProps && popoverProps.getPopupContainer === undefined) {
                    console.info('456', popoverProps)
                    if (popoverProps as MenuItemProps as MaybePopoverProps['popoverProps']) {
                      // popoverProps.getPopupContainer = (): HTMLElement => overlayRef.current as HTMLElement;
                      console.info('set item\'s popover getpopupcontainer to', overlayRef.current)
                      popoverProps.ref2 = el => {
                        console.info('setting ref', index, el)
                        // poopoverRef[index] = el
                        // poopoverRef.current[index] = el
                        // eslint-disable-next-line react/no-find-dom-node
                        const domEl = ReactDOM.findDOMNode(el)
                        poopoverRef.current[index] = domEl
                        console.info('current infocard refs', poopoverRef.current, domEl)
                      }
                    }
                  }
                  // const contextitem = (item as unknown as ContextItem)
                  // COUNTING CLICKS
                  // if ((item.item as ContextItem).popoverProps) {
                  //   (item.item as ContextItem).popoverProps.onVisibleChange = (isVisible: boolean): void => {
                  //     console.info('visibility', isVisible)
                  //     setPopoverVisibilityCounter(c => c + (isVisible ? 1 : -1))
                  //   }
                  // }
                  // COUNTING CLICKS
                  return (
                    // <ContextSelectorDropdownItem style={style} {...item} />
                    // <ContextSelectorDropdownItem style={style} {...item.buildItemProps(item, listRef)} />
                    // <ContextSelectorDropdownItem style={style} {...nonTitleItem} />
                    // <ContextSelectorDropdownItem style={style} {...{
                    //   ...item,
                    //   item: {
                    //     ...item.item,
                    //     popoverProps: {
                    //       ...(item.item as unknown as ContextItem).popoverProps,
                    //       getPopupContainer: (): HTMLElement => overlayRef.current as HTMLElement,
                    //     },
                    //   },
                    //   popoverProps_off: {
                    //     ...(item as unknown as ContextItem).popoverProps,
                    //     getPopupContainer: (): HTMLElement => overlayRef.current as HTMLElement,
                    //   },
                    // }} />
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
