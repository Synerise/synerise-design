import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys, useOnClickOutside, getClosest } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import { theme } from '@synerise/ds-core';
import Scrollbar from '@synerise/ds-scrollbar';
import { v4 as uuid } from 'uuid';
import DropdownSkeleton from '@synerise/ds-skeleton';
import { FixedSizeList, FixedSizeList as List } from 'react-window';
import * as S from './Parameter.style';
import { ParameterDropdownProps, ParameterGroup, ParameterItem } from '../../Factors.types';
import ParameterDropdownItem, { DropdownItem } from './ParameterDropdownItem';

const ParameterDropdown: React.FC<ParameterDropdownProps> = ({
  setSelected,
  texts,
  groups,
  items,
  setDropdownVisible,
  loading,
  onFetchData,
  hasMoreItems,
}) => {
  const listRef = React.createRef<FixedSizeList>();
  const listStyle: React.CSSProperties = { overflowX: 'unset', overflowY: 'unset' };
  const defaultTab = React.useMemo(() => {
    const defaultIndex = groups?.findIndex((group: ParameterGroup) => group.defaultGroup);
    return defaultIndex || 0;
  }, [groups]);

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<number>(defaultTab);
  const [activeGroup, setActiveGroup] = React.useState<ParameterGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = React.useState(true);

  const classNames = React.useMemo(() => {
    return `ds-parameter-item ds-parameter-item-${uuid()}`;
  }, []);

  useOnClickOutside(overlayRef, event => {
    if (getClosest(event.target as HTMLElement, '.ds-info-card') === null) {
      setDropdownVisible(false);
    }
  });

  const currentTabItems = React.useMemo((): ParameterGroup | undefined => {
    return groups?.find((group: ParameterGroup, index) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const handleClearSearch = React.useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleHideDropdown = React.useCallback(() => {
    setDropdownVisible(false);
  }, [setDropdownVisible]);

  const filteredItems = React.useMemo(() => {
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

  const currentItems = React.useMemo((): React.ReactNode[] | undefined => {
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

  const handleSearch = React.useCallback(
    value => {
      setSearchQuery(value);
    },
    [setSearchQuery]
  );

  const getTabs = React.useMemo(() => {
    return (
      groups?.map((group: ParameterGroup) => ({
        label: group.name,
        icon: group.icon,
      })) || []
    );
  }, [groups]);

  const getNoResultContainer = React.useMemo(
    () => <Result noSearchResults type="no-results" description={texts.parameter.noResults} />,
    [texts]
  );

  const handleScroll = ({ currentTarget }: React.UIEvent): void => {
    const { scrollTop } = currentTarget;
    if (listRef.current !== null) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  return (
    <Dropdown.Wrapper
      style={{ width: '300px' }}
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
            handleTabClick={(index: number): void => {
              setActiveTab(index);
              setActiveGroup(undefined);
            }}
          />
        </S.TabsWrapper>
      )}
      {activeGroup && <Dropdown.BackAction label={activeGroup.name} onClick={(): void => setActiveGroup(undefined)} />}
      {loading ? (
        <DropdownSkeleton size="M" />
      ) : (
        <S.ItemsList>
          {currentItems?.length ? (
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
                className="ds-factors-parameter-list"
                width="100%"
                height={300}
                itemCount={currentItems.length}
                itemSize={32}
                style={listStyle}
                ref={listRef}
              >
                {({ index, style }) => (
                  <ParameterDropdownItem style={style} {...(currentItems[index] as DropdownItem)} />
                )}
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

export default ParameterDropdown;
