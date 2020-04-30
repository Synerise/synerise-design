import * as React from 'react';
import Search from '@synerise/ds-search';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import { number, text } from '@storybook/addon-knobs';
import { VarTypeListM, VarTypeNumberM } from '@synerise/ds-icon/dist/icons';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { FilterElement } from '@synerise/ds-search/dist/Search.types';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import { getItemsWithAvatar, getSuggestions } from './dataPopulator';
import Divider from '@synerise/ds-divider';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '20vh' }}>
    <div style={{ width: '300px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

const parameters = [
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
  { text: 'Chicago', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'London', filter: 'City', icon: <VarTypeStringM /> },
  { text: 'Brandon', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Male', filter: 'Sex', icon: <VarTypeStringM /> },
  { text: 'Brandon', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Rogers', filter: 'Last Name', icon: <VarTypeStringM /> },
  { text: 'Richards', filter: 'Last Name', icon: <VarTypeStringM /> },
];
const recentWithAvatars = getItemsWithAvatar(20);

const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <SearchInput
        clearTooltip="Clear"
        placeholder="Search"
        onChange={value => {
          console.log(value);
          setValue(value);
        }}
        value={value}
        onClear={() => {
console.log('Clear value');
          setValue('')
        }}
        closeOnClickOutside
      />
    );
  },
  expanded: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <SearchInput
        clearTooltip="Clear"
        placeholder="Search"
        onChange={value => {
          console.log(value);
          setValue(value);
        }}
        value={value}
        onClear={() => {
          console.log('Clear value')
          setValue('')
        }}
        closeOnClickOutside={false}
        alwaysExpanded
      />
    );
  },
  withDropdown: () => {
    const [value, setValue] = React.useState<string>('');
    const [parameterValue, setParameterValue] = React.useState<string>('');
    const [suggestions, setSuggestions] = React.useState([]);

    const recentTitle = text('Set recent title', 'Recent');
    const recentTooltip = text('Set recent tooltip', 'Recent');
    const recentCount = 3;

    const parametersTitle = text('Set search in title', 'Search in');
    const parametersTooltip = text('Set search in tooltip', 'Search in');
    const parametersCount = number('Set search in count', 6, { min: 1, max: parameters.length });

    const suggestionsTitle = text('Set suggestions title', 'Suggest');
    const suggestionsTooltip = text('Set suggestions tooltip', 'Suggest');

    return (
      <Search
        clearTooltip="Clear"
        placeholder="Search"
        parameters={parameters.slice(0, parametersCount)}
        recent={recent.slice(0, recentCount)}
        suggestions={suggestions}
        value={value}
        parameterValue={parameterValue}
        onValueChange={value => {
          setValue(value);
        }}
        onParameterValueChange={value => {
          setParameterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        divider={
          <div style={{ padding: '12px', paddingBottom: '0px' }}>
            <Divider dashed/>
          </div>
        }
        recentDisplayProps={{
          tooltip: recentTooltip,
          title: recentTitle,
          rowHeight: 32,
          visibleRows: 3,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
          divider: (
            <div style={{ padding: '12px', paddingBottom: '0px', marginRight:'-10px' }}>
              {' '}
              <Divider dashed />{' '}
            </div>
          ),
        }}
        parametersDisplayProps={{
          tooltip: parametersTooltip,
          title: parametersTitle,
          rowHeight: 32,
          visibleRows: 6,
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
          tooltip: suggestionsTooltip,
          title: suggestionsTitle,
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}
        dropdownMaxHeight={400}
      />
    );
  },
  withItemsWithAvatars: () => {
    const [value, setValue] = React.useState<string>('');
    const [parameterValue, setParameterValue] = React.useState<string>('');
    const [suggestions, setSuggestions] = React.useState([]);

    const recentTitle = text('Set recent title', 'Recent');
    const recentTooltip = text('Set recent tooltip', 'Recent');
    const recentCount = 3;

    const parametersTitle = text('Set search in title', 'Search in');
    const parametersTooltip = text('Set search in tooltip', 'Search in');
    const parametersCount = number('Set search in count', 6, { min: 1, max: parameters.length });

    const suggestionsTitle = text('Set suggestions title', 'Suggest');
    const suggestionsTooltip = text('Set suggestions tooltip', 'Suggest');
    return (
      <Search
        clearTooltip="Clear"
        placeholder="Search"
        parameters={parameters.slice(0, parametersCount)}
        recent={recentWithAvatars.slice(0, recentCount)}
        suggestions={suggestions}
        value={value}
        parameterValue={parameterValue}
        onValueChange={value => {
          setValue(value);
        }}
        onParameterValueChange={value => {
          setParameterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        recentDisplayProps={{
          tooltip: recentTooltip,
          title: recentTitle,
          rowHeight: 50,
          visibleRows: 3,
          itemRender: (item: FilterElement) => (
            <Menu.Item onItemHover={(): void => {}} {...item} style={{ paddingLeft: '12px' }}>
              {item.text}
            </Menu.Item>
          ),
        }}
        parametersDisplayProps={{
          tooltip: parametersTooltip,
          title: parametersTitle,
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => (
            <Menu.Item onItemHover={(): void => {}} prefixel={item && <Icon component={item && item.icon} />}>
              {item && item.text}
            </Menu.Item>
          ),
        }}
        suggestionsDisplayProps={{
          tooltip: suggestionsTooltip,
          title: suggestionsTitle,
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}
        divider={
          <div style={{ padding: '12px', paddingBottom: '0px',}}>
            <Divider dashed />
          </div>
        }
        dropdownMaxHeight={400}
      />
    );
  },
};

export default {
  name: 'Search|Search',
  config: {},
  stories,
  decorator,
};
