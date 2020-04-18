import * as React from 'react';
import * as DataPopulator from './dataPopulator';
import Search from '@synerise/ds-search';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import Divider from '@synerise/ds-divider';
import { boolean } from '@storybook/addon-knobs';
import { VarTypeListM, VarTypeNumberM } from '@synerise/ds-icon/dist/icons';
import { SearchInput } from '@synerise/ds-search/dist/Elements';

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
    { text: 'Email', icon: <VarTypeStringM /> },
    { text: 'Transactions', icon: <VarTypeNumberM /> },
    { text: 'IP', icon: <VarTypeStringM /> },
    { text: 'Price', icon: <VarTypeListM /> },
    { text: 'Discount', icon: <VarTypeListM /> },
    { text: 'Products bought', icon: <VarTypeListM /> },
    { text: 'Loyalty points', icon: <VarTypeListM /> },
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
const cities = DataPopulator.populateCities(50).map(item=>({text:item}));
const firstNames = DataPopulator.populateFirstName(50).map(item=>({text:item}));
const lastNames = DataPopulator.popuLateLastName(50).map(item=>({text:item}));
const getSuggestions = filter => {
  if (filter === 'City') {
    return [cities];
  }
  if (filter === 'First Name') {
    return [
      firstNames
    ];
  }
  if (filter === 'Last Name') {
    return [
      lastNames
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
/*
          console.log('Value changed!', value);
*/
          setValue(value);
        }}
        onFilterValueChange={value => {
          setFilterValue(value);
          const fakeApiResponse = getSuggestions(value);
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
  withInput: () => {
    const [value, setValue] = React.useState<string>('');
    return (
      <SearchInput
        placeholder={"Type here..."}
        clearTooltip={'Clear value'}
        onValueChange={(value)=>{console.log(value); setValue(value)}}
        value={value}
        onClear={()=>{console.log('Cleared!')}}
        onKeyDown={(e)=>{console.log(e.target)}}
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
