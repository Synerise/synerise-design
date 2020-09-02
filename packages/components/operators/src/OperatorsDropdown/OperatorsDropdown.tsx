import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { useOnClickOutside } from '@synerise/ds-utils';
import Result from '@synerise/ds-result';
import Scrollbar from '@synerise/ds-scrollbar';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from '../Operators.style';
import { OperatorsDropdownProps, OperatorsGroup, OperatorsItem } from '../Operator.types';
import OperatorsDropdownItem from './OperatorsDropdownItem';

const NO_GROUP_NAME = 'NO_GROUP_NAME';

const OperatorsDropdown: React.FC<OperatorsDropdownProps> = ({
  texts,
  setSelected,
  groups,
  items,
  setDropdownVisible,
}) => {
  const defaultTab = React.useMemo(() => {
    const defaultIndex = groups?.findIndex((group: OperatorsGroup) => group.defaultGroup);
    return defaultIndex || 0;
  }, [groups]);

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<number>(defaultTab);
  const [activeGroup, setActiveGroup] = React.useState<OperatorsGroup | undefined>(undefined);

  useOnClickOutside(overlayRef, () => {
    setDropdownVisible(false);
  });

  const groupByGroupName = React.useCallback(
    activeItems => {
      const groupedItems = activeItems.reduce((result: {}, item: OperatorsItem) => {
        const res = result;
        const groupName = item.groupName || NO_GROUP_NAME;
        res[groupName] = (result[groupName] || []).concat(item);
        return res;
      }, {});

      const resultItems: React.ReactNode[] = [];
      Object.keys(groupedItems).forEach((key: string) => {
        if (key !== NO_GROUP_NAME) {
          resultItems.push(<S.Title>{key}</S.Title>);
        }
        groupedItems[key].forEach((item: OperatorsItem) => {
          resultItems.push(
            <OperatorsDropdownItem
              key={item.name + item.id}
              item={item}
              searchQuery={searchQuery}
              hideDropdown={(): void => setDropdownVisible(false)}
              select={setSelected}
            />
          );
        });
      });
      return resultItems;
    },
    [searchQuery, setDropdownVisible, setSelected]
  );

  const currentTabItems = React.useMemo((): OperatorsGroup | undefined => {
    return groups?.find((group: OperatorsGroup, index: number) => {
      return activeTab === index;
    });
  }, [groups, activeTab]);

  const filteredItems = React.useMemo(() => {
    return items
      ?.filter((item: OperatorsItem) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((item: OperatorsItem) => {
        return (
          <OperatorsDropdownItem
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
      return currentTabItems?.subGroups?.map((subGroup: OperatorsGroup) => {
        return (
          <OperatorsDropdownItem
            key={subGroup.name + subGroup.id}
            item={subGroup}
            searchQuery={searchQuery}
            select={setActiveGroup}
          />
        );
      });
    }

    if (activeGroup) {
      return groupByGroupName(items?.filter((item: OperatorsItem) => item.groupId === activeGroup.id));
    }

    return groupByGroupName(
      items?.filter((item: OperatorsItem) => item.groupId === (groups[activeTab] as OperatorsGroup).id)
    );
  }, [currentTabItems, items, groups, searchQuery, activeTab, filteredItems, activeGroup, groupByGroupName]);

  const handleSearch = React.useCallback(
    value => {
      setSearchQuery(value);
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
    <Dropdown.Wrapper style={{ width: '300px' }} ref={overlayRef}>
      <Dropdown.SearchInput
        onSearchChange={handleSearch}
        onClearInput={(): void => handleSearch('')}
        placeholder={texts.searchPlaceholder}
        value={searchQuery}
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
            }}
          />
        </S.TabsWrapper>
      )}
      <S.ItemsList>
        <Scrollbar absolute maxHeight={300}>
          {// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          currentItems.length ? (
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
