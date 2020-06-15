import * as React from 'react';

import { text, boolean } from '@storybook/addon-knobs';
import Autocomplete from '@synerise/ds-autocomplete';
import { findAllByPlaceholderText } from '@testing-library/react';
import { escapeRegEx } from '@synerise/ds-utils';
import { action } from '@storybook/addon-actions';

const dataSource = ['First position', 'Second position'];

const AutocompleteWithState: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [results, setResults] = React.useState<string[]>([]);
  const label = text('Label','Label');
  const description = text('Description','Description');
  const errorMessage = text('Error Text', 'Error' );
  const hasError = boolean('Set validation state',false);
  const placeholder = text('Placeholder', 'Placeholder')
  const [isFocus, setFocus] = React.useState(false)

  const renderWithHighlightedText = (highlight,item): React.ReactNode => {
    if (highlight && typeof item === 'string') {
      const index = item.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
      if (index === -1) {
        return item;
      }
      const escapedHighlight = escapeRegEx(highlight);
      const startOfQuery = item.toLowerCase().search(escapedHighlight.toLowerCase());
      const endOfQuery = startOfQuery + highlight.length;
      const resultArray = [
        item.substring(0, startOfQuery),
        <span key={item} style={{fontWeight:600}} className="search-highlight">
          {item.substring(startOfQuery, endOfQuery)}
        </span>,
        item.substring(endOfQuery, item.length),
      ];
      return resultArray;
    }
    return item;
  };

  const handleSearch = value => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = dataSource.filter(item => item.toLowerCase().includes(value.toLowerCase()));
    }

    const newResults = result.map(item => renderWithHighlightedText(value,item));

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
      placeholder={placeholder}
      onSearch={handleSearch}
      label={label}
      description={description}
      errorText={!isFocus && getErrorText(hasError)}
      error={!isFocus && hasError}
      onBlur={()=>{action ('I am blurred'); setFocus(false)}}
      onFocus={()=>{action('I am focused'); setFocus(true)}}
      onChange={(value: string) => setValue(extractContent(value))}
      value={value === 'undefined' ? '' : value}
    >
      {results.map(result => (
        <Autocomplete.Option key={result}>
          <span style={{fontWeight:400}}>{result}</span>
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
