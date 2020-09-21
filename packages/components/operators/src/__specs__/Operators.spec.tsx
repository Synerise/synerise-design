import Operators from './../Operators';
import * as React from 'react';
import { OperatorsProps } from '../Operator.types';
import { OPERATORS_TEXTS, OPERATORS_ITEMS, OPERATORS_GROUPS } from './data/Operators.data';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import { VarTypeNumberM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';

const DEFAULT_PROPS: OperatorsProps = {
  texts: OPERATORS_TEXTS,
  onChange: () => {},
  value: undefined,
  items: OPERATORS_ITEMS,
  groups: OPERATORS_GROUPS,
};
const RENDER_OPERATORS = (props?: {}) => (
  <Operators
    {...DEFAULT_PROPS}
    {...props}
  />
);

describe('Operators component', () => {
  test('Should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(RENDER_OPERATORS());
    // ASSERT
    expect(getByText(OPERATORS_TEXTS.buttonLabel)).toBeTruthy();
  });

  test('Should show searchbar, tabs and list of operators', () => {
    // ARRANGE
    const { getByText, getByPlaceholderText, getByTestId } = renderWithProvider(RENDER_OPERATORS());

    // ACT
    const trigger = getByText(OPERATORS_TEXTS.buttonLabel);
    fireEvent.click(trigger);
    const search = getByPlaceholderText(OPERATORS_TEXTS.searchPlaceholder);
    const tabs = getByTestId('tabs-container');
    const dateOptions = getByText('Date');

    expect(search).toBeTruthy();
    expect(tabs).toBeTruthy();
    expect(dateOptions).toBeTruthy();
  });

  test('Should show selected value', () => {
    const { getByText } = renderWithProvider(RENDER_OPERATORS({
      value: {
        name: 'Equal',
        icon: <Icon component={<VarTypeNumberM />} />,
        groupId: 'NUMBER_ONE',
        id: '00001'
      }
    }));

    expect(getByText('Equal')).toBeTruthy();

  });
});
