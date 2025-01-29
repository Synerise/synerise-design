import React, { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { v4 as uuid } from 'uuid';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import { theme } from '@synerise/ds-core';

import OperatorsDropdownItem from './OperatorsDropdownItem';
import OperatorsDropdownGroupName from './OperatorsDropdownGroupName';
import * as S from '../Operators.style';
import { groupByGroupName } from '../utils';
import { NO_GROUP_NAME, DROPDOWN_HEIGHT, TABS_HEIGHT, PADDING, DEFAULT_TAB_INDEX, SEARCH_HEIGHT } from '../constants';
import { OperatorsDropdownProps, OperatorsGroup, OperatorsItem } from '../Operator.types';

const OperatorsDropdown = ({
  texts,
  setSelected,
  groups,
  items,
  setDropdownVisible,
  value,
  outerHeight = DROPDOWN_HEIGHT,
}: OperatorsDropdownProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(DEFAULT_TAB_INDEX);
  const [activeGroup, setActiveGroup] = useState<OperatorsGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = useState(true);

  useEffect(() => {
    const defaultIndex = groups?.findIndex(
      (group: OperatorsGroup) => group.defaultGroup || (value && group.id === value.groupId)
    );
    setActiveTab(defaultIndex === -1 ? DEFAULT_TAB_INDEX : defaultIndex);
  }, [groups, value]);

  const classNames = useMemo(() => {
    return `ds-operator-item ds-operator-item-${uuid()}`;
  }, []);

  useOnClickOutside(overlayRef, () => {
    setDropdownVisible(false);
  });

  const renderGroupedItems = useCallback(
    (activeItems: OperatorsItem[]) => {
      const groupedItems = groupByGroupName(activeItems);
      const renderedItems: JSX.Element[] = [];
      Object.keys(groupedItems).forEach((key: string) => {
        if (key !== NO_GROUP_NAME) {
          renderedItems.push(<OperatorsDropdownGroupName data-testid="operator-group-title" name={key} />);
        }
        groupedItems[key].forEach((item: OperatorsItem) =>
          renderedItems.push(
            <OperatorsDropdownItem
              className={classNames}
              key={uuid()}
              item={item}
              searchQuery={searchQuery}
              hideDropdown={(): void => setDropdownVisible(false)}
              select={setSelected}
              selected={Boolean(value) && item.id === value?.id}
            />
          )
        );
      });

      return renderedItems;
    },
    [searchQuery, setDropdownVisible, setSelected, value, classNames]
  );

  const currentTabItems = useMemo(() => {
    return groups?.find((group: OperatorsGroup, index: number) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const filteredItems = useMemo(
    () =>
      items
        .filter((item: OperatorsItem) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((item: OperatorsItem) => {
          return (
            <OperatorsDropdownItem
              className={classNames}
              key={item.name + item.groupId}
              item={item}
              searchQuery={searchQuery}
              clearSearch={(): void => setSearchQuery('')}
              hideDropdown={(): void => setDropdownVisible(false)}
              select={setSelected}
              selected={Boolean(value) && item.id === value?.id}
            />
          );
        }),
    [items, searchQuery, setDropdownVisible, setSelected, value, classNames]
  );

  const currentItems = useMemo(() => {
    if (searchQuery) {
      return filteredItems;
    }
    const hasSubgroups = Boolean(currentTabItems?.subGroups);
    if (hasSubgroups && !activeGroup) {
      return currentTabItems?.subGroups?.map((subGroup: OperatorsGroup) => {
        return (
          <OperatorsDropdownItem
            className={classNames}
            key={subGroup.name + subGroup.id}
            item={subGroup}
            searchQuery={searchQuery}
            select={setActiveGroup}
          />
        );
      });
    }

    if (activeGroup?.id) {
      return renderGroupedItems(items?.filter((item: OperatorsItem) => item.groupId === activeGroup.id));
    }
    return renderGroupedItems(
      items?.filter((item: OperatorsItem) => item.groupId === (groups[activeTab] as OperatorsGroup)?.id)
    );
  }, [
    currentTabItems,
    items,
    groups,
    searchQuery,
    activeTab,
    filteredItems,
    activeGroup,
    renderGroupedItems,
    classNames,
  ]);

  const handleSearch = useCallback(
    (val: string) => {
      setSearchQuery(val);
    },
    [setSearchQuery]
  );

  const getTabs = useMemo(() => {
    return (
      groups?.map((group: OperatorsGroup) => ({
        icon: group.icon,
        tooltip: group.tooltip,
      })) || []
    );
  }, [groups]);

  const hasTabs = getTabs.length > 1;

  const dropdownContentHeight = useMemo(() => {
    return outerHeight - (!searchQuery && hasTabs ? TABS_HEIGHT : 0) - SEARCH_HEIGHT;
  }, [hasTabs, searchQuery, outerHeight]);

  return (
    <Dropdown.Wrapper
      data-testid="ds-operators-dropdown-wrapper"
      style={{ width: '300px', zIndex: 1005 }}
      ref={overlayRef}
      onKeyDown={(e): void => {
        setSearchInputFocus(false);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        searchQuery &&
          focusWithArrowKeys(e, classNames.split(' ')[1], () => {
            setSearchInputFocus(true);
          });
      }}
    >
      <Dropdown.SearchInput
        onSearchChange={handleSearch}
        onClearInput={(): void => handleSearch('')}
        placeholder={texts.searchPlaceholder}
        value={searchQuery}
        autofocus={!searchQuery || searchInputCanBeFocused}
        autofocusDelay={50}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
      />
      {searchQuery === '' && hasTabs && (
        <S.TabsWrapper>
          <Tabs
            block
            tabs={getTabs}
            activeTab={activeTab}
            handleTabClick={(index: number): void => {
              setActiveTab(index);
              setActiveGroup(undefined);
            }}
          />
        </S.TabsWrapper>
      )}
      <S.ItemsList contentHeight={dropdownContentHeight}>
        <Scrollbar absolute maxHeight={dropdownContentHeight} style={{ padding: PADDING }}>
          {currentItems?.length ? (
            currentItems
          ) : (
            <Result noSearchResults type="no-results" description={texts.noResults} />
          )}
        </Scrollbar>
      </S.ItemsList>
    </Dropdown.Wrapper>
  );
};

export default OperatorsDropdown;
