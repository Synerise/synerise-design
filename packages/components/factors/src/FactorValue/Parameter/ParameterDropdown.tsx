import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Scrollbar from '@synerise/ds-scrollbar';
import * as S from './Parameter.style';
import { ParameterDropdownProps, ParameterGroup, ParameterItem } from '../../Factors.types';
import ParameterDropdownItem from './ParameterDropdownItem';

const ParameterDropdown: React.FC<ParameterDropdownProps> = ({
  setSelected,
  texts,
  groups,
  items,
  setDropdownVisible,
}) => {
  const defaultTab = React.useMemo(() => {
    const defaultIndex = groups?.findIndex((group: ParameterGroup) => group.defaultGroup);
    return defaultIndex || 0;
  }, [groups]);

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<number>(defaultTab);
  const [activeGroup, setActiveGroup] = React.useState<ParameterGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = React.useState(true);

  useOnClickOutside(overlayRef, () => {
    setDropdownVisible(false);
  });

  const currentTabItems = React.useMemo((): ParameterGroup | undefined => {
    return groups?.find((group: ParameterGroup, index) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const filteredItems = React.useMemo(() => {
    return items
      ?.filter((item: ParameterItem) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item: ParameterItem) => {
        return (
          <ParameterDropdownItem
            key={item.name + item.id}
            item={item}
            searchQuery={searchQuery}
            clearSearch={(): void => setSearchQuery('')}
            hideDropdown={(): void => setDropdownVisible(false)}
            select={setSelected}
          />
        );
      });
  }, [items, searchQuery, setDropdownVisible, setSelected]);

  const currentItems = React.useMemo((): React.ReactNode[] | undefined => {
    if (searchQuery) {
      return filteredItems;
    }
    const hasSubgroups = Boolean(currentTabItems?.subGroups);
    if (hasSubgroups && !activeGroup) {
      return currentTabItems?.subGroups?.map((subGroup: ParameterGroup) => {
        return (
          <ParameterDropdownItem
            key={subGroup.name + subGroup.id}
            item={subGroup}
            searchQuery={searchQuery}
            select={setActiveGroup}
          />
        );
      });
    }
    if (activeGroup) {
      return items
        ?.filter((item: ParameterItem) => item.groupId === activeGroup.id)
        .map((item: ParameterItem) => {
          return (
            <ParameterDropdownItem
              key={item.name + item.id}
              item={item}
              searchQuery={searchQuery}
              hideDropdown={(): void => setDropdownVisible(false)}
              select={setSelected}
            />
          );
        });
    }
    if (groups) {
      return items
        ?.filter((item: ParameterItem) => item.groupId === (groups[activeTab] as ParameterGroup).id)
        .map((item: ParameterItem) => {
          return (
            <ParameterDropdownItem
              key={item.name + item.id}
              item={item}
              searchQuery={searchQuery}
              hideDropdown={(): void => setDropdownVisible(false)}
              select={setSelected}
            />
          );
        });
    }
    return items?.map((item: ParameterItem) => {
      return (
        <ParameterDropdownItem
          key={item.name + item.id}
          item={item}
          searchQuery={searchQuery}
          hideDropdown={(): void => setDropdownVisible(false)}
          select={setSelected}
        />
      );
    });
  }, [
    currentTabItems,
    items,
    groups,
    activeGroup,
    searchQuery,
    activeTab,
    filteredItems,
    setDropdownVisible,
    setSelected,
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

  return (
    <Dropdown.Wrapper
      style={{ width: '300px' }}
      ref={overlayRef}
      onKeyDown={(e): void => {
        setSearchInputFocus(false);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        searchQuery &&
          focusWithArrowKeys(e, 'ds-parameter-item', () => {
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
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
      />
      {searchQuery === '' && (
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
      <S.ItemsList>
        <Scrollbar absolute maxHeight={300} style={{ padding: 8 }}>
          {// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          currentItems.length ? (
            currentItems
          ) : (
            <Result noSearchResults type="no-results" description={texts.parameter.noResults} />
          )}
        </Scrollbar>
      </S.ItemsList>
    </Dropdown.Wrapper>
  );
};

export default ParameterDropdown;
