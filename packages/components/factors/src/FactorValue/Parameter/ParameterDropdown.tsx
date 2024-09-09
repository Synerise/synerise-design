import React, { createRef, useRef, useState, useMemo, useCallback, ReactNode, UIEvent } from 'react';
import { v4 as uuid } from 'uuid';
import { FixedSizeList } from 'react-window';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys, useOnClickOutside, getClosest } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import { theme } from '@synerise/ds-core';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from './Parameter.style';

import { ParameterDropdownProps, ParameterGroup, ParameterItem } from '../../Factors.types';
import ParameterDropdownItem, { DropdownItem } from './ParameterDropdownItem';
import { DROPDOWN_HEIGHT, SEARCH_HEGIHT, TABS_HEIGHT, SUBGROUP_HEADER_HEIGHT, LIST_STYLE } from './constants';

const ParameterDropdown = ({
  setSelected,
  texts,
  groups,
  items,
  setDropdownVisible,
  loading,
  onFetchData,
  hasMoreItems,
  outerHeight = DROPDOWN_HEIGHT,
}: ParameterDropdownProps) => {
  const listRef = createRef<FixedSizeList>();
  const defaultTab = useMemo(() => {
    const defaultIndex = groups?.findIndex((group: ParameterGroup) => group.defaultGroup);
    return defaultIndex || 0;
  }, [groups]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(defaultTab);
  const [activeGroup, setActiveGroup] = useState<ParameterGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = useState(true);

  const classNames = useMemo(() => {
    return `ds-parameter-item ds-parameter-item-${uuid()}`;
  }, []);

  useOnClickOutside(overlayRef, event => {
    if (getClosest(event.target as HTMLElement, '.ds-info-card') === null) {
      setDropdownVisible(false);
    }
  });

  const currentTabItems = useMemo((): ParameterGroup | undefined => {
    return groups?.find((group: ParameterGroup, index) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleHideDropdown = useCallback(() => {
    setDropdownVisible(false);
  }, [setDropdownVisible]);

  const filteredItems = useMemo(() => {
    return items
      ?.filter((item: ParameterItem) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item: ParameterItem) => {
        return {
          className: classNames,
          item,
          searchQuery,
          clearSearch: handleClearSearch,
          hideDropdown: handleHideDropdown,
          select: setSelected,
        };
      });
  }, [items, searchQuery, classNames, handleClearSearch, handleHideDropdown, setSelected]);

  const currentItems = useMemo((): ReactNode[] | undefined => {
    if (searchQuery) {
      return filteredItems;
    }
    const hasSubgroups = Boolean(currentTabItems?.subGroups);
    if (hasSubgroups && !activeGroup) {
      return currentTabItems?.subGroups?.map((subGroup: ParameterGroup) => {
        return {
          className: classNames,
          item: subGroup,
          searchQuery,
          select: setActiveGroup,
        };
      });
    }
    if (activeGroup) {
      return items
        ?.filter((item: ParameterItem) => item.groupId === activeGroup.id)
        .map((item: ParameterItem) => {
          return {
            className: classNames,
            item,
            searchQuery,
            hideDropdown: handleHideDropdown,
            select: setSelected,
          };
        });
    }
    if (activeTab && groups && groups[activeTab]) {
      return items
        ?.filter((item: ParameterItem) => item.groupId === (groups[activeTab] as ParameterGroup).id)
        .map((item: ParameterItem) => {
          return {
            className: classNames,
            item,
            searchQuery,
            hideDropdown: handleHideDropdown,
            select: setSelected,
          };
        });
    }
    return items?.map((item: ParameterItem) => {
      return {
        className: classNames,
        item,
        searchQuery,
        hideDropdown: handleHideDropdown,
        select: setSelected,
      };
    });
  }, [
    searchQuery,
    currentTabItems,
    activeGroup,
    groups,
    items,
    filteredItems,
    classNames,
    handleHideDropdown,
    setSelected,
    activeTab,
  ]);

  const handleSearch = useCallback(
    value => {
      setSearchQuery(value);
    },
    [setSearchQuery]
  );

  const getTabs = useMemo(() => {
    return (
      groups?.map((group: ParameterGroup) => ({
        label: group.name,
        icon: group.icon,
      })) || []
    );
  }, [groups]);

  const getNoResultContainer = useMemo(
    () => <Result noSearchResults type="no-results" description={texts.parameter.noResults} />,
    [texts]
  );

  const handleScroll = ({ currentTarget }: UIEvent) => {
    const { scrollTop } = currentTarget;
    if (listRef.current !== null) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  const hasTabs = getTabs.length > 1;
  const hasSearch = Boolean(searchQuery);

  const dropdownContentHeight = useMemo(() => {
    const fixedContentHeight =
      SEARCH_HEGIHT + (!hasSearch && hasTabs ? TABS_HEIGHT : 0) + (activeGroup ? SUBGROUP_HEADER_HEIGHT : 0);
    return outerHeight - fixedContentHeight;
  }, [activeGroup, hasSearch, hasTabs, outerHeight]);

  return (
    <Dropdown.Wrapper
      data-testid="ds-factors-parameter-dropdown-wrapper"
      style={{ width: '300px' }}
      ref={overlayRef}
      onKeyDown={event => {
        setSearchInputFocus(false);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
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
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
      />
      {searchQuery === '' && getTabs.length > 1 && (
        <S.TabsWrapper>
          <Tabs
            block
            tabs={getTabs}
            activeTab={activeTab}
            handleTabClick={(index: number) => {
              setActiveTab(index);
              setActiveGroup(undefined);
            }}
          />
        </S.TabsWrapper>
      )}
      {activeGroup && <Dropdown.BackAction label={activeGroup.name} onClick={() => setActiveGroup(undefined)} />}
      {loading ? (
        <S.Skeleton contentHeight={dropdownContentHeight} size="M" numberOfSkeletons={3} />
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
            >
              <S.StyledList
                width="100%"
                height={300}
                itemCount={currentItems.length}
                itemSize={32}
                style={LIST_STYLE}
                ref={listRef}
              >
                {({ index, style }) => (
                  <ParameterDropdownItem style={style} {...(currentItems[index] as DropdownItem)} />
                )}
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
