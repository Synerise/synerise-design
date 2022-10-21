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
  const [isFocus, setFocus] = React.useState(false);

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
      label={renderLabel(text('Label', 'Label'))}
      errorText={!isFocus && getErrorText(hasError)}
      error={!isFocus && hasError}
      onBlur={()=>{action ('I am blurred'); setFocus(false)}}
      onFocus={()=>{action('I am focused'); setFocus(true)}}
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
  const [results, setResults] = React.useState<string[]>([]);
  const description = text('Description','Description');
  const errorMessage = text('Error Text', 'Error' );
  const hasError = boolean('Set validation state',false);
  const loading = boolean('Set loading indicator',false);
  const placeholder = text('Placeholder', 'Placeholder');
  const [isFocus, setFocus] = React.useState(false);
  const autoResize = boolean('Set autoResize', true);
  const autoResizeMaxWidth = number('Set autoResize max width', 300);
  const autoResizeMinWidth = number('Set autoResize min width', 150);


  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(jsonData => jsonData.json())
      .then(jsonData => {
        setResults(jsonData)
      })
  },[]);
  const handleSearch = value => {
    let result;
    if (!value || value.indexOf('@') >= 0) {
      result = [];
    } else {
      result = results.filter(item => Object.values(item)
        .join("")
        .toLowerCase()
        .includes(value.toLowerCase()));
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

  const changeHandler = (value: string) => {
    setValue(extractContent(value));
    handleSearch(extractContent(value));
  }

  const onChangeDebounce = React.useCallback(debounce(changeHandler, 30), [
    changeHandler
  ]);

  return (
    <Autocomplete
      placeholder={placeholder}
      onSearch={handleSearch}
      label={renderLabel(text('Label', 'Label'))}
      errorText={!isFocus && getErrorText(hasError)}
      error={!isFocus && hasError}
      onBlur={()=>{action ('I am blurred'); setFocus(false)}}
      onFocus={()=>{action('I am focused'); setFocus(true)}}
      onChange={onChangeDebounce}
      description={description}
      autoResize={autoResize && {maxWidth: `${autoResizeMaxWidth}px`, minWidth: `${autoResizeMinWidth}px`}}
      value={value === 'undefined' ? '' : value}
    >
      {!loading && results.map(result => (
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
