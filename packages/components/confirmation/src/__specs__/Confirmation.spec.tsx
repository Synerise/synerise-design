import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Confirmation from '../Confirmation';
import {
  COLOR_TEST_CASES,
  DECISION_OPTIONS,
  ITEMS,
  ITEM_NAME,
  PROPS,
  RELATED_OBJECTS_LABEL,
} from './testData';

describe('Confirmation component', () => {
  it('Should render', async () => {
    renderWithProvider(<Confirmation {...PROPS} type="negative" open />);

    expect(await screen.findByText(PROPS.title)).toBeInTheDocument();
    expect(await screen.findByText(PROPS.description)).toBeInTheDocument();
  });

  it('Should render without main button', async () => {
    renderWithProvider(<Confirmation {...PROPS} onOk={undefined} type="negative" open />);
    
    expect(screen.queryByTestId(PROPS.mainButtonProps['data-testid'])).not.toBeInTheDocument();
  });
  
  it('Should render without secondary button', async () => {
    renderWithProvider(<Confirmation {...PROPS} onCancel={undefined} type="negative" open />);

    expect(screen.queryByTestId(PROPS.secondaryButtonProps['data-testid'])).not.toBeInTheDocument();
  });
  
  it.each(COLOR_TEST_CASES)(
    'Should render correct color',
    async ({ type, color }) => {
      renderWithProvider(<Confirmation {...PROPS} type={type} open />);

      expect(
        await screen.findByTestId(PROPS.mainButtonProps['data-testid']),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(PROPS.mainButtonProps['data-testid']),
      ).toHaveStyle({ backgroundColor: color });
    },
  );

  it('Should render batch list', async () => {
    renderWithProvider(
      <Confirmation {...PROPS} type="negative" open batchActionItems={ITEMS} />,
    );

    expect(await screen.findByText(ITEM_NAME)).toBeInTheDocument();
  });

  it('Should render decision radios', async () => {
    renderWithProvider(
      <Confirmation
        {...PROPS}
        type="negative"
        open
        decisionOptions={DECISION_OPTIONS}
      />,
    );

    expect(await screen.findAllByRole('radio')).toHaveLength(
      DECISION_OPTIONS.length,
    );
  });

  it('Should render related objects', async () => {
    const RELATED_OBJECTS = 'RELATED_OBJECTS';
    renderWithProvider(
      <Confirmation
        {...PROPS}
        type="negative"
        open
        relatedObjects={RELATED_OBJECTS}
      />,
    );

    expect(await screen.findByText(RELATED_OBJECTS_LABEL)).toBeInTheDocument();
    userEvent.click(screen.getByText(RELATED_OBJECTS_LABEL));

    expect(await screen.findByText(RELATED_OBJECTS)).toBeInTheDocument();
  });

  it('Should trigger onOk on main button click', async () => {
    const onOk = jest.fn();
    renderWithProvider(
      <Confirmation {...PROPS} type="negative" open onOk={onOk} />,
    );

    expect(
      await screen.findByTestId(PROPS.mainButtonProps['data-testid']),
    ).toBeInTheDocument();
    userEvent.click(screen.getByTestId(PROPS.mainButtonProps['data-testid']));
    expect(onOk).toHaveBeenCalled();
  });

  it('Should trigger onCancel on secondary button click', async () => {
    const onCancel = jest.fn();
    renderWithProvider(
      <Confirmation {...PROPS} type="negative" open onCancel={onCancel} />,
    );

    expect(
      await screen.findByTestId(PROPS.secondaryButtonProps['data-testid']),
    ).toBeInTheDocument();
    userEvent.click(
      screen.getByTestId(PROPS.secondaryButtonProps['data-testid']),
    );
    expect(onCancel).toHaveBeenCalled();
  });
});
