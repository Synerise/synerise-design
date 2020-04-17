import * as React from 'react';

import Search from '@synerise/ds-search';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import Divider from '@synerise/ds-divider';
import { boolean } from '@storybook/addon-knobs';

const decorator = storyFn => (
  <div style={{ width: '300px', height: '500px' }}>
    <div style={{ position: 'relative' }}>{storyFn()}</div>
  </div>
);

const filterList = [
  [
    { text: 'First Name', icon: <VarTypeStringM /> },
    { text: 'Last Name', icon: <VarTypeStringM /> },
    { text: 'Sex', icon: <VarTypeStringM /> },
    { text: 'City', icon: <VarTypeStringM /> },
  ],
];

const recent = [
  [
    { text: 'Bangkok', filter: 'City', icon: <VarTypeStringM /> },
    { text: 'Frank', filter: 'Last Name', icon: <VarTypeStringM /> },
    { text: 'Basel', filter: 'City', icon: <VarTypeStringM /> },
    { text: 'Male', filter: 'Sex', icon: <VarTypeStringM /> },
  ],
];

const results = [[{ text: 'Cirilla' }, { text: 'Frank' }, { text: 'Naomi' }, { text: 'Severus' }]];
const getSuggestions = filter => {
  if (filter === 'City') {
    return [
      [
        { text: 'Athens' },
        { text: 'Bangkok' },
        { text: 'Basel' },
        { text: 'Bilbao' },
        { text: 'Chicago' },
        { text: 'Dresno' },
        { text: 'Florence' },
        { text: 'Geneva' },
      ],
    ];
  }
  if (filter === 'First Name') {
    return [
      [
        { text: 'Andrew' },
        { text: 'Anna' },
        { text: 'Brad' },
        { text: 'Cintia' },
        { text: 'Ciri' },
        { text: 'Ciprian' },
      ],
    ];
  }
  if (filter === 'Last Name') {
    return [
      [
        { text: 'Adkins' },
        { text: 'Barkley' },
        { text: 'Cirilla' },
        { text: 'Frank' },
        { text: 'Lennox' },
        { text: 'Snow' },
      ],
    ];
  }
  if (filter === 'Sex') {
    return [[{ text: 'Female' }, { text: 'Male' }]];
  } else return [[{ text: 'Some suggestions' }, { text: 'not matched' }, { text: 'by filter type' }, { text: 'yet' }]];
};
const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>('');
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [suggestions, setSuggestions] = React.useState(results);
    let withDivider = boolean('Set divider', true);
    return (
      <Search
        clearTooltip="Clear"
        placeholder="Search"
        filterTitle="Search in"
        recentTitle="Recent"
        resultTitle="Suggest"
        parameters={filterList}
        recent={recent}
        results={suggestions}
        value={value}
        filterValue={filterValue}
        onValueChange={value => {
          console.log('Value changed!', value);
          setValue(value);
        }}
        onFilterValueChange={value => {
          setFilterValue(value);
          console.log('Value filter changed', value);
          console.log('Fetching api for suggestions by type...', value);
          const fakeApiResponse = getSuggestions(value);
          console.log('fake api', fakeApiResponse);
          setSuggestions(fakeApiResponse);
        }}
        divider={
          withDivider && (
            <div style={{ padding: '12px', paddingBottom: '0px' }}>
              {' '}
              <Divider dashed={true} />{' '}
            </div>
          )
        }
      />
    );
  },
};

export default {
  name: 'Components|Search',
  config: {},
  stories,
  Component: Search,
  decorator,
};
