import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Search from './../Search';
import {fireEvent} from "@testing-library/dom";
import VarTypeStringM from "@synerise/ds-icon/dist/icons/VarTypeStringM";

const parametersList = [
    { text: 'City', icon: <VarTypeStringM/> },
];

const recent = [
    { text: 'Cirilla', filter: 'City', icon: <VarTypeStringM/> },
];

const suggestions = [
    { text: 'Cirilla' },
];

describe('SearchBar', () => {
  const PLACEHOLDER = 'placeholder';
  const INPUT_VALUE = 'input value';
  const FILTER_VALUE = 'input value';
  const onChange = jest.fn();
  const onFilterChange = jest.fn();

  it('should render', () => {
    // ARRANGE
    const {getByPlaceholderText} = renderWithProvider(
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
        width={200}
      />);

    // ASSERT
    expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    // ARRANGE
    const {getByPlaceholderText} = renderWithProvider(
      <Search
        clearTooltip={'clear'}
        parameters={parametersList}
        placeholder={PLACEHOLDER}
        recent={recent}
        suggestions={suggestions}
        value={''}
        parameterValue={FILTER_VALUE}
        onValueChange={onChange}
        onParameterValueChange={onFilterChange}
        width={200}
      />);

    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    // ACT
    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    // ASSERT
    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('should set filter', () => {
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
        onParameterValueChange={onFilterChange}
        width={200}
      />);

    const btn = getByTestId('btn') as HTMLInputElement;

    // ACT
    btn.click();

    const parameter = getByText('City') as HTMLInputElement;

    parameter.click();

    // ASSERT
    expect(onFilterChange).toBeCalledWith('City');
  });
});
