import React from 'react';

import { VarTypeStringM } from '@synerise/ds-icon';
import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { type FactorsProps } from '../Factors.types';
import Factors from './../Factors';
import {
  FACTORS_GROUPS,
  FACTORS_ITEMS,
  FACTORS_TEXTS,
} from './data/Factors.data';

const DEFAULT_PROPS: FactorsProps = {
  selectedFactorType: '',
  setSelectedFactorType: () => {},
  value: '',
  onChangeValue: () => {},
  textType: 'default',
  defaultFactorType: 'text',
  autocompleteText: {
    options: ['First name', 'Last name', 'City'],
  },
  unavailableFactorTypes: [],
  parameters: {
    buttonLabel: 'Parameter',
    buttonIcon: <VarTypeStringM />,
    groups: FACTORS_GROUPS,
    items: FACTORS_ITEMS,
  },
  withoutTypeSelector: false,
  formulaEditor: <div>Formula editor</div>,
  texts: FACTORS_TEXTS,
};

const RENDER_FACTORS = (props = {}) => (
  <Factors {...DEFAULT_PROPS} {...props} />
);

describe('Factors component', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = jest.fn();
  });

  test('Should render', () => {
    const { container } = renderWithProvider(RENDER_FACTORS());

    expect(container.querySelector('.ds-factors')).toBeInTheDocument();
    expect(
      container.querySelector('.ds-factors-type-selector'),
    ).toBeInTheDocument();
  });

  test('Should render with default type and placeholder', () => {
    const { container } = renderWithProvider(RENDER_FACTORS());

    expect(
      container.querySelector(`.ds-factors-${DEFAULT_PROPS.defaultFactorType}`),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(FACTORS_TEXTS.valuePlaceholder),
    ).toBeInTheDocument();
  });

  test('Should render with value', () => {
    const VALUE = 'DISPLAY_VALUE';
    renderWithProvider(RENDER_FACTORS({ value: VALUE }));

    expect(screen.getByDisplayValue(VALUE)).toBeInTheDocument();
  });

  test('Should render without change factor type button', () => {
    const { container } = renderWithProvider(
      RENDER_FACTORS({ withoutTypeSelector: true }),
    );

    expect(
      container.querySelector('.ds-factors-type-selector'),
    ).not.toBeInTheDocument();
  });

  test('Should display list of available factor types', () => {
    const { container } = renderWithProvider(RENDER_FACTORS());
    const factorsTypeSelector = container.querySelector(
      '.ds-factors-type-selector',
    );

    factorsTypeSelector && fireEvent.click(factorsTypeSelector);

    expect(screen.queryByText('Text')).toBeInTheDocument();
    expect(screen.queryByText('Parameter')).toBeInTheDocument();
    expect(screen.queryByText('Number')).toBeInTheDocument();
    expect(screen.queryByText('Context parameter')).toBeInTheDocument();
    expect(screen.queryByText('Dynamic key')).toBeInTheDocument();
    expect(screen.queryByText('Array')).toBeInTheDocument();
    expect(screen.queryByText('Date')).toBeInTheDocument();
    expect(screen.queryByText('Relative date')).toBeInTheDocument();
    expect(screen.queryByText('Formula')).toBeInTheDocument();
  });

  test('Should display list of factor types, without excluded ones', () => {
    const { container } = renderWithProvider(
      RENDER_FACTORS({ unavailableFactorTypes: ['number', 'formula'] }),
    );
    const factorsTypeSelector = container.querySelector(
      '.ds-factors-type-selector',
    );

    factorsTypeSelector && fireEvent.click(factorsTypeSelector);

    expect(screen.queryByText('Text')).toBeInTheDocument();
    expect(screen.queryByText('Parameter')).toBeInTheDocument();
    expect(screen.queryByText('Number')).not.toBeInTheDocument();
    expect(screen.queryByText('Context parameter')).toBeInTheDocument();
    expect(screen.queryByText('Dynamic key')).toBeInTheDocument();
    expect(screen.queryByText('Array')).toBeInTheDocument();
    expect(screen.queryByText('Date')).toBeInTheDocument();
    expect(screen.queryByText('Relative date')).toBeInTheDocument();
    expect(screen.queryByText('Formula')).not.toBeInTheDocument();
  });

  test('Should change selected factor type', () => {
    const selectFactorType = jest.fn();
    const { container } = renderWithProvider(
      RENDER_FACTORS({ setSelectedFactorType: selectFactorType }),
    );
    const factorsTypeSelector = container.querySelector(
      '.ds-factors-type-selector',
    );

    factorsTypeSelector && fireEvent.click(factorsTypeSelector);
    const numberFactroType = screen.queryByText('Number');
    numberFactroType && fireEvent.click(numberFactroType);

    expect(selectFactorType).toBeCalledWith('number');
  });

  // moved to chromatic test
  test.skip('should call onActivate / onDeactivate Parameter factor', async () => {
    const handleDeactivate = jest.fn();
    const handleActivate = jest.fn();
    renderWithProvider(
      RENDER_FACTORS({
        selectedFactorType: 'parameter',
        onActivate: handleActivate,
        onDeactivate: handleDeactivate,
      }),
    );

    userEvent.click(screen.getByText('Parameter'));

    await waitFor(() => expect(handleActivate).toBeCalled());
    userEvent.click(document.body);

    await waitFor(() => expect(handleDeactivate).toBeCalled());
  });

  // moved to chromatic test
  test.skip('should call onActivate / onDeactivate Relative date factor', async () => {
    const handleActivate = jest.fn();
    const handleDeactivate = jest.fn();
    renderWithProvider(
      RENDER_FACTORS({
        selectedFactorType: 'relativeDate',
        onActivate: handleActivate,
        onDeactivate: handleDeactivate,
      }),
    );

    userEvent.click(
      screen.getByPlaceholderText(
        FACTORS_TEXTS.relativeDate.triggerPlaceholder,
      ),
    );

    await waitFor(() => expect(handleActivate).toBeCalled());
    userEvent.click(document.body);

    await waitFor(() => expect(handleDeactivate).toBeCalled());
  });

  // moved to chromatic test
  test.skip('should call onActivate / onDeactivate Text factor', async () => {
    const handleActivate = jest.fn();
    const handleDeactivate = jest.fn();
    renderWithProvider(
      RENDER_FACTORS({
        selectedFactorType: 'text',
        onActivate: handleActivate,
        onDeactivate: handleDeactivate,
      }),
    );

    userEvent.click(screen.getByPlaceholderText('Value'));
    await waitFor(() => expect(handleActivate).toBeCalled());

    userEvent.click(document.body);

    await waitFor(() => expect(handleDeactivate).toBeCalled());
  });
  test('should render dateRange factor with date filter with slider UI', async () => {
    renderWithProvider(RENDER_FACTORS({ selectedFactorType: 'dateRange' }));

    userEvent.click(await screen.findByText('Start date'));
    userEvent.click(await screen.findByText('Today'));
    await waitFor(async () =>
      expect(
        screen.getByText('Select date filter').closest('button'),
      ).not.toBeDisabled(),
    );

    userEvent.click(screen.getByText('Select date filter'));

    const rangeForm = await screen.findByTestId('range-filter-form');
    const slider = await within(rangeForm).findAllByRole('slider');
    expect(slider.length).toBe(2);
  });
  test.todo('should show tooltip on mousehover on selected parameter');
  test.todo('the type of autocomplete should allow autosizing');
});
