import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { SearchM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import Loader from '@synerise/ds-loader';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { v4 as uuid } from 'uuid';
import * as S from '../ContextSelector.styles';
import { ContextDropdownProps, ContextGroup, ContextItem, ContextItemsInSubGroup } from '../ContextSelector.types';
import ContextSelectorDropdownItem from './ContextSelectorDropdownItem';

const NO_GROUP_NAME = 'NO_GROUP_NAME';

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
}) => {
  const defaultTab = React.useMemo(() => {
    const defaultIndex = groups?.findIndex((group: ContextGroup) => group.defaultGroup);
    return defaultIndex || 0;
  }, [groups]);

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<number>(defaultTab);
  const [activeGroup, setActiveGroup] = React.useState<ContextGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = React.useState(true);
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

  useOnClickOutside(overlayRef, () => {
    setDropdownVisible(false);
  });

  const groupByGroupName = React.useCallback(
    activeItems => {
      const groupedItems = activeItems.reduce((result: {}, item: ContextItem) => {
        const res = result;
        const groupName = item.groupName || NO_GROUP_NAME;
        res[groupName] = (result[groupName] || []).concat(item);
        return res;
      }, {});
      const resultItems: React.ReactNode[] = [];
      Object.keys(groupedItems).forEach((key: string) => {
        if (key !== NO_GROUP_NAME && !activeGroup) {
          resultItems.push(<S.Title>{key}</S.Title>);
        }
        groupedItems[key].forEach((item: ContextItemsInSubGroup) => {
          const resultItem = item.isGroup ? (
            <ContextSelectorDropdownItem
              className={classNames}
              key={item.name + item.id}
              item={item}
              searchQuery={searchQuery}
              select={handleOnSetGroup}
              menuItemHeight={menuItemHeight}
            />
          ) : (
            <ContextSelectorDropdownItem
              className={classNames}
              key={item.name + item.id + item.groupId}
              item={item}
              searchQuery={searchQuery}
              hideDropdown={(): void => setDropdownVisible(false)}
              select={setSelected}
              selected={Boolean(value) && item.id === value?.id}
              menuItemHeight={menuItemHeight}
            />
          );
          resultItems.push(resultItem);
        });
      });
      return resultItems;
    },
    [activeGroup, classNames, searchQuery, setSelected, value, setDropdownVisible, handleOnSetGroup, menuItemHeight]
  );

  const currentTabItems = React.useMemo((): ContextGroup | undefined => {
    return groups?.find((group: ContextGroup, index: number) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const filteredItems = React.useMemo(() => {
    return items
      ?.filter((item: ContextItem) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item: ContextItem) => {
        return (
          <ContextSelectorDropdownItem
            className={classNames}
            key={item.name + item.id + item.groupId}
            item={item}
            searchQuery={searchQuery}
            clearSearch={(): void => setSearchQuery('')}
            hideDropdown={(): void => setDropdownVisible(false)}
            select={setSelected}
            selected={Boolean(value) && item.id === value?.id}
          />
        );
      });
  }, [items, searchQuery, setDropdownVisible, setSelected, value, classNames]);

  const currentItems = React.useMemo((): React.ReactNode[] | undefined => {
    if (searchQuery) {
      return filteredItems;
    }
    const hasSubgroups = Boolean(currentTabItems?.subGroups);
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
      return groupByGroupName(items?.filter((item: ContextItem) => item.groupId === activeGroup.id));
    }

    return groupByGroupName(
      items?.filter((item: ContextItem) => item.groupId === (groups[activeTab] as ContextGroup).id)
    );
  }, [currentTabItems, items, groups, searchQuery, activeTab, filteredItems, activeGroup, groupByGroupName]);

  const handleSearch = React.useCallback(
    val => {
      setSearchQuery(val);
    },
    [setSearchQuery]
  );

  const getTabs = React.useMemo(() => {
    return (
      groups?.map((group: ContextGroup) => ({
        label: group.name,
      })) || []
    );
  }, [groups]);

  const getNoResultContainer = React.useMemo(
    () =>
      loading ? (
        <Loader label={texts.loadingResults} labelPosition="bottom" />
      ) : (
        <Result noSearchResults type="no-results" description={texts.noResults} />
      ),
    [loading, texts]
  );

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
        onClearInput={(): void => handleSearch('')}
        placeholder={texts.searchPlaceholder}
        value={searchQuery}
        autofocus={!searchQuery || searchInputCanBeFocused}
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
      <S.ItemsList>
        <Scrollbar absolute maxHeight={300} style={{ padding: 8 }}>
          {currentItems?.length ? currentItems : getNoResultContainer}
        </Scrollbar>
      </S.ItemsList>
    </Dropdown.Wrapper>
  );
};

export default ContextSelectorDropdown;
