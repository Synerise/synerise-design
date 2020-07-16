import * as React from 'react';
import Search from '@synerise/ds-search';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import { number, text, boolean } from '@storybook/addon-knobs';
import { VarTypeListM, VarTypeNumberM } from '@synerise/ds-icon/dist/icons';
import { FilterElement } from '@synerise/ds-search/dist/Search.types';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import { getItemsWithAvatar, getSuggestions } from './dataPopulator';
import Divider from '@synerise/ds-divider';
import { SearchInput } from '@synerise/ds-search/dist/Elements';

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
  { text: 'First Name1', icon: <VarTypeStringM /> },
  { text: 'Last Name1', icon: <VarTypeStringM /> },
  { text: 'Sex1', icon: <VarTypeStringM /> },
  { text: 'City1', icon: <VarTypeStringM /> },
  { text: 'Transactions1', icon: <VarTypeNumberM /> },
  { text: 'IP1', icon: <VarTypeStringM /> },
  { text: 'Price1', icon: <VarTypeListM /> },
  { text: 'Discount1', icon: <VarTypeListM /> },
  { text: 'Products bought1', icon: <VarTypeListM /> },
  { text: 'Loyalty points1', icon: <VarTypeListM /> },
  { text: 'First Name2', icon: <VarTypeStringM /> },
  { text: 'Last Name2', icon: <VarTypeStringM /> },
  { text: 'Sex2', icon: <VarTypeStringM /> },
  { text: 'City2', icon: <VarTypeStringM /> },
  { text: 'Transactions2', icon: <VarTypeNumberM /> },
  { text: 'IP2', icon: <VarTypeStringM /> },
  { text: 'Price2', icon: <VarTypeListM /> },
  { text: 'Discount2', icon: <VarTypeListM /> },
  { text: 'Products bought2', icon: <VarTypeListM /> },
  { text: 'Loyalty points2', icon: <VarTypeListM /> },
  { text: 'First Name3', icon: <VarTypeStringM /> },
  { text: 'Last Name3', icon: <VarTypeStringM /> },
  { text: 'Sex3', icon: <VarTypeStringM /> },
  { text: 'City3', icon: <VarTypeStringM /> },
  { text: 'Transactions3', icon: <VarTypeNumberM /> },
  { text: 'IP3', icon: <VarTypeStringM /> },
  { text: 'Price3', icon: <VarTypeListM /> },
  { text: 'Discount3', icon: <VarTypeListM /> },
  { text: 'Products bought3', icon: <VarTypeListM /> },
  { text: 'Loyalty points3', icon: <VarTypeListM /> },
  { text: 'First Name4', icon: <VarTypeStringM /> },
  { text: 'Last Name4', icon: <VarTypeStringM /> },
  { text: 'Sex4', icon: <VarTypeStringM /> },
  { text: 'City4', icon: <VarTypeStringM /> },
  { text: 'Transactions4', icon: <VarTypeNumberM /> },
  { text: 'IP4', icon: <VarTypeStringM /> },
  { text: 'Price4', icon: <VarTypeListM /> },
  { text: 'Discount4', icon: <VarTypeListM /> },
  { text: 'Products bought4', icon: <VarTypeListM /> },
  { text: 'Loyalty points4', icon: <VarTypeListM /> },
  { text: 'First Name5', icon: <VarTypeStringM /> },
  { text: 'Last Name5', icon: <VarTypeStringM /> },
  { text: 'Sex5', icon: <VarTypeStringM /> },
  { text: 'City5', icon: <VarTypeStringM /> },
  { text: 'Transactions5', icon: <VarTypeNumberM /> },
  { text: 'IP5', icon: <VarTypeStringM /> },
  { text: 'Price5', icon: <VarTypeListM /> },
  { text: 'Discount5', icon: <VarTypeListM /> },
  { text: 'Products bought5', icon: <VarTypeListM /> },
  { text: 'Loyalty points5', icon: <VarTypeListM /> },
  { text: 'First Name6', icon: <VarTypeStringM /> },
  { text: 'Last Name6', icon: <VarTypeStringM /> },
  { text: 'Sex6', icon: <VarTypeStringM /> },
  { text: 'City6', icon: <VarTypeStringM /> },
  { text: 'Transactions6', icon: <VarTypeNumberM /> },
  { text: 'IP6', icon: <VarTypeStringM /> },
  { text: 'Price6', icon: <VarTypeListM /> },
  { text: 'Discount6', icon: <VarTypeListM /> },
  { text: 'Products bought6', icon: <VarTypeListM /> },
  { text: 'Loyalty points6', icon: <VarTypeListM /> },
  { text: 'First Name7', icon: <VarTypeStringM /> },
  { text: 'Last Name7', icon: <VarTypeStringM /> },
  { text: 'Sex7', icon: <VarTypeStringM /> },
  { text: 'City7', icon: <VarTypeStringM /> },
  { text: 'Transactions7', icon: <VarTypeNumberM /> },
  { text: 'IP7', icon: <VarTypeStringM /> },
  { text: 'Price7', icon: <VarTypeListM /> },
  { text: 'Discount7', icon: <VarTypeListM /> },
  { text: 'Products bought7', icon: <VarTypeListM /> },
  { text: 'Loyalty points7', icon: <VarTypeListM /> },
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
          setValue('');
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
          console.log('Clear value');
          setValue('');
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
    const hideLabel = boolean('hideLabel', false);

    return (
      <Search
        clearTooltip="Clear"
        divider={
          <div style={{ padding: '12px', paddingBottom: '0px', paddingRight: '20px' }}>
            <Divider dashed />
          </div>
        }
        dropdownMaxHeight={400}
        filterLookupKey="filter"
        onParameterValueChange={value => {
          setParameterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        onValueChange={value => {
          setValue(value);
        }}
        parameters={parameters.slice(0, parametersCount)}
        parametersDisplayProps={{
          tooltip: parametersTooltip,
          title: parametersTitle,
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => (
            <Menu.Item
              highlight={value}
              style={{ paddingLeft: '12px' }}
              onItemHover={(): void => {}}
              prefixel={item && <Icon component={item && item.icon} />}
            >
              {item && item.text}
            </Menu.Item>
          ),
        }}
        parameterValue={parameterValue}
        placeholder="Search"
        recent={recent.slice(0, recentCount)}
        recentDisplayProps={{
          tooltip: recentTooltip,
          title: recentTitle,
          rowHeight: 32,
          visibleRows: 3,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}
        suggestions={suggestions}
        suggestionsDisplayProps={{
          tooltip: suggestionsTooltip,
          title: suggestionsTitle,
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}
        textLookupConfig={{
          parameters: 'text',
          recent: 'text',
          suggestions: 'text',
        }}
        value={value}
        hideLabel={hideLabel}
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
        divider={
          <div style={{ padding: '12px', paddingBottom: '0px', paddingRight: '20px' }}>
            <Divider dashed />
          </div>
        }
        dropdownMaxHeight={400}
        filterLookupKey="filter"
        onParameterValueChange={(value): void => {
          setParameterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        onValueChange={(value): void => {
          setValue(value);
        }}
        parameters={parameters.slice(0, parametersCount)}
        parametersDisplayProps={{
          tooltip: parametersTooltip,
          title: parametersTitle,
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => (
            <Menu.Item
              style={{ paddingLeft: '12px' }}
              onItemHover={(): void => {}}
              prefixel={item && <Icon component={item && item.icon} />}
            >
              {item && item.text}
            </Menu.Item>
          ),
        }}
        parameterValue={parameterValue}
        placeholder="Search"
        recent={recentWithAvatars.slice(0, recentCount)}
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
        suggestions={suggestions}
        suggestionsDisplayProps={{
          tooltip: suggestionsTooltip,
          title: suggestionsTitle,
          rowHeight: 32,
          visibleRows: 6,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
        }}
        textLookupConfig={{
          parameters: 'text',
          recent: 'text',
          suggestions: 'text',
        }}
        value={value}
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
