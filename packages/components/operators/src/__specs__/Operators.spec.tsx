import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, waitFor, screen } from '@testing-library/react';

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
    renderWithProvider(RENDER_OPERATORS());
    expect(screen.getByText(OPERATORS_TEXTS.buttonLabel)).toBeInTheDocument();
  });

  test('Should show searchbar, tabs and list of operators', async () => {
    renderWithProvider(RENDER_OPERATORS());

    const trigger = screen.getByText(OPERATORS_TEXTS.buttonLabel);
    userEvent.click(trigger);

    const search = await screen.findByPlaceholderText(OPERATORS_TEXTS.searchPlaceholder);
    const tabs = await screen.findByTestId('tabs-container');
    const dateOptions = await screen.findByText('Date');

    expect(search).toBeInTheDocument();
    expect(tabs).toBeInTheDocument();
    expect(dateOptions).toBeInTheDocument();
  });

  test('Should show no tabs if single group', async () => {
    const groups = OPERATORS_GROUPS.slice(0, 1);
    renderWithProvider(RENDER_OPERATORS({ groups: groups }));

    const trigger = screen.getByText(OPERATORS_TEXTS.buttonLabel);
    userEvent.click(trigger);

    await screen.findByPlaceholderText(OPERATORS_TEXTS.searchPlaceholder);

    expect(screen.queryByTestId('tabs-container')).not.toBeInTheDocument();
  });

  test('Should show selected value', () => {
    renderWithProvider(
      RENDER_OPERATORS({
        value: {
          name: 'Equal',
          icon: <Icon component={<VarTypeNumberM />} />,
          groupId: 'NUMBER_ONE',
          id: '00001',
        },
      })
    );

    expect(screen.getByText('Equal')).toBeInTheDocument();
  });

  test('should call onActivate', async () => {
    const handleActivate = jest.fn();
    renderWithProvider(RENDER_OPERATORS({ onActivate: handleActivate }));

    userEvent.click(screen.getByText(OPERATORS_TEXTS.buttonLabel));

    await waitFor(() => expect(handleActivate).toBeCalled());
  });

  test('should call onDeactivate', async () => {
    const handleDeactivate = jest.fn();
    const handleActivate = jest.fn();
    const OTHER_ELEMENT = 'OTHER_ELEMENT';
    renderWithProvider(
      <>
        <div>{OTHER_ELEMENT}</div>
        {RENDER_OPERATORS({ onDeactivate: handleDeactivate, onActivate: handleActivate })}
      </>
    );

    userEvent.click(screen.getByText(OPERATORS_TEXTS.buttonLabel));
    await waitFor(() => expect(handleActivate).toHaveBeenCalled());

    userEvent.click(screen.getByText(OTHER_ELEMENT));

    await waitFor(() => expect(handleDeactivate).toHaveBeenCalled());
  });
});
