import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Search from './../Search';
import { fireEvent } from '@testing-library/dom';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import Menu from '@synerise/ds-menu';
import { FilterElement } from '../Search.types';

const parametersList = [{ text: 'City', icon: <VarTypeStringM /> }];

const recent = [{ text: 'Chicago', filter: 'City', icon: <VarTypeStringM /> }];

const suggestions = [{ text: 'Cirilla' }];
const PLACEHOLDER = 'placeholder';
const SUGGESTIONS_TITLE = 'suggestions';
const PARAMETERS_TITLE = 'parameters';
const RECENT_TITLE = 'recent';
const INPUT_VALUE = 'input value';
const FILTER_VALUE = 'input value';

const parametersDisplayProps = {
  tooltip: 'Parameters',
  title: PARAMETERS_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
};
const suggestionsDisplayProps = {
  tooltip: 'Suggest',
  title: SUGGESTIONS_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
};
const recentDisplayProps = {
  tooltip: 'Recent',
  title: RECENT_TITLE,
  rowHeight: 32,
  visibleRows: 3,
  itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
};
const INPUT_EXPAND_ANIMATION_DURATION = 200;
const waitForDropdownToExpand = () => new Promise(r => setTimeout(r, INPUT_EXPAND_ANIMATION_DURATION));
describe('Search with dropdown', () => {
  const onChange = jest.fn();
  const onParameterValueChange = jest.fn();

  it('should render', () => {
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
      <Search
        clearTooltip={'clear'}
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
        width={200}
      />
    );

    // ASSERT
    expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    // ARRANGE
    const { getByPlaceholderText } = renderWithProvider(
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
        width={200}
      />
    );

    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    // ACT
    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    // ASSERT
    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('should set filter', async () => {
    // ARRANGE
    const { getByTestId, getByText } = renderWithProvider(
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
        width={200}
      />
    );

    const btn = getByTestId('btn') as HTMLInputElement;

    // ACT
    await btn.click();
    await waitForDropdownToExpand();
    const parameter = getByText('City') as HTMLInputElement;

    await parameter.click();

    // ASSERT
    expect(onParameterValueChange).toBeCalledWith('City');
  });
  it('should render input with value', async () => {
    // ARRANGE
    const { getByTestId, getByDisplayValue } = renderWithProvider(
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
        width={200}
      />
    );

    const btn = getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();
    const inputWithValue = getByDisplayValue('TestValue') as HTMLInputElement;
    // ASSERT
    expect(inputWithValue).toBeTruthy();
  });
  it('should render suggestions with title', async () => {
    // ARRANGE
    const { getByTestId, getByText } = renderWithProvider(
      <div>
        <button>differentElement</button>
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
          width={200}
        />
      </div>
    );

    const btn = getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();

    const title = getByText(SUGGESTIONS_TITLE);
    expect(title).toBeTruthy();
  });
  it('should render parameters with title', async () => {
    // ARRANGE
    const { getByTestId, getByText } = renderWithProvider(
      <div>
        <button>differentElement</button>
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
          width={200}
        />
      </div>
    );

    const btn = getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();

    const title = getByText(PARAMETERS_TITLE) as HTMLElement;
    expect(title).toBeTruthy();
  });
  it('should render recent with title', async () => {
    // ARRANGE
    const { getByTestId, getByText } = renderWithProvider(
      <div>
        <button>differentElement</button>
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
          width={200}
        />
      </div>
    );

    const btn = getByTestId('btn') as HTMLInputElement;
    // ACT
    btn.click();
    const title = getByText(RECENT_TITLE) as HTMLElement;
    expect(title).toBeTruthy();
  });
});
