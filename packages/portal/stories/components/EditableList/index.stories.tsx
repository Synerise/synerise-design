import {text, boolean, select, number} from '@storybook/addon-knobs';
import React from 'react';
import { action } from '@storybook/addon-actions';
import Autocomplete from '@synerise/ds-autocomplete';
import { EditableList } from '@synerise/ds-form';
import { escapeRegEx } from '@synerise/ds-utils';
import type { EditableParam } from '@synerise/ds-form';

const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};

const dataSource = ['Score', 'Season', 'Theme', 'Departament'];

const validationTypes = {
  none: undefined,
  numberOnly: (val: string) => val && !/^[0-9]+$/.test(val) ? 'Invalid input' : null,
  stringOnly: (val: string) => val && !/^[a-zA-Z_]+$/.test(val) ? 'Invalid input' : null,
}

const stories = {
  default: () => {
    const value = JSON.parse(text('Value', '[{"name": "ParamA", "value": "ValueA"}, {"name": "ParamB", "value": "ValueB"}]').replace(/&quot;/g, '"'))

    const enableValidation = boolean('Enable validation', false);
    const validation = enableValidation ? {
      validateLeftColumn: validationTypes[select('Left validation', Object.keys(validationTypes), 'stringOnly')],
      validateRightColumn: validationTypes[select('Right validation', Object.keys(validationTypes), 'numberOnly')]
    } : undefined;
    return (<EditableList
      value={value}
      onChange={action('onChange')}
      renderActions={boolean('Render actions', true)}
      onClickDelete={action('onClickDelete')}
      addButtonConfig={{
        textAddButton: text('Add entry button text', 'Add parameter'),
        onClickAddRow: action('onClickAddRow')
      }}
      validation={validation}
    />)
  },
  customize: () => {
    const [results, setResults] = React.useState<string[]>(['']);
    const [value, setValue] = React.useState<EditableParam[]>([{ name: '', value: ''}]);

    const renderWithHighlightedText = (highlight, item): React.ReactNode => {
      if (highlight && typeof item === 'string' && typeof highlight === 'string') {
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

    const firstInputProps = {
      style: {
        width: number('Set first input custom width', 350)
      }
    };
    const secondInputProps = {
      style: {
        width: number('Set second input custom width', 300)
      }
    };

    const validation = {
      validateLeftColumn: validationTypes[select('Left validation', Object.keys(validationTypes), 'stringOnly')],
      validateRightColumn: validationTypes[select('Right validation', Object.keys(validationTypes), 'numberOnly')]
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
        addButtonConfig={{
          textAddButton: text('Add entry button text', 'Add parameter'),
          disableAddButton: boolean('Disable button', false)
        }}
        autocompleteOptions={results.map(result => (
          <Autocomplete.Option key={result} >
            <span style={{ fontWeight: 400 }}>{renderWithHighlightedText(value, result)}</span>
          </Autocomplete.Option>
        ))}
        firstInputProps={firstInputProps}
        secondInputProps={secondInputProps}
        validation={validation}
      />
    )
  },
  withAutocomplete: () => {
    const [results, setResults] = React.useState<string[]>([]);
    const [value, setValue] = React.useState<EditableParam[]>([{ name: '', value: 'Value'}]);

    const renderWithHighlightedText = (highlight, item): React.ReactNode => {
      if (highlight && typeof item === 'string' && typeof highlight === 'string') {
        const index = item?.toLocaleLowerCase().indexOf(highlight.toLocaleLowerCase());
        if (index === -1) {
          return item;
        }
        const escapedHighlight = escapeRegEx(highlight);
        const startOfQuery = item?.toLowerCase().search(escapedHighlight.toLowerCase());
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
        addButtonConfig={{
          textAddButton: text('Add entry button text', 'Add parameter')
        }}
        autocompleteOptions={results.map(result => (
          <Autocomplete.Option key={result}>
            <span style={{ fontWeight: 400 }}>{renderWithHighlightedText(value, result)}</span>
          </Autocomplete.Option>
        ))}
        firstInputProps={{
          autoFocus: true,
          style: {
            width: 350
          }
        }}
      />
    )
  },
  withValidation: () => {
    const [value, setValue] = React.useState<EditableParam[]>([{ name: '123', value: 'Wrong value'}]);

    const withValidation = boolean('Enable validation', true);

    const validation = withValidation ? {
      validateLeftColumn: validationTypes[select('Left validation', Object.keys(validationTypes), 'stringOnly')],
      validateRightColumn: validationTypes[select('Right validation', Object.keys(validationTypes), 'numberOnly')]
    } : undefined;

    return (
      <EditableList
        leftColumnName={renderLabel(text('Select label', 'Parametr'))}
        rightColumnName={renderLabel(text('Input label', 'Value'))}
        value={value}
        onChange={(val: string) => {
          action('onChange')(val);
          setValue(val)
        }}
        validation={validation}
        renderActions={boolean('Render actions', true)}
        onClickDelete={action('onClickDelete')}
        addButtonConfig={{
          textAddButton: text('Add entry button text', 'Add parameter'),
        }}
      />
    )
  },
  withDisabledAddButton: () => {
    const [value, setValue] = React.useState<EditableParam[]>([{ name: '', value: ''}]);
    const disabledButton = boolean('Disable button', true);
    const addButtonConfig = {
      textAddButton: text('Add entry button text', 'Add parameter'),
      disableAddButton: disabledButton ?? undefined
    }
    return (
      <EditableList
        leftColumnName={renderLabel(text('Select label', 'Parametr'))}
        rightColumnName={renderLabel(text('Input label', 'Value'))}
        value={value}
        onChange={(val: string) => {
          action('onChange')(val);
          setValue(val)
        }}
        renderActions={boolean('Render actions', true)}
        onClickDelete={action('onClickDelete')}
        addButtonConfig={addButtonConfig}
      />
    )
  },
  withCustomStyles: () => {
    const [value, setValue] = React.useState<EditableParam[]>([{ name: '', value: ''}]);

    const withCustomStyles = boolean('Enable custom styles', true);

    const firstInputProps = withCustomStyles ? {
      style: {
        width: number('Set first input custom width', 100)
      }
    } : undefined;

    const secondInputProps = withCustomStyles ? {
      style: {
        width: number('Set second input custom width', 100)
      }
    } : undefined;

    return (
      <EditableList
        leftColumnName={renderLabel(text('Select label', 'Parametr'))}
        rightColumnName={renderLabel(text('Input label', 'Value'))}
        value={value}
        onChange={(val: string) => {
          action('onChange')(val);
          setValue(val)
        }}
        renderActions={boolean('Render actions', true)}
        onClickDelete={action('onClickDelete')}
        addButtonConfig={{
          textAddButton: text('Add entry button text', 'Add parameter'),
        }}
        firstInputProps={firstInputProps}
        secondInputProps={secondInputProps}
      />
    )
  }
};

export default {
  name: 'Components/Form/EditableList',
  stories,
  Component: EditableList
};
