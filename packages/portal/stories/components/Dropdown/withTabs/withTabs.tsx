import * as React from 'react';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { SearchM, BooleanM, CalendarM, HashM, ListM, TextM } from '@synerise/ds-icon';
import Tabs from '@synerise/ds-tabs';
import * as S from './withTabs.styles';
import { boolean, select } from '@storybook/addon-knobs';
import { renderFooter, typesFooter } from '../index.stories';
import { useOnClickOutside } from '@synerise/ds-utils';

const tabsWithIcons = [
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
const tabsWithLabels = [
  {
    label: 'Tab first',
  },
  {
    label: 'Tab second',
  },
  {
    label: 'Tab third',
  },
];

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

  const tabsType = {
    icons: 'icons',
    labels: 'labels',
  };

  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const selectedTabs = select('Set tabs type', tabsType, tabsType.icons);
  const footer = boolean('Set footer', false);
  const setTypeFooter = select('Set footer type', typesFooter, 'singleButton');
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return {
    visible: dropdownVisible,
    overlay: (
      <Dropdown.Wrapper ref={ref} style={{ width: '300px' }}>
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
            tabs={selectedTabs === tabsType.icons ? tabsWithIcons : tabsWithLabels}
            activeTab={activeTab}
            handleTabClick={(index: number) => {
              setActiveTab(index);
            }}
          />
        </S.TabsWrapper>
        <S.ContentPlaceholder></S.ContentPlaceholder>
        {footer && renderFooter(setTypeFooter)}
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
