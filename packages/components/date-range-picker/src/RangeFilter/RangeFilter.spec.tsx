import React from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { RangeFilterType } from './constants';
import RangeFilter from './RangeFilter';
import type {
  RangeFilterDaily,
  RangeFilterWeekly,
} from './RangeFilter.types';
import type { SavedFilter } from './Shared/FilterDropdown/FilterDropdown.types';

const TEXTS = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  saveFilter: 'Save filter',
  filterName: 'Filter name',
  savedFiltersTrigger: 'Saved filters',
};

const DAILY: RangeFilterDaily = {
  type: 'DAILY',
  nestingType: 'IN_PLACE',
  from: '08:00:00.000',
  to: '16:00:00.000',
  inverted: false,
};

const WEEKLY: RangeFilterWeekly = {
  type: 'WEEKLY',
  nestingType: 'IN_PLACE',
  days: [{ from: '09:15:00.000', to: '23:59:59.999', day: 1, inverted: false }],
};

const renderFilter = (
  props: Partial<React.ComponentProps<typeof RangeFilter>> = {},
) => {
  const onApply = vi.fn();
  renderWithProvider(
    <RangeFilter
      value={DAILY}
      texts={TEXTS}
      onApply={onApply}
      onCancel={vi.fn()}
      {...props}
    />,
  );
  return onApply;
};

describe('RangeFilter', () => {
  it('does not reorder the allowedFilterTypes it is given', () => {
    const allowedFilterTypes = Object.freeze([
      'MONTHLY',
      'DAILY',
    ]) as unknown as RangeFilterType[];
    renderFilter({ allowedFilterTypes });

    const labels = screen
      .getAllByRole('button')
      .map((button) => button.textContent)
      .filter((label) => label === TEXTS.daily || label === TEXTS.monthly);

    expect(labels).toEqual([TEXTS.daily, TEXTS.monthly]);
    expect(allowedFilterTypes).toEqual(['MONTHLY', 'DAILY']);
  });

  it('saves the payload it applies, with a name and an id', async () => {
    const onFilterSave = vi.fn();
    renderFilter({ savedFilters: [], onFilterSave });

    await userEvent.click(screen.getByText(TEXTS.saveFilter));
    await userEvent.type(screen.getByPlaceholderText(TEXTS.filterName), 'Work');
    const formButtons = within(
      screen.getByTestId('drp-save-filter-form'),
    ).getAllByRole('button');
    await userEvent.click(formButtons[formButtons.length - 1]);

    expect(onFilterSave).toHaveBeenCalledTimes(1);
    const [[[saved]]] = onFilterSave.mock.calls;
    expect(saved).toMatchObject({ ...DAILY, name: 'Work' });
    expect(saved.id).toEqual(expect.any(String));
    expect(saved).not.toHaveProperty('definition');
  });

  it('applies a loaded saved filter as it was stored', async () => {
    const savedFilters: SavedFilter[] = [
      { ...WEEKLY, id: 'saved-1', name: 'Mornings' },
    ];
    const onApply = renderFilter({ savedFilters, onFilterSave: vi.fn() });

    await userEvent.click(screen.getByText(TEXTS.savedFiltersTrigger));
    await userEvent.click(await screen.findByText('Mornings'));
    await userEvent.click(screen.getByTestId('range-filter-apply-button'));

    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply.mock.calls[0][0]).toStrictEqual(WEEKLY);
  });
});
