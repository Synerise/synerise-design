import * as React from 'react';

import { text } from '@storybook/addon-knobs';
import Autocomplete from '@synerise/ds-autocomplete';

const dataSource = ['First position', 'Second position'];

const AutocompleteWithState: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [results, setResults] = React.useState<string[]>([]);

  const handleSearch = value => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = dataSource.filter(item => item.includes(value));
    }

    const newResults = result.map(item => item.replace(value, `<strong>${value}</strong>`));

    setResults(newResults);
  };

  const extractContent = (str: string) => {
    const span = document.createElement('span');
    span.innerHTML = str;
    return span.textContent || span.innerText;
  };

  return (
    <Autocomplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      allowClear
      label={text('label', 'Label')}
      description={text('description', 'Description')}
      errorText={text('errorText', 'Error message')}
      onChange={(value: string) => setValue(extractContent(value))}
      value={value === 'undefined' ? '' : value}
    >
      {results.map(result => (
        <Autocomplete.Option key={result}>
          <span dangerouslySetInnerHTML={{ __html: result }} />
        </Autocomplete.Option>
      ))}
    </Autocomplete>
  );
};

const stories = {
  default: () => <AutocompleteWithState />,
};

export default {
  name: 'Components|Autocomplete',
  config: {},
  stories,
  Component: Autocomplete,
};
