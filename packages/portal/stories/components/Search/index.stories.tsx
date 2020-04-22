import * as React from 'react';
import Search from '@synerise/ds-search';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import {  number, text } from '@storybook/addon-knobs';
import { VarTypeListM, VarTypeNumberM } from '@synerise/ds-icon/dist/icons';
import { SearchInput, SearchItemList } from '@synerise/ds-search/dist/Elements';
import { FilterElement } from '@synerise/ds-search/dist/Search.types';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import { getItemsWithAvatar, getSuggestions } from './dataPopulator';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '20vh' }}>
    <div style={{ width: '300px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

const filterList = [
  { text: 'First Name', icon: <VarTypeStringM /> },
  { text: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Sex', icon: <VarTypeStringM /> },
  { text: 'City', icon: <VarTypeStringM /> },
  { text: 'Transactions', icon: <VarTypeNumberM /> },
  { text: 'IP', icon: <VarTypeStringM /> },
  { text: 'Price', icon: <VarTypeListM /> },
  { text: 'Discount', icon: <VarTypeListM /> },
  { text: 'Products bought', icon: <VarTypeListM /> },
  { text: 'Loyalty points', icon: <VarTypeListM /> },
];

const recent = [
  { text: 'Bangkok', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'Frank', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Basel', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'Male', filter: 'Sex', icon: <VarTypeStringM /> },
];
const recentWithAvatars = getItemsWithAvatar(20);

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <SearchInput
        placeholder={'Type here...'}
        clearTooltip={'Clear value'}
        onValueChange={value => {
          console.log(value);
          setValue(value);
        }}
        value={value}
        onClear={() => {
          console.log('Cleared!');
        }}
        closeOnClickOutside={true}
      />
    );
  },
  expanded: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <SearchInput
        placeholder={'Type here...'}
        clearTooltip={'Clear value'}
        onValueChange={value => {
          console.log(value);
          setValue(value);
        }}
        value={value}
        onClear={() => {
          console.log('Cleared!');
        }}
        closeOnClickOutside={false}
        expanded={true}
      />
    );
  },
  withDropdown: () => {
    const [value, setValue] = React.useState<string>('');
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [suggestions, setSuggestions] = React.useState([]);
    return (
      <Search
        clearTooltip="Clear"
        placeholder="Search"
        parameters={filterList}
        recent={recent}
        suggestions={suggestions}
        value={value}
        parameterValue={filterValue}
        onValueChange={value => {
          setValue(value);
        }}
        onParameterValueChange={value => {
          setFilterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        parametersDisplayProps={{
          tooltip: text('Set search in tooltip', 'Search in'),
          title: text('Set search in title', 'Search in'),
          rowHeight: 32,
          visibleRows: number('Set search in visible items',6,{min:1}),
          itemRender: (item: FilterElement) => (
            <Menu.Item
              highlight={value}
              onItemHover={(): void => {}}
              prefixel={item && <Icon component={item && item.icon} />}
            >
              {item && item.text}
            </Menu.Item>
          ),
        }}
        suggestionsDisplayProps={{
          tooltip: text('Set suggestions tooltip', 'Suggest'),
          title: text('Set suggestions title', 'Suggest'),
          rowHeight: 32,
          visibleRows: number('Set suggestions visible items',6,{min:1}),
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}
        recentDisplayProps={{
          tooltip: text('Set recent tooltip', 'Recent'),
          title: text('Set recent title', 'Recent'),
          rowHeight: 32,
          visibleRows: number('Set recent visible items',3,{min:1}),
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}

      />
    );
  },
  withItemsWithAvatars: () => {
    const [value, setValue] = React.useState<string>('');
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [suggestions, setSuggestions] = React.useState([]);
    return (
      <Search
        clearTooltip="Clear"
        placeholder="Search"
        parameters={filterList}
        recent={recentWithAvatars}
        suggestions={suggestions}
        value={value}
        parameterValue={filterValue}
        onValueChange={value => {
          setValue(value);
        }}
        onParameterValueChange={value => {
          setFilterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        parametersDisplayProps={{
          tooltip: text('Set search in tooltip', 'Search in'),
          title: text('Set search in title', 'Search in'),
          rowHeight: 32,
          visibleRows: number('Set search in visible items',6,{min:1}),
          itemRender: (item: FilterElement) => (
            <Menu.Item
              onItemHover={(): void => {}}
              prefixel={item && <Icon component={item && item.icon} />}
            >
              {item && item.text}
            </Menu.Item>
          ),
        }}
        suggestionsDisplayProps={{
          tooltip: text('Set suggestions tooltip', 'Suggest'),
          title: text('Set suggestions title', 'Suggest'),
          rowHeight: 32,
          visibleRows: number('Set suggestions visible items',6,{min:1}),
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}
        recentDisplayProps={{
          tooltip: text('Set recent tooltip', 'Recent'),
          title: text('Set recent title', 'Recent'),
          rowHeight: 50,
          visibleRows: number('Set recent visible items',3,{min:1}),
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}} {...item}>{item.text}</Menu.Item>
        }}
      />
    );
  },
};

export default {
  name: 'Components|Search',
  config: {},
  stories,
  decorator,
};
