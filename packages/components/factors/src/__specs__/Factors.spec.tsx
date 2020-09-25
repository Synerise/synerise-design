import { VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import Factors from './../Factors';
import { FactorsProps, FactorType, FactorValueType } from '../Factors.types';
import { FACTORS_GROUPS, FACTORS_ITEMS, FACTORS_TEXTS } from './data/Factors.data';
import * as React from 'react';
import renderWithProvider from '@synerise/ds-utils/dist/testing/renderWithProvider/renderWithProvider';
import { fireEvent } from '@testing-library/react';

const DEFAULT_PROPS: FactorsProps = {
  selectedFactorType: '',
  setSelectedFactorType: (type: FactorType) => {},
  value: '',
  onChangeValue: (value: FactorValueType) => {},
  textType: 'default',
  defaultFactorType: 'text',
  autocompleteText: {
    options: ['First name', 'Last name', 'City']
  },
  unavailableFactorTypes: [],
  parameters: {
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: FACTORS_GROUPS,
    items: FACTORS_ITEMS
  },
  withoutTypeSelector: false,
  formulaEditor: <div>Formula editor</div>,
  texts: FACTORS_TEXTS

}

const RENDER_FACTORS = (props?: {}) => (<Factors {...DEFAULT_PROPS} {...props} />);

describe('Factors component', () => {
  test('Should render', () => {
    // ASSERT
    const {container} = renderWithProvider(RENDER_FACTORS());

    // ASSERT
    expect(container.querySelector('.ds-factors')).toBeTruthy();
    expect(container.querySelector('.ds-factors-type-selector')).toBeTruthy();
  });

  test('Should render with default type and placeholder', () => {
    // ARRANGE
    const {container, getByPlaceholderText} = renderWithProvider(RENDER_FACTORS());

    // ASSERT
    expect(container.querySelector(`.ds-factors-${DEFAULT_PROPS.defaultFactorType}`)).toBeTruthy();
    expect(getByPlaceholderText(FACTORS_TEXTS.valuePlaceholder)).toBeTruthy();
  });

  test('Should render with value', () => {
    // ARRANGE
    const VALUE = "DISPLAY_VALUE";
    const {getByDisplayValue} = renderWithProvider(RENDER_FACTORS({value: VALUE}));

    // ASSERT
    expect(getByDisplayValue(VALUE)).toBeTruthy();
  });

  test('Should render without change factor type button', () => {
    // ARRANGE
    const {container} = renderWithProvider(RENDER_FACTORS({withoutTypeSelector: true}));

    // ASSERT
    expect(container.querySelector('.ds-factors-type-selector')).toBeFalsy();
  });

  test('Should display list of available factor types', () => {
    // ARRANGE
    const {container, queryByText} = renderWithProvider(RENDER_FACTORS());
    const factorsTypeSelector = container.querySelector('.ds-factors-type-selector');

    // ACT
    factorsTypeSelector && fireEvent.click(factorsTypeSelector);

    // ASSERT
    expect(queryByText('Text')).toBeTruthy();
    expect(queryByText('Parameter')).toBeTruthy();
    expect(queryByText('Number')).toBeTruthy();
    expect(queryByText('Context parameter')).toBeTruthy();
    expect(queryByText('Dynamic key')).toBeTruthy();
    expect(queryByText('Array')).toBeTruthy();
    expect(queryByText('Date')).toBeTruthy();
    expect(queryByText('Formula')).toBeTruthy();
  });

  test('Should display list of factor types, without excluded ones', () => {
    // ARRANGE
    const {container, queryByText} = renderWithProvider(RENDER_FACTORS({unavailableFactorTypes: ['number', 'formula']}));
    const factorsTypeSelector = container.querySelector('.ds-factors-type-selector');

    // ACT
    factorsTypeSelector && fireEvent.click(factorsTypeSelector);

    // ASSERT
    expect(queryByText('Text')).toBeTruthy();
    expect(queryByText('Parameter')).toBeTruthy();
    expect(queryByText('Number')).toBeFalsy();
    expect(queryByText('Context parameter')).toBeTruthy();
    expect(queryByText('Dynamic key')).toBeTruthy();
    expect(queryByText('Array')).toBeTruthy();
    expect(queryByText('Date')).toBeTruthy();
    expect(queryByText('Formula')).toBeFalsy();
  });

  test('Should change selected factor type', () => {
    // ARRANGE
    const selectFactorType = jest.fn();
    const {container, queryByText} = renderWithProvider(RENDER_FACTORS({ setSelectedFactorType: selectFactorType }));
    const factorsTypeSelector = container.querySelector('.ds-factors-type-selector');

    // ACT
    factorsTypeSelector && fireEvent.click(factorsTypeSelector);
    const numberFactroType = queryByText('Number');
    numberFactroType && fireEvent.click(numberFactroType);

    // ASSERT
    expect(selectFactorType).toBeCalledWith('number');
  });
});
