import * as React from 'react';

import { text, boolean } from '@storybook/addon-knobs';
import Autocomplete from '@synerise/ds-autocomplete';
import { findAllByPlaceholderText } from '@testing-library/react';

const dataSource = ['First position', 'Second position'];

const AutocompleteWithState: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [results, setResults] = React.useState<string[]>([]);
  const hasLabel = text('Label','Label');
  const hasDescription = text('Description','Description');
  const errorMessage = text('Error Text', 'Error' );
  const hasError = boolean('Set validation state',false);
  const hasPlaceholder = text('Placeholder', 'Placeholder')

  const handleSearch = value => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = dataSource.filter(item => item.includes(value));
    }

    const newResults = result.map(item => item.replace(value, `<strong style="font-weight: 600;">${value}</strong>`));

    setResults(newResults);
  };

  const getErrorText = (hasError:boolean):string =>{
    if(hasError){
      return errorMessage
    }else{
      return''
    }
  }

  const extractContent = (str: string) => {
    const span = document.createElement('span');
    span.innerHTML = str;
    return span.textContent || span.innerText;
  };

  return (
    <Autocomplete
      style={{ width: 200 }}
      placeholder={hasPlaceholder}
      onSearch={handleSearch}
      label={hasLabel}
      description={hasDescription}
      errorText={getErrorText(hasError)}
      error={hasError}
      onChange={(value: string) => setValue(extractContent(value))}
      value={value === 'undefined' ? '' : value}
    >
      {results.map(result => (
        <Autocomplete.Option key={result}>
          <span style={{fontWeight:"400"}} dangerouslySetInnerHTML={{ __html: result }} />
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
