import * as React from 'react';

import Search from '@synerise/ds-search';
import VarTypeStringM from "@synerise/ds-icon/dist/icons/VarTypeStringM";

const decorator = (storyFn) => (
  <div style={{ width: '300px' }}>
    {storyFn()}
  </div>
);

const filterList = [
  [
    { text: 'City', icon: <VarTypeStringM/> },
    { text: 'Client Name', icon: <VarTypeStringM/> },
    { text: 'Fruits', icon: <VarTypeStringM/> },
    { text: 'Sex', icon: <VarTypeStringM/> },
  ]
];

const recent = [
  [
    { text: 'Cirilla', filter: 'City', icon: <VarTypeStringM/> },
    { text: 'Frank', filter: 'Client Name', icon: <VarTypeStringM/> },
    { text: 'Naomi', filter: 'Fruits', icon: <VarTypeStringM/> },
    { text: 'Severus', filter: 'Sex', icon: <VarTypeStringM/> },
  ]
];

const results = [
  [
    { text: 'Cirilla' },
    { text: 'Frank' },
    { text: 'Naomi' },
    { text: 'Severus' },
  ]
];


const stories = {
  default: () => {
    const [value, setValue] = React.useState<string>('');
    const [filterValue, setFilterValue] = React.useState<string>('');

    return (
      <Search
        clearTooltip='Clear'
        placeholder='Search'
        filterTitle='Filters'
        recentTitle='Recent'
        resultTitle='Results'
        filterData={filterList}
        recent={recent}
        results={results}
        value={value}
        filterValue={filterValue}
        onValueChange={value => setValue(value)}
        onFilterValueChange={value => setFilterValue(value)}
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
