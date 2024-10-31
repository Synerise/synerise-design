import React from 'react';
import Search from '@synerise/ds-search';
import { boolean, number, text } from '@storybook/addon-knobs';
import Menu from '@synerise/ds-menu';
import Icon from '@synerise/ds-icon';
import { getItemsWithAvatar, getSuggestions, parameters, recent } from './dataPopulator';
import Divider from '@synerise/ds-divider';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { theme } from '@synerise/ds-core';
import DebouncedInput from './DebouncedInput';
import { debounce } from 'lodash';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '20vh' }}>
    <div style={{ width: '300px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

const NOOP = (): void => {};

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
  withDebounce: () => {
    const [debouncedValue, setDebouncedValue] = React.useState<string>('');
    const debounceDelay = number('Set debounce delay [ms]', 500, { range: true, min: 0, max: 2000, step: 100 });
    return (
      <div style={{ width: '300px' }}>
        <DebouncedInput debouncedOnChange={debounce(setDebouncedValue, debounceDelay)} />
        <div style={{ margin: '10px 0' }}>
          {' '}
          <div style={{ marginRight: '4px', fontWeight: 500 }}>Debounced:</div>
          <p style={{ wordBreak: 'break-all' }}>{debouncedValue}</p>
        </div>
      </div>
    );
  },
  withDropdown: () => {
    const [value, setValue] = React.useState<string>('');
    const [parameterValue, setParameterValue] = React.useState('');
    const [suggestions, setSuggestions] = React.useState<any[] | null>(null);

    const recentTitle = text('Set recent title', 'Recent');
    const recentTooltip = text('Set recent tooltip', 'Recent');
    const recentCount = 3;
    const expandedInput = boolean(' Set search input expanded', true);
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
        onParameterValueChange={(value, parameter) => {
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
          itemRender: item => (
            <Menu.Item
              highlight={value}
              style={{ paddingLeft: '12px' }}
              prefixel={item && <Icon component={item && item.icon} color={theme.palette['grey-600']} />}
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
          itemRender: item => <Menu.Item>{item && item.text}</Menu.Item>,
        }}
        suggestions={boolean('Show suggestions', true) ? suggestions : []}
        suggestionsDisplayProps={{
          tooltip: suggestionsTooltip,
          title: suggestionsTitle,
          rowHeight: 32,
          itemRender: item => <Menu.Item>{item && item.text}</Menu.Item>,
        }}
        textLookupConfig={{
          parameters: 'text',
          recent: 'text',
          suggestions: 'text',
        }}
        value={value}
        disableInput={boolean('Disable input when property has been choosen', false) && Boolean(parameterValue)}
        alwaysExpanded={expandedInput}
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
          itemRender: item => (
            <Menu.Item
              style={{ paddingLeft: '12px' }}
              prefixel={item && <Icon component={item && item.icon} color={theme.palette['grey-600']} />}
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
          itemRender: item => (
            <Menu.Item {...item} style={{ paddingLeft: '12px' }}>
              {item.text}
            </Menu.Item>
          ),
        }}
        suggestions={suggestions}
        suggestionsDisplayProps={{
          tooltip: suggestionsTooltip,
          title: suggestionsTitle,
          rowHeight: 32,
          itemRender: item => <Menu.Item>{item && item.text}</Menu.Item>,
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
  name: 'Components/Search/Search',
  config: {},
  stories,
  decorator,
};
