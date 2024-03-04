import React, { useState } from 'react';
import { text, boolean, number } from '@storybook/addon-knobs';
import Autocomplete from '@synerise/ds-autocomplete';
import { escapeRegEx } from '@synerise/ds-utils';
import { action } from '@storybook/addon-actions';
import Loader from '@synerise/ds-loader';
import { LoaderWrapper } from '@synerise/ds-autocomplete/dist/Autocomplete.styles';
import { AutoResizeProp, AutosizeInput } from '@synerise/ds-input';
import AntdAutoComplete from 'antd/lib/auto-complete';

const dataSource = ['First position', 'Second position'];
const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

const AutocompleteWithState = () => {
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const description = text('Description', 'Description');
  const errorMessage = text('Error Text', 'Error');
  const hasError = boolean('Set validation state', false);
  const loading = boolean('Set loading indicator', false);
  const readOnly = boolean('Set readOnly', false);
  const placeholder = text('Placeholder', 'Placeholder');
  const [isBlur, setBlur] = useState(false);
  

  const renderWithHighlightedText = (highlight, item) => {
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

  const getErrorText = (hasError: boolean) => {
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


  let containerWidth = 0;
  const autoResize = boolean('Set autoResize', true, 'autoresize');
  const autoResizeStretchToParent = boolean('Set autoResize max width to stretch to parent', true, 'autoresize');
  const autoResizeProp: AutoResizeProp = {
    minWidth: `${number('Set autoResize min width', 150, undefined, 'autoresize')}px`,
    stretchToFit: autoResizeStretchToParent
  }
  if (autoResizeStretchToParent) {
    containerWidth = number('Set container width', 400, undefined, 'autoresize')
  }
  else {
    autoResizeProp.maxWidth = `${number('Set autoResize max width', 300, undefined, 'autoresize')}px`;
  }

  return (
    <div style={containerWidth ? { width: `${containerWidth}px`, border: 'dashed 1px #ddd' } : undefined}>
      <Autocomplete
        placeholder={placeholder}
        onSearch={handleSearch}
        readOnly={readOnly}
        autoResize={
          autoResize ? autoResizeProp : undefined
        }
        label={renderLabel(text('Label', 'Label'))}
        errorText={!isBlur && getErrorText(hasError)}
        error={!isBlur && hasError}
        onBlur={() => {
          action('I am blurred');
          setBlur(false);
        }}
        onFocus={() => {
          action('I am focused');
          setBlur(true);
        }}
        onChange={(value: string) => {
          setValue(extractContent(value));
          handleSearch(extractContent(value));
        }}
        description={description}
        value={value === 'undefined' ? '' : value}
      >
        {!loading &&
          results.map(result => (
            <Autocomplete.Option value={value} key={result}>
              <span style={{ fontWeight: 400 }}>{renderWithHighlightedText(value, result)}</span>
            </Autocomplete.Option>
          ))}
        {loading && (
          <Autocomplete.Option value="">
            <LoaderWrapper>
              <Loader label="Loading..." />
            </LoaderWrapper>{' '}
          </Autocomplete.Option>
        )}
      </Autocomplete>
    </div>
  );
};
const AutocompleteWithAutosize = () => {
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [options, setOptions] = useState<{ value: string }[]>([]);

  return (<>
    <AutosizeInput
      renderInput={Autocomplete || AntdAutoComplete}
      extraWidth={24}
      options={options}
      inputStyle={{
        ...(number('Min width', 200) ? {minWidth: number('Min width', 200)} : {}),
        ...(number('Max width', 0) ? {maxWidth: number('Max width', 0)} : {}),
      }}
      onSelect={val => setValue(val)}
      onSearch={(text) => {
        setOptions([text + ' sample value', `text: ${text}`].map(e => ({value: e})));
        setSearch(text);
      }}
      textLenPropName="value"
      value={search}
      placeholder="input here"
      description={value ? `Value: ${value}` : '(select an option)'}
    ></AutosizeInput>
  </>);
};

const stories = {
  default: () => <AutocompleteWithState />,
  AutocompleteWithAutosize: () => <AutocompleteWithAutosize />,
};

export default {
  name: 'Components/Autocomplete',
  config: {},
  stories,
  Component: Autocomplete,
};
