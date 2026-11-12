import React, { useState } from 'react';
import { renderWithProvider } from '@synerise/ds-core/testing';
import Monthly from './Monthly';
import { fireEvent, screen, within } from '@testing-library/react';
import { ERROR_MESSAGE, MONTHLY_SCHEDULE_TEST_DATA } from '../filters.spec.constants';
import { DAYS_OF_PERIOD_ENUM } from '../../../constants';
import { type MonthlySchedule, type MonthlyScheduleDayValue } from './Monthly.types';




afterEach(() => {
  vi.clearAllMocks();
});

describe('monthly scheduler', () => {
  const onChange = vi.fn();
  it.each(MONTHLY_SCHEDULE_TEST_DATA)('should display error messages when single day is selected $case', ({ value, errors, expectedTimepickerCount, expectedErrorCount, dayIndex }) => {
    renderWithProvider( <Monthly value={value} errorTexts={errors} onChange={onChange} />);

    const dayButtons = screen.getAllByRole('button');
    fireEvent.click(dayButtons[dayIndex]);

    const timepickers = screen.getAllByTestId('tp-container');
    expect(timepickers.length).toEqual(expectedTimepickerCount);
    const errorMessages = screen.getAllByText(ERROR_MESSAGE);
    expect(errorMessages.length).toEqual(expectedErrorCount);

  });

  describe('value handling', () => {
    const MORNING: MonthlyScheduleDayValue = {
      start: '06:00:00.000',
      stop: '11:59:59.999',
      restricted: true,
      display: false,
      inverted: false,
      mode: 'Range',
    };

    const deepFreeze = <T,>(value: T): T => {
      if (value && typeof value === 'object') {
        Object.values(value).forEach(deepFreeze);
        Object.freeze(value);
      }
      return value;
    };

    const dayButtons = () => screen.getAllByRole('button');
    const forms = () => screen.getAllByTestId('range-filter-form');
    const lastValue = (spy: ReturnType<typeof vi.fn>) =>
      spy.mock.calls[spy.mock.calls.length - 1][0] as MonthlySchedule;

    const CloningMonthly = ({ initial, onChange: onValueChange }: { initial: MonthlySchedule; onChange: (value: MonthlySchedule) => void }) => {
      const [value, setValue] = useState(initial);
      return (
        <Monthly
          value={value}
          onChange={(next) => {
            onValueChange(next);
            setValue(structuredClone(next));
          }}
        />
      );
    };

    it('does not emit on mount', () => {
      const spy = vi.fn();
      renderWithProvider(<Monthly value={{ a: { 0: MORNING }, b: {} }} onChange={spy} />);

      expect(spy).not.toHaveBeenCalled();
    });

    it('settles under a parent that clones the value', () => {
      const spy = vi.fn();
      renderWithProvider(<CloningMonthly initial={{ a: { 0: MORNING } }} onChange={spy} />);

      fireEvent.click(dayButtons()[1]);
      fireEvent.click(screen.getByText('Add time'));

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('emits new values without writing to the value it was given', async () => {
      const spy = vi.fn();
      const value = deepFreeze({ a: { 0: MORNING, 1: MORNING } });
      renderWithProvider(<Monthly value={value} onChange={spy} />);

      fireEvent.click(dayButtons()[0]);
      fireEvent.click(within(forms()[0]).getAllByTestId('tp-input')[0]);
      const hours = await screen.findAllByTestId('ds-time-picker-unit-hour');
      fireEvent.click(within(hours[hours.length - 1]).getByText('07'));
      const icons = forms()[0].querySelectorAll('.ds-icon');
      fireEvent.click(icons[icons.length - 1]);

      expect(spy.mock.calls.map(([next]) => next)).toEqual([
        { a: { 0: { ...MORNING, start: '07:00:00.000' }, 1: MORNING } },
        { a: { 1: MORNING } },
      ]);
      expect(value).toEqual({ a: { 0: MORNING, 1: MORNING } });
    });

    it('shift-selects the days displayed between two days in a Sunday-first week', () => {
      const spy = vi.fn();
      renderWithProvider(
        <Monthly value={{}} onChange={spy} periodType={DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK} />,
        undefined,
        { notation: 'US' },
      );
      const [sunday, , tuesday] = dayButtons();

      fireEvent.click(sunday);
      fireEvent.keyDown(tuesday, { key: 'Shift' });
      fireEvent.click(tuesday);
      fireEvent.keyUp(tuesday, { key: 'Shift' });
      fireEvent.click(screen.getByText('Add time'));

      const [range] = Object.values(lastValue(spy));
      expect(Object.keys(range)).toEqual(['0', '1', '6']);
    });
  });
});
