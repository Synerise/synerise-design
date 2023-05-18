import * as React from 'react';
import { v4 as uuid } from 'uuid';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import OperatorsDropdownItem from './OperatorsDropdownItem';
import * as S from '../Operators.style';
import { OperatorsDropdownProps, OperatorsGroup, OperatorsItem } from '../Operator.types';

const NO_GROUP_NAME = 'NO_GROUP_NAME';

const OperatorsDropdown: React.FC<OperatorsDropdownProps> = ({
  texts,
  setSelected,
  groups,
  items,
  setDropdownVisible,
  value,
}) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const [activeGroup, setActiveGroup] = React.useState<OperatorsGroup | undefined>(undefined);
  const [searchInputCanBeFocused, setSearchInputFocus] = React.useState(true);

  React.useEffect(() => {
    const defaultIndex = groups?.findIndex(
      (group: OperatorsGroup) => group.defaultGroup || (value && group.id === value.groupId)
    );
    setActiveTab(defaultIndex === -1 ? 0 : defaultIndex);
  }, [groups, value]);

  const classNames = React.useMemo(() => {
    return `ds-operator-item ds-operator-item-${uuid()}`;
  }, []);

  useOnClickOutside(overlayRef, () => {
    setDropdownVisible(false);
  });

  const groupByGroupName = React.useCallback(
    activeItems => {
      const itemsNumber = activeItems.length;
      const groupedItems = {};

      for (let i = 0; i < itemsNumber; i += 1) {
        const item = activeItems[i];
        const groupName = item.groupName || NO_GROUP_NAME;
        const group = groupedItems[groupName] || [];
        group.push(item);
        groupedItems[groupName] = group;
      }

      const resultItems: React.ReactNode[] = [];
      Object.keys(groupedItems).forEach((key: string) => {
        if (key !== NO_GROUP_NAME) {
          resultItems.push(<S.Title>{key}</S.Title>);
        }
        groupedItems[key].forEach((item: OperatorsItem) => {
          resultItems.push(
            <OperatorsDropdownItem
              className={classNames}
              key={uuid()}
              item={item}
              searchQuery={searchQuery}
              hideDropdown={(): void => setDropdownVisible(false)}
              select={setSelected}
              selected={Boolean(value) && item.id === value?.id}
            />
          );
        });
      });
      return resultItems;
    },
    [searchQuery, setDropdownVisible, setSelected, value, classNames]
  );

  const currentTabItems = React.useMemo((): OperatorsGroup | undefined => {
    return groups?.find((group: OperatorsGroup, index: number) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const filteredItems = React.useMemo(
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

  const currentItems = React.useMemo((): React.ReactNode[] | undefined => {
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
      return groupByGroupName(items?.filter((item: OperatorsItem) => item.groupId === activeGroup.id));
    }

    return groupByGroupName(
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
    groupByGroupName,
    classNames,
  ]);

  const handleSearch = React.useCallback(
    val => {
      setSearchQuery(val);
    },
    [setSearchQuery]
  );

  const getTabs = React.useMemo(() => {
    return (
      groups?.map((group: OperatorsGroup) => ({
        icon: group.icon,
      })) || []
    );
  }, [groups]);

  return (
    <Dropdown.Wrapper
      style={{ width: '300px', zIndex: 9999999 }}
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
      <S.ItemsList>
        <Scrollbar absolute maxHeight={300} style={{ padding: 8 }}>
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            currentItems.length ? (
              currentItems
            ) : (
              <Result noSearchResults type="no-results" description={texts.noResults} />
            )
          }
        </Scrollbar>
      </S.ItemsList>
    </Dropdown.Wrapper>
  );
};

export default OperatorsDropdown;
