import {text, object, array, boolean} from '@storybook/addon-knobs';
import * as React from 'react';
import { action } from '@storybook/addon-actions';
import Autocomplete from '@synerise/ds-autocomplete';
import { EditableList } from '@synerise/ds-form';
import { escapeRegEx } from '@synerise/ds-utils';
import { EditableParam } from '@synerise/ds-form/dist/editable-list/editable-list.types';

const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

const dataSource = ['Score', 'Season', 'Theme', 'Departament'];

const stories = {
  default: () => {
    const value = JSON.parse(text('Value', '[{"name": "ParamA", "value": "ValueA"}, {"name": "ParamB", "value": "ValueB"}]').replace(/&quot;/g, '"'))
    return (<EditableList
      value={value}
      onChange={action('onChange')}
      renderActions={boolean('Render actions', true)}
      textAddButton={text('Add entry button text', 'Add parameter')}
      onClickDelete={action('onClickDelete')}
      onClickAddRow={action('onClickAddRow')}
    />)
  },
  withAutocomplete: () => {
    const [results, setResults] = React.useState<string[]>([]);
    const [value, setValue] = React.useState<EditableParam[]>([]);
    const buttonText = text('Button text', 'Add parametr');

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

    const extractContent = (str: string) => {
      const span = document.createElement('span');
      span.innerHTML = str;
      return span.textContent || span.innerText;
    };

    return (
      <EditableList
        onSearch={handleSearch}
        leftColumnName={renderLabel(text('Select label', 'Parametr'))}
        rightColumnName={renderLabel(text('Input label', 'Value'))}
        renderActions={boolean('Render actions', false)}
        value={value}
        onChange={(val: string) => {
          action('onChange')(val);
          setValue(val)
          handleSearch(extractContent(value));
        }}
        textAddButton={text('Add entry button label', 'Add parameter')}
        autocompleteOptions={results.map(result => (
          <Autocomplete.Option key={result}>
            <span style={{ fontWeight: 400 }}>{renderWithHighlightedText(value, result)}</span>
          </Autocomplete.Option>
        ))}
      />
    )
  },
};

export default {
  name: 'Components/Form/EditableList',
  stories,
  Component: EditableList
};