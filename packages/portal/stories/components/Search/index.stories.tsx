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
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '20vh' }}>
    <div style={{ width: '300px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

const NOOP = (): void => {};

const parameters = [
  { text: 'First Name', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']} /> },
  { text: 'Last Name', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']} /> },
  { text: 'Sex', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']} /> },
  { text: 'City', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']} /> },
  { text: 'Transactions', icon: <Icon component={<VarTypeNumberM />} color={theme.palette['grey-600']} /> },
  { text: 'IP', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']} /> },
  { text: 'Price', icon: <Icon component={<VarTypeListM />} color={theme.palette['grey-600']} /> },
  { text: 'Discount', icon: <Icon component={<VarTypeListM />} color={theme.palette['grey-600']} /> },
  { text: 'Products bought', icon: <Icon component={<VarTypeListM />} color={theme.palette['grey-600']} /> },
  { text: 'Loyalty points', icon: <Icon component={<VarTypeListM />} color={theme.palette['grey-600']} /> },
];

const recent = [
  { text: 'Bangkok', filter: 'City', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']}/> },
  { text: 'Frank', filter: 'Last Name', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']}/>},
  { text: 'Basel', filter: 'City', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']}/> },
  { text: 'Chicago', filter: 'City', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']}/> },
  { text: 'London', filter: 'City', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']}/>},
  { text: 'Brandon', filter: 'Last Name', icon: <Icon component={<VarTypeStringM />} color={theme.palette['grey-600']}/> },
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
    const [parameterValue, setParameterValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<any[] | null>(null);

    const recentTitle = text('Set recent title', 'Recent');
    const recentTooltip = text('Set recent tooltip', 'Recent');
    const recentCount = 3;

    const parametersTitle = text('Set search in title', 'Search in');
    const parametersTooltip = text('Set search in tooltip', 'Search in');
    const parametersCount = number('Set search in count', 6, { min: 1, max: 10 });

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
        onClear={() => {
          setParameterValue('');
          setValue('');
        }}
        onParameterValueChange={value => {
          setParameterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        onValueChange={value => setValue(value)}
        parameters={parameters.slice(0, parametersCount)}
        parametersDisplayProps={{
          tooltip: parametersTooltip,
          title: parametersTitle,
          rowHeight: 32,
          itemRender: (item: FilterElement) => (
            <Menu.Item
              highlight={value}
              style={{ paddingLeft: '12px' }}
              onItemHover={NOOP}
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
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={NOOP}>{item && item.text}</Menu.Item>,
        }}
        suggestions={suggestions}
        suggestionsDisplayProps={{
          tooltip: suggestionsTooltip,
          title: suggestionsTitle,
          rowHeight: 32,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={NOOP}>{item && item.text}</Menu.Item>,
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
  withItemsWithAvatars: () => {
    const [value, setValue] = React.useState<string>('');
    const [parameterValue, setParameterValue] = React.useState<string>('');
    const [suggestions, setSuggestions] = React.useState([]);

    const recentTitle = text('Set recent title', 'Recent');
    const recentTooltip = text('Set recent tooltip', 'Recent');
    const recentCount = 3;

    const parametersTitle = text('Set search in title', 'Search in');
    const parametersTooltip = text('Set search in tooltip', 'Search in');
    const parametersCount = number('Set search in count', 6, { min: 1, max: 10 });

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
        dropdownMaxHeight={460}
        filterLookupKey="filter"
        onClear={() => {
          setParameterValue('');
          setValue('');
        }}
        onParameterValueChange={(value): void => {
          setParameterValue(value);
          const fakeApiResponse = getSuggestions(value);
          setSuggestions(fakeApiResponse);
        }}
        onValueChange={(value): void => setValue(value)}
        parameters={parameters.slice(0, parametersCount)}
        parametersDisplayProps={{
          tooltip: parametersTooltip,
          title: parametersTitle,
          rowHeight: 32,
          itemRender: (item: FilterElement) => (
            <Menu.Item
              style={{ paddingLeft: '12px' }}
              onItemHover={NOOP}
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
          itemRender: (item: FilterElement) => (
            <Menu.Item onItemHover={NOOP} {...item} style={{ paddingLeft: '12px' }}>
              {item.text}
            </Menu.Item>
          ),
        }}
        suggestions={suggestions}
        suggestionsDisplayProps={{
          tooltip: suggestionsTooltip,
          title: suggestionsTitle,
          rowHeight: 32,
          itemRender: (item: FilterElement) => <Menu.Item onItemHover={NOOP}>{item && item.text}</Menu.Item>,
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
