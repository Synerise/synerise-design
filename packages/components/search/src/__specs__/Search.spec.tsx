import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Search from './../Search';
import {fireEvent} from "@testing-library/dom";
import VarTypeStringM from "@synerise/ds-icon/dist/icons/VarTypeStringM";

const filterList = [
    { text: 'City', icon: <VarTypeStringM/> },
];

const recent = [
    { text: 'Cirilla', filter: 'City', icon: <VarTypeStringM/> },
];

const results = [
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
        parameters={filterList}
        placeholder={PLACEHOLDER}
        recent={recent}
        results={results}
        value={INPUT_VALUE}
        filterValue={FILTER_VALUE}
        onValueChange={onChange}
        onFilterValueChange={onChange}
      />);

    // ASSERT
    expect(getByPlaceholderText(PLACEHOLDER)).toBeTruthy();
  });

  it('should change value', () => {
    // ARRANGE
    const {getByPlaceholderText} = renderWithProvider(
      <Search
        clearTooltip={'clear'}
        parameters={filterList}
        placeholder={PLACEHOLDER}
        recent={recent}
        results={results}
        value={''}
        filterValue={FILTER_VALUE}
        onValueChange={onChange}
        onFilterValueChange={onFilterChange}
      />);

    const input = getByPlaceholderText(PLACEHOLDER) as HTMLInputElement;

    // ACT
    fireEvent.change(input, { target: { value: INPUT_VALUE } });

    // ASSERT
    expect(onChange).toBeCalledWith(INPUT_VALUE);
  });

  it('should set filter', () => {
    // ARRANGE
    const { getByTestId } = renderWithProvider(
      <Search
        clearTooltip={'clear'}
        parameters={filterList}
        placeholder={PLACEHOLDER}
        recent={recent}
        results={results}
        value={''}
        filterValue={FILTER_VALUE}
        onValueChange={onChange}
        onFilterValueChange={onFilterChange}
      />);

    const btn = getByTestId('btn') as HTMLInputElement;

    // ACT
    btn.click();

    const filter = getByTestId('filter') as HTMLInputElement;

    filter.click();

    // ASSERT
    expect(onFilterChange).toBeCalledWith('City');
  });
});
