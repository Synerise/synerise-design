import React, { useState } from 'react';

import type { StoryObj, Meta } from '@storybook/react';

import { EditableList, EditableParam } from '@synerise/ds-form';
import { escapeRegEx } from '@synerise/ds-utils';
import Autocomplete from '@synerise/ds-autocomplete';

import {
  BOOLEAN_CONTROL,
  centeredPaddedWrapper,
  CLASSNAME_ARG_CONTROL,
} from '../../utils';

import { dataSource, validationTypes, renderLabel } from './Editable.data';


export default {
  title: "Components/EditableList",
  tags: ['autodocs'],
  component: EditableList,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    validation: BOOLEAN_CONTROL,
    disabled: BOOLEAN_CONTROL,
  },
} as Meta<typeof EditableList>;

type Story = StoryObj<typeof EditableList>;


export const Default: Story = {
  render: (args) => {
    const value = [{name: "ParamA", value: "89"}, {name: "ParamB", value: "90"}];
    const validation = {
      validateLeftColumn: validationTypes['stringOnly'],
      validateRightColumn: validationTypes['numberOnly'],
    };

    return (
      <EditableList
        {...args}
      value={value}
      onChange
      renderActions={true}
      onClickDelete
      addButtonConfig={{
        textAddButton: 'Add parameter',
      }}
      validation={validation}
    />)
  },
  args: {
  },
};


export const Customize: Story = {
  render: (args) => {
    const [results, setResults] = useState<string[]>(['']);
    const [value, setValue] = useState<EditableParam[]>([{ name: '', value: ''}]);
    const validation = {
      validateLeftColumn: validationTypes['stringOnly'],
      validateRightColumn: validationTypes['numberOnly'],
    };

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

    return (
      <EditableList
        {...args}
        onSearch={handleSearch}
        leftColumnName={renderLabel( 'Parametr')}
        rightColumnName={renderLabel( 'Value')}
        renderActions={false}
        value={value}
        addButtonConfig={{
          textAddButton: 'Add parameter',
        }}
        validation={args.validation === true ? validation : undefined}
        onChange={(val: string) => {
          setValue(val)
          handleSearch(extractContent(value));
        }}
        autocompleteOptions={results.map(result => (
          <Autocomplete.Option key={result} >
            <span style={{ fontWeight: 400 }}>{renderWithHighlightedText(value, result)}</span>
          </Autocomplete.Option>
        ))}
        firstInputProps={350}
        secondInputProps={350}
      />
    )
  },
  args: {
  },
};

export const withAutoComplete: Story = {
  render: (args) => {
    const [results, setResults] = useState<string[]>(['']);
    const [value, setValue] = useState<EditableParam[]>([{ name: '', value: ''}]);
    const validation = {
      validateLeftColumn: validationTypes['stringOnly'],
      validateRightColumn: validationTypes['numberOnly'],
    };

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

    return (
      <EditableList
        {...args}
        onSearch={handleSearch}
        leftColumnName={renderLabel('Parametr')}
        rightColumnName={renderLabel('Value')}
        renderActions={false}
        value={value}
        addButtonConfig={{
          textAddButton: 'Add parameter',
        }}
        validation={args.validation === true ? validation : undefined}
        onChange={(val: string) => {
          setValue(val)
          handleSearch(extractContent(value));
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
  args: {
  },
};

export const withValidation: Story = {
  render: (args) => {
    const [value, setValue] = React.useState<EditableParam[]>([{ name: '123', value: 'Wrong value' }]);
    const validation = {
      validateLeftColumn: validationTypes['stringOnly'],
      validateRightColumn: validationTypes['numberOnly'],
    };

    return (
      <EditableList
        {...args}
        leftColumnName={renderLabel('Parametr')}
        rightColumnName={renderLabel('Value')}
        value={value}
        onChange={(val: string) => {
          setValue(val)
        }}
        renderActions={true}
        onClickDelete
        addButtonConfig={{
          textAddButton: 'Add parameter',
        }}
        validation={validation}
      />
    )
  },
  args: {
  },
};

