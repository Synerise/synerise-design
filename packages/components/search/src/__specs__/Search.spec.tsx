import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VarTypeStringM } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';
import { renderWithProvider } from '@synerise/ds-core';

import Search from './../Search';

const parametersList = [
  { text: 'City', icon: <VarTypeStringM /> },
  { text: 'Country', icon: <VarTypeStringM /> },
];

const recent = [{ text: 'Chicago', filter: 'City', icon: <VarTypeStringM /> }];

const suggestions = [{ text: 'Cirilla' }];
const PLACEHOLDER = 'placeholder';
const SUGGESTIONS_TITLE = 'suggestions';
const PARAMETERS_TITLE = 'parameters';
const RECENT_TITLE = 'recent';
const INPUT_VALUE = 'input value';
const FILTER_VALUE = 'input value';
const textLookupConfig = {
  parameters: 'text',
  recent: 'text',
  suggestions: 'text',
};

const parametersDisplayProps = {
  tooltip: 'Parameters',
  title: PARAMETERS_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: object) => (
    <ListItem>{item && (item as { text: string }).text}</ListItem>
  ),
};
const suggestionsDisplayProps = {
  tooltip: 'Suggest',
  title: SUGGESTIONS_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: object) => (
    <ListItem>{item && (item as { text: string }).text}</ListItem>
  ),
};
const recentDisplayProps = {
  tooltip: 'Recent',
  title: RECENT_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: object) => (
    <ListItem>{item && (item as { text: string }).text}</ListItem>
  ),
};

const dropdownMaxHeight = 400;
describe('Search with dropdown', () => {
  it('should render', () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    renderWithProvider(
      <Search
        clearTooltip="clear"
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue={FILTER_VALUE}
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value={INPUT_VALUE}
        width={200}
      />,
    );

    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue={FILTER_VALUE}
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value={''}
        width={200}
      />,
    );

    const input = screen.getByPlaceholderText(PLACEHOLDER);

    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('should set filter', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue={FILTER_VALUE}
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value={''}
        width={200}
      />,
    );

    const btn = screen.getByTestId('btn');

    btn.click();
    await waitFor(
      () => {
        const parameter = screen.getByText('City');
        parameter.click();
        expect(onParameterValueChange).toBeCalledWith('City', {
          text: 'City',
          icon: <VarTypeStringM />,
        });
      },
      {
        timeout: 1000,
      },
    );
  });

  it('should render input with value', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue={FILTER_VALUE}
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value={'TestValue'}
        width={200}
      />,
    );

    const btn = screen.getByTestId('btn');
    btn.click();
    const inputWithValue = screen.getByDisplayValue('TestValue');
    expect(inputWithValue).toBeTruthy();
  });

  it('should render suggestions with title', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip="clear"
          dropdownMaxHeight={dropdownMaxHeight}
          onClear={onClear}
          onParameterValueChange={onParameterValueChange}
          onValueChange={onChange}
          parameters={parametersList}
          parametersDisplayProps={parametersDisplayProps}
          parameterValue="City"
          placeholder={PLACEHOLDER}
          recent={recent}
          recentDisplayProps={recentDisplayProps}
          suggestions={suggestions}
          suggestionsDisplayProps={suggestionsDisplayProps}
          textLookupConfig={textLookupConfig}
          value=""
          width={200}
        />
      </div>,
    );

    userEvent.click(screen.getByText(/City/i));

    const title = await screen.findByText(SUGGESTIONS_TITLE);
    expect(title).toBeTruthy();
  });

  it('should render parameters with title', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip={'clear'}
          dropdownMaxHeight={dropdownMaxHeight}
          onClear={onClear}
          onParameterValueChange={onParameterValueChange}
          onValueChange={onChange}
          parameters={parametersList}
          parametersDisplayProps={parametersDisplayProps}
          parameterValue=""
          placeholder={PLACEHOLDER}
          recentDisplayProps={recentDisplayProps}
          recent={recent}
          suggestions={suggestions}
          suggestionsDisplayProps={suggestionsDisplayProps}
          textLookupConfig={textLookupConfig}
          value=""
          width={200}
        />
      </div>,
    );

    const btn = screen.getByTestId('btn');
    userEvent.click(btn);
    userEvent.click(await screen.findByRole('textbox'));

    const title = await screen.findByText(PARAMETERS_TITLE);
    expect(title).toBeTruthy();
  });

  it('should render recent with title', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip={'clear'}
          dropdownMaxHeight={dropdownMaxHeight}
          onClear={onClear}
          onParameterValueChange={onParameterValueChange}
          onValueChange={onChange}
          parameters={parametersList}
          parametersDisplayProps={parametersDisplayProps}
          parameterValue=""
          placeholder={PLACEHOLDER}
          recent={recent}
          recentDisplayProps={recentDisplayProps}
          suggestions={suggestions}
          suggestionsDisplayProps={suggestionsDisplayProps}
          textLookupConfig={textLookupConfig}
          value=""
          width={200}
        />
      </div>,
    );

    const btn = screen.getByTestId('btn');

    btn.click();
    const title = await screen.findByText(RECENT_TITLE);
    expect(title).toBeTruthy();
  });

  it('should call onClear when click on clear btn', async () => {
    const onChange = jest.fn();
    const onParameterValueChange = jest.fn();
    const onClear = jest.fn();

    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        dropdownMaxHeight={dropdownMaxHeight}
        onClear={onClear}
        onParameterValueChange={onParameterValueChange}
        onValueChange={onChange}
        parameters={parametersList}
        parametersDisplayProps={parametersDisplayProps}
        parameterValue="city"
        placeholder={PLACEHOLDER}
        recent={recent}
        recentDisplayProps={recentDisplayProps}
        suggestions={suggestions}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        value="Chicago"
        width={200}
      />,
    );
    userEvent.click(screen.getByTestId('clear'));

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
