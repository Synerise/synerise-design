import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, queryByTestId } from '@testing-library/react';

import { VarTypeNumberM } from '@synerise/ds-icon';
import Icon from '@synerise/ds-icon';

import Operators from './../Operators';

import { OperatorsProps } from '../Operator.types';
import { OPERATORS_TEXTS, OPERATORS_ITEMS, OPERATORS_GROUPS } from './data/Operators.data';
import userEvent from '@testing-library/user-event';

const DEFAULT_PROPS: OperatorsProps = {
  texts: OPERATORS_TEXTS,
  onChange: () => {},
  value: undefined,
  items: OPERATORS_ITEMS,
  groups: OPERATORS_GROUPS,
};
const RENDER_OPERATORS = (props?: {}) => <Operators {...DEFAULT_PROPS} {...props} />;

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

  test('Should show no tabs if single group', () => {
    // ARRANGE
    const groups = OPERATORS_GROUPS.slice(0,1);
    const { getByText, queryByTestId } = renderWithProvider(RENDER_OPERATORS({groups: groups}));

    // ACT
    const trigger = getByText(OPERATORS_TEXTS.buttonLabel);
    fireEvent.click(trigger);
    const tabs = queryByTestId('tabs-container');

    // ASSERT
    expect(tabs).not.toBeInTheDocument()
    
  });

  test('Should show selected value', () => {
    const { getByText } = renderWithProvider(
      RENDER_OPERATORS({
        value: {
          name: 'Equal',
          icon: <Icon component={<VarTypeNumberM />} />,
          groupId: 'NUMBER_ONE',
          id: '00001',
        },
      })
    );

    expect(getByText('Equal')).toBeTruthy();
  });

  test('should call onActivate', () => {
    // ARRANGE
    const handleActivate = jest.fn();
    const { getByText } = renderWithProvider(RENDER_OPERATORS({ onActivate: handleActivate }));

    // ACT
    userEvent.click(getByText(OPERATORS_TEXTS.buttonLabel));

    // ASSERT
    expect(handleActivate).toBeCalled();
  });
  test('should call onDeactivate', () => {
    // ARRANGE
    const handleDeactivate = jest.fn();
    const { getByText } = renderWithProvider(RENDER_OPERATORS({ onDeactivate: handleDeactivate }));

    // ACT
    userEvent.click(getByText(OPERATORS_TEXTS.buttonLabel));
    userEvent.click(document.body);

    expect(handleDeactivate).toBeCalled();
  });
});
