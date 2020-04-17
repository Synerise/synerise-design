import * as React from 'react';

import Search from '@synerise/ds-search';
import VarTypeStringM from "@synerise/ds-icon/dist/icons/VarTypeStringM";
import Divider from '@synerise/ds-divider';
import { boolean } from '@storybook/addon-knobs';

const decorator = (storyFn) => (
  <div style={{ width: '300px' }}>
    <div style={{position:'relative'}}>
      {storyFn()}
    </div>
  </div>
);

const filterList = [
  [
    { text: 'First Name', icon: <VarTypeStringM/>, suggestions: [[
        {text: 'Anthony'},
        {text: 'Barbara'},
        {text: 'Bridget'},
        {text: 'Ciri'},
      ]] },
    { text: 'Last Name', icon: <VarTypeStringM/>, suggestions: [[
        {text: 'Arnolds'},
        {text: 'Baines'},
        {text: 'Becker'},
        {text: 'Case'},
      ]] },
    { text: 'Sex', icon: <VarTypeStringM/>,
      suggestions: [[
        {text: 'Female'},
        {text: 'Male'},
      ]] },
    { text: 'City', icon: <VarTypeStringM/>,
      suggestions: [[
        {text: 'Athens'},
        {text: 'Barcelona'},
        {text: 'Bilbao'},
        {text: 'Chicago'},
      ]] },
  ]
];

const recent = [
  [
    { text: 'Bangkok', filter: 'City', icon: <VarTypeStringM/> },
    { text: 'Frank', filter: 'Client Name', icon: <VarTypeStringM/> },
    { text: 'Mango', filter: 'Fruits', icon: <VarTypeStringM/> },
    { text: 'Male', filter: 'Sex', icon: <VarTypeStringM/> },
  ]
];

const results = [
  [
    { text: 'Cirilla'},
    { text: 'Frank' },
    { text: 'Naomi' },
    { text: 'Severus'},
  ]
];
const getSuggestions = () =>( [[
  { text: 'Some suggestions'},
  { text: 'not matched' },
  { text: 'by filter type' },
  { text: 'yet'},
]]);
const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>('');
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [suggestions,setSuggestions] = React.useState(results);
    let withDivider = boolean('Set divider',true);
    return (
      <Search
        clearTooltip='Clear'
        placeholder='Search'
        filterTitle='Search in'
        recentTitle='Recent'
        resultTitle='Suggest'
        filterData={filterList}
        recent={recent}
        results={suggestions}
        value={value}
        filterValue={filterValue}
        onValueChange={value => {
          console.log('Value changed!',value);
          setValue(value)}}
        onFilterValueChange={value => {
          setFilterValue(value);
          console.log('Value filter changed',value);
          console.log('Fetching api for suggestions by type...',value);
          const fakeApiResponse = getSuggestions();
          setSuggestions(fakeApiResponse);
        }}
        divider={ withDivider && <div style={{padding:'12px', paddingBottom:'0px'}}> <Divider dashed={true}/> </div>}
      />
    )
  },
};

export default {
  name: 'Components|Search',
  config: {},
  stories,
  Component: Search,
  decorator,
}
