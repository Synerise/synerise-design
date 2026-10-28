import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import {
  act,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import Factors from '../Factors';
import type { FactorsProps } from '../Factors.types';
import {
  FACTORS_GROUPS,
  FACTORS_ITEMS,
  FACTORS_TEXTS,
} from './data/Factors.data';

const SELECTED_PARAMETER = {
  ...FACTORS_ITEMS[0],
  description: 'Selected parameter description',
};
const PAST_HOVER_OPEN_DELAY_MS = 300;

const PROPS: FactorsProps = {
  selectedFactorType: 'parameter',
  setSelectedFactorType: () => {},
  value: SELECTED_PARAMETER,
  onChangeValue: () => {},
  withoutTypeSelector: true,
  parameters: {
    buttonLabel: 'Parameter',
    groups: FACTORS_GROUPS,
    items: FACTORS_ITEMS,
  },
  texts: FACTORS_TEXTS,
};

describe('Parameter information card', () => {
  beforeEach(() => {
    Element.prototype.scrollTo = vi.fn();
  });

  it('keeps the card closed while the parameter dropdown is open, so Escape still closes it', async () => {
    renderWithProvider(<Factors {...PROPS} />);
    const cardTrigger = screen.getByTestId('popover-information-card-trigger');
    fireEvent.mouseEnter(cardTrigger);
    await screen.findByText(SELECTED_PARAMETER.description);

    fireEvent.click(within(cardTrigger).getByRole('button'));
    const dropdown = await screen.findByTestId(
      'popover-factors-parameters-content',
    );
    fireEvent.mouseLeave(cardTrigger);
    fireEvent.mouseEnter(cardTrigger);
    fireEvent.mouseMove(cardTrigger);
    await act(
      () =>
        new Promise((resolve) => setTimeout(resolve, PAST_HOVER_OPEN_DELAY_MS)),
    );
    expect(
      screen.queryByText(SELECTED_PARAMETER.description),
    ).not.toBeInTheDocument();

    fireEvent.keyDown(dropdown, { key: 'Escape' });

    await waitFor(() => {
      expect(
        screen.queryByTestId('popover-factors-parameters-content'),
      ).not.toBeInTheDocument();
    });
  });
});
