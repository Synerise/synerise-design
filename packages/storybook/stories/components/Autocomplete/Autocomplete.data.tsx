import React, { useState } from 'react';

import Autocomplete, { AutocompleteProps } from '@synerise/ds-autocomplete';

import { renderWithHighlightedText } from './utils';

const dataSource = [
  'First position',
  'Second position',
  'Third position',
  'Fourth position',
  'Fifth position',
  'Sixth position',
  'Seventh position',
  'Eighth position',
  'Ninth position',
  'Tenth position',
  'Eleventh position',
  'Twelfth position',
  'Thirteenth position',
  'Fourteenth position',
  'Fifteenth position',
  'Sixteenth position',
];
export const AutocompleteWithState = (props: AutocompleteProps) => {
  const [value, setValue] = useState(props.value);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    let result: Array<string>;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = dataSource.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
    }
    setResults(result);
  };

  return (
    <Autocomplete
      {...props}
      value={value}
      onSearch={handleSearch}
      onChange={setValue}
    >
      {results.map((result) => (
        <Autocomplete.Option value={result} key={result}>
          <span style={{ fontWeight: 400 }}>
            {renderWithHighlightedText(value, result)}
          </span>
        </Autocomplete.Option>
      ))}
    </Autocomplete>
  );
};
