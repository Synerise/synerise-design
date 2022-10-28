import * as React from 'react';
import { text, boolean, number } from '@storybook/addon-knobs';
import Autocomplete from '@synerise/ds-autocomplete';
import { escapeRegEx } from '@synerise/ds-utils';
import { action } from '@storybook/addon-actions';
import Loader from '@synerise/ds-loader';
import { LoaderWrapper } from '@synerise/ds-autocomplete/dist/Autocomplete.styles';
import { debounce } from 'lodash';

const dataSource = ['First position', 'Second position'];
const renderLabel = (text:string)=>{
  return (<div style={{maxWidth:'200px', textOverflow: 'ellipsis', overflow:'hidden'}}>{text}</div>)
}

const AutocompleteWithState: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [results, setResults] = React.useState<string[]>([]);
  const description = text('Description','Description');
  const errorMessage = text('Error Text', 'Error' );
  const hasError = boolean('Set validation state',false);
  const loading = boolean('Set loading indicator',false);
  const placeholder = text('Placeholder', 'Placeholder');
  const [isBlur, setBlur] = React.useState(false);
  const autoResize = boolean('Set autoResize', false);

  const renderWithHighlightedText = (highlight, item): React.ReactNode => {
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
        <span key={item} style={{ fontWeight: 600 }} className="search-highlight">
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
    setResults(result);
  };

  const getErrorText = (hasError: boolean): string => {
    if (hasError) {
      return errorMessage;
    } else {
      return '';
    }
  };

  const extractContent = (str: string) => {
    const span = document.createElement('span');
    span.innerHTML = str;
    return span.textContent || span.innerText;
  };

  return (
    <Autocomplete
      placeholder={placeholder}
      onSearch={handleSearch}
      autoResize={autoResize ? {maxWidth: `${number('Set autoResize max width', 300)}px`, minWidth: `${number('Set autoResize min width', 150)}px`} : undefined}
      label={renderLabel(text('Label', 'Label'))}
      errorText={!isBlur && getErrorText(hasError)}
      error={!isBlur && hasError}
      onBlur={()=>{action ('I am blurred'); setBlur(false)}}
      onFocus={()=>{action('I am focused'); setBlur(true)}}
      onChange={(value: string) => {
        setValue(extractContent(value));
        handleSearch(extractContent(value));
      }}
      description={description}
      value={value === 'undefined' ? '' : value}
    >
      {!loading && results.map(result => (
        <Autocomplete.Option key={result}>
          <span style={{ fontWeight: 400 }}>{renderWithHighlightedText(value, result)}</span>
        </Autocomplete.Option>
      ))}
      {loading && <Autocomplete.Option><LoaderWrapper><Loader label='Loading...'/></LoaderWrapper> </Autocomplete.Option>}
    </Autocomplete>
  );
};
const AutocompleteWithAutoResize: React.FC = () => {
  const [value, setValue] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');
  const [results, setResults] = React.useState<string[]>([]);
  const description = text('Description','Description');
  const errorMessage = text('Error Text', 'Error' );
  const hasError = boolean('Set validation state',false);
  const loading = boolean('Set loading indicator',false);
  const placeholder = text('Placeholder', 'Placeholder');
  const [isBlur, setBlur] = React.useState(false);
  const autoResize = boolean('Set autoResize', true);
  const fetchData = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos?q=${value}`)
      .then(jsonData => jsonData.json())
      .then(jsonData => {
        setResults(jsonData)
      });
  }
  const debouncedResults = React.useMemo(() => {
    return debounce(fetchData, 300);
  }, [fetchData]);

  React.useEffect(() => {
    action('fetch')(value);
    return debouncedResults
  },[value]);


  const renderResults = React.useMemo(() => {
    if (!value || value.indexOf('@') >= 0) {
       return [search];
    } else {
      results.filter(item => Object.values(item)
        .join("")
        .toLowerCase()
        .includes(value.toLowerCase()));
    }
    return results;
  }, [results,search]);



  const getErrorText = (hasError: boolean): string => {
    if (hasError) {
      return errorMessage;
    } else {
      return '';
    }
  };

  const extractContent = (str: string) => {
    const span = document.createElement('span');
    span.innerHTML = str;
    return span.textContent || span.innerText;
  };

  const changeHandler = (value: string) => {
    setSearch(extractContent(value));
  }
  const searchDebounce = React.useRef(debounce( (value: string) => {changeHandler(value)},300)).current;

  const onSearchChange = (value: string) => {
    searchDebounce.cancel();
    setValue(extractContent(value));
    searchDebounce(value);
  };

  return (
    <Autocomplete
      placeholder={placeholder}
      onSearch={renderResults}
      label={renderLabel(text('Label', 'Label'))}
      errorText={!isBlur && getErrorText(hasError)}
      error={!isBlur && hasError}
      onBlur={()=>{action ('I am blurred'); setBlur(false)}}
      onFocus={()=>{action('I am focused'); setBlur(true)}}
      onChange={onSearchChange}
      description={description}
      autoResize={autoResize ? {maxWidth: `${number('Set autoResize max width', 300)}px`, minWidth: `${number('Set autoResize min width', 150)}px`} : undefined}
      value={value === 'undefined' ? '' : value}
    >
      {!loading && renderResults.map(result => (
        <Autocomplete.Option value={result.title} key={result.toString()}>
          <span style={{ fontWeight: 400 }}>{JSON.stringify(result.title)}</span>
        </Autocomplete.Option>
      ))}
      {loading && <Autocomplete.Option><LoaderWrapper><Loader label='Loading...'/></LoaderWrapper> </Autocomplete.Option>}
    </Autocomplete>
  );
};

const stories = {
  default: () => <AutocompleteWithState />,
  AutocompleteWithAutoResize: () => <AutocompleteWithAutoResize />,
};

export default {
name: 'Components/Autocomplete',
  config: {},
  stories,
  Component: Autocomplete,
};
