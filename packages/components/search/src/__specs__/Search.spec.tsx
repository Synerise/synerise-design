import * as React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/dom';
import Menu from '@synerise/ds-menu';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';

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
    <Menu.Item onItemHover={(): void => {}}>{item && (item as { text: string }).text}</Menu.Item>
  ),
};
const suggestionsDisplayProps = {
  tooltip: 'Suggest',
  title: SUGGESTIONS_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: object) => (
    <Menu.Item onItemHover={(): void => {}}>{item && (item as { text: string }).text}</Menu.Item>
  ),
};
const recentDisplayProps = {
  tooltip: 'Recent',
  title: RECENT_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: object) => (
    <Menu.Item onItemHover={(): void => {}}>{item && (item as { text: string }).text}</Menu.Item>
  ),
};
const INPUT_EXPAND_ANIMATION_DURATION = 200;
const waitForDropdownToExpand = () => new Promise(r => setTimeout(r, INPUT_EXPAND_ANIMATION_DURATION));
describe('Search with dropdown', () => {
  const onChange = jest.fn();
  const onParameterValueChange = jest.fn();

  it('should render', () => {
    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip="clear"
        parameters={parametersList}
        placeholder={PLACEHOLDER}
        recent={recent}
        suggestions={suggestions}
        value={INPUT_VALUE}
        parameterValue={FILTER_VALUE}
        onValueChange={onChange}
        onParameterValueChange={onChange}
        parametersDisplayProps={parametersDisplayProps}
        recentDisplayProps={recentDisplayProps}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        width={200}
      />
    );

    // ASSERT
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        parameters={parametersList}
        placeholder={PLACEHOLDER}
        recent={recent}
        suggestions={suggestions}
        value={''}
        parameterValue={FILTER_VALUE}
        onValueChange={onChange}
        onParameterValueChange={onParameterValueChange}
        parametersDisplayProps={parametersDisplayProps}
        recentDisplayProps={recentDisplayProps}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        width={200}
      />
    );

    const input = screen.getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    // ACT
    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    // ASSERT
    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('should set filter', async () => {
    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        parameters={parametersList}
        placeholder={PLACEHOLDER}
        recent={recent}
        suggestions={suggestions}
        value={''}
        parameterValue={FILTER_VALUE}
        onValueChange={onChange}
        onParameterValueChange={onParameterValueChange}
        parametersDisplayProps={parametersDisplayProps}
        recentDisplayProps={recentDisplayProps}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        width={200}
      />
    );

    const btn = screen.getByTestId('btn') as HTMLInputElement;

    // ACT
    await btn.click();
    await waitForDropdownToExpand();
    const parameter = screen.getByText('City') as HTMLInputElement;

    await parameter.click();

    // ASSERT
    expect(onParameterValueChange).toBeCalledWith('City');
  });

  it('should render input with value', async () => {
    // ARRANGE
    renderWithProvider(
      <Search
        clearTooltip={'clear'}
        parameters={parametersList}
        placeholder={PLACEHOLDER}
        recent={recent}
        suggestions={suggestions}
        value={'TestValue'}
        parameterValue={FILTER_VALUE}
        onValueChange={onChange}
        onParameterValueChange={onParameterValueChange}
        parametersDisplayProps={parametersDisplayProps}
        recentDisplayProps={recentDisplayProps}
        suggestionsDisplayProps={suggestionsDisplayProps}
        textLookupConfig={textLookupConfig}
        width={200}
      />
    );

    const btn = screen.getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();
    const inputWithValue = screen.getByDisplayValue('TestValue') as HTMLInputElement;
    // ASSERT
    expect(inputWithValue).toBeTruthy();
  });

  it('should render suggestions with title', async () => {
    // ARRANGE
    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip="clear"
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
      </div>
    );

    const btn = screen.getByTestId('btn') as HTMLButtonElement;
    // ACT
    userEvent.click(btn);
    userEvent.click(screen.getByText(/City/i));

    const title = screen.getByText(SUGGESTIONS_TITLE);
    expect(title).toBeTruthy();
  });

  it('should render parameters with title', async () => {
    // ARRANGE
    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip={'clear'}
          placeholder={PLACEHOLDER}
          recent={recent}
          suggestions={suggestions}
          value=""
          onValueChange={onChange}
          onParameterValueChange={onParameterValueChange}
          parameters={parametersList}
          parametersDisplayProps={parametersDisplayProps}
          parameterValue=""
          recentDisplayProps={recentDisplayProps}
          suggestionsDisplayProps={suggestionsDisplayProps}
          textLookupConfig={textLookupConfig}
          width={200}
        />
      </div>
    );

    const btn = screen.getByTestId('btn') as HTMLInputElement;
    // ACT
    userEvent.click(btn);

    const title = screen.getByText(PARAMETERS_TITLE) as HTMLElement;
    expect(title).toBeTruthy();
  });

  it('should render recent with title', async () => {
    // ARRANGE
    renderWithProvider(
      <div>
        <button>differentElement</button>
        <Search
          clearTooltip={'clear'}
          parameters={parametersList}
          placeholder={PLACEHOLDER}
          recent={recent}
          suggestions={suggestions}
          value=""
          parameterValue=""
          onValueChange={onChange}
          onParameterValueChange={onParameterValueChange}
          parametersDisplayProps={parametersDisplayProps}
          recentDisplayProps={recentDisplayProps}
          suggestionsDisplayProps={suggestionsDisplayProps}
          textLookupConfig={textLookupConfig}
          width={200}
        />
      </div>
    );

    const btn = screen.getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();
    const title = screen.getByText(RECENT_TITLE) as HTMLElement;
    expect(title).toBeTruthy();
  });
});
