import * as React from 'react';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Tabs from '@synerise/ds-tabs';
import { Add3M, AddM, BooleanM, CalendarM, HashM, ListM, TextM } from '@synerise/ds-icon/dist/icons';
import * as S from './withTabs.styles';
import { DropdownMenu } from '@synerise/ds-manageable-list/dist/Item/FilterItem/FilterItem.styles';
import ArrowRightCircleM from '@synerise/ds-icon/dist/icons/ArrowRightCircleM';
const withTabs = () => {
  const data = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }, { text: 'Item 4' }];
  const [activeTab, setActiveTab] = React.useState(0);
  const [filteredData, setFilteredData] = React.useState(data);
  const [value, setValue] = React.useState('');

  const filter = (searchTerm: string) => {
    setValue(searchTerm);

    const newData = data
      .filter(item => {
        return item.text.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map(item => ({ ...item, highlight: searchTerm }));

    setFilteredData(newData);
  };

  const onClearInput = () => {
    setValue('');
    setFilteredData(data);
  };

  const icons = [
    {
      icon: <CalendarM />,
    },
    {
      icon: <TextM />,
    },
    {
      icon: <HashM />,
    },
    {
      icon: <BooleanM />,
    },
    {
      icon: <ListM />,
    },
  ];
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  return {
    visible: dropdownVisible,
    overlay: (
      <Dropdown.Wrapper style={{ width: '300px' }}>
        <Dropdown.SearchInput
          onSearchChange={filter}
          onClearInput={onClearInput}
          placeholder="Search"
          value={value}
          iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
        />
        <S.TabsWrapper>
          <Tabs
            block
            tabs={icons}
            activeTab={activeTab}
            handleTabClick={(index: number) => {
              setActiveTab(index);
            }}
          />
        </S.TabsWrapper>
        <S.ContentPlaceholder></S.ContentPlaceholder>
      </Dropdown.Wrapper>
    ),
    children: (
      <Button
        onClick={() => {
          setDropdownVisible(!dropdownVisible);
        }}
      >
        Click
      </Button>
    ),
  };
};

export default withTabs;
