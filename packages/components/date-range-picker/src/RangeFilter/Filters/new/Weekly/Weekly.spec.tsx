import React, { useState } from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Weekly from './Weekly';
import { type WeeklySchedule, type WeeklyScheduleDayValue } from './Weekly.types';
import { WEEKLY_SCHEDULE_TEST_DATA, ERROR_MESSAGE } from '../filters.spec.constants';

afterEach(() => {
  vi.clearAllMocks();
});

describe('weekly scheduler', () => {
  const onChange = vi.fn();
  it.each(WEEKLY_SCHEDULE_TEST_DATA)('should display error messages when single day is selected $case', ({ value, errors, expectedTimepickerCount, expectedErrorCount, dayIndex }) => {
    renderWithProvider( <Weekly value={value} errorTexts={errors} onChange={onChange} />);
    
    const dayButtons = screen.getAllByRole('button');
    expect(dayButtons.length).toEqual(7);
    fireEvent.click(dayButtons[dayIndex]);

    const timepickers = screen.getAllByTestId('tp-container');
    expect(timepickers.length).toEqual(expectedTimepickerCount);
    const errorMessages = screen.getAllByText(ERROR_MESSAGE);
    expect(errorMessages.length).toEqual(expectedErrorCount);

  })

  it('weekly filter with range - selecting range end time should NOT reset start time', async () => {
    const onChange = vi.fn();
    const getLastCallParams = () => onChange.mock.calls[onChange.mock.calls.length - 1][0];

    const dayValue = {
      "start": "06:00:00.000",
      "stop": "20:59:59.999",
      "restricted": true,
      "display": false,
      "inverted": false,
      "mode": "Range"
    };
    const value = {
      "6235e246-fa7e-4882-9223c-44d72aaa1e8e": {
        0: dayValue
      },
    };
    const expectedDayValue = { "0": { ...dayValue, stop: "07:59:59.999" } };

    renderWithProvider(<Weekly value={value} onChange={onChange} />);

    const dayButtons = screen.getAllByRole('button');
    expect(dayButtons.length).toEqual(7);
    fireEvent.click(dayButtons[0]);

    const inputs = await screen.findAllByTestId('tp-input');
    expect(inputs.length).toBe(2);
    fireEvent.click(inputs[1])

    const hoursWrapper = await screen.findByTestId('ds-time-picker-unit-hour');
    expect(hoursWrapper).toBeInTheDocument();

    const hours = within(hoursWrapper).getByText('07');
    expect(hours).toBeInTheDocument();
    fireEvent.click(hours);

    expect(onChange).toHaveBeenCalled();

    const changedValue = Object.values(getLastCallParams())[0];
    expect(changedValue).toEqual(expectedDayValue);

  }, 8000);

  describe('value handling', () => {
    const MORNING: WeeklyScheduleDayValue = {
      start: '06:00:00.000',
      stop: '11:59:59.999',
      restricted: true,
      display: false,
      inverted: false,
      mode: 'Range',
    };
    const EVENING = { ...MORNING, start: '18:00:00.000', stop: '23:59:59.999' };

    const deepFreeze = <T,>(value: T): T => {
      if (value && typeof value === 'object') {
        Object.values(value).forEach(deepFreeze);
        Object.freeze(value);
      }
      return value;
    };

    const dayButtons = () => screen.getAllByRole('button').slice(0, 7);
    const forms = () => screen.getAllByTestId('range-filter-form');
    const lastValue = (onChange: ReturnType<typeof vi.fn>) =>
      onChange.mock.calls[onChange.mock.calls.length - 1][0] as WeeklySchedule;

    const setStartHour = async (hour: string) => {
      fireEvent.click(within(forms()[0]).getAllByTestId('tp-input')[0]);
      const hours = await screen.findAllByTestId('ds-time-picker-unit-hour');
      fireEvent.click(within(hours[hours.length - 1]).getByText(hour));
    };

    const deleteRange = (formIndex: number) => {
      const icons = forms()[formIndex].querySelectorAll('.ds-icon');
      fireEvent.click(icons[icons.length - 1]);
    };

    const CloningWeekly = ({ initial, onChange }: { initial: WeeklySchedule; onChange: (value: WeeklySchedule) => void }) => {
      const [value, setValue] = useState(initial);
      return (
        <Weekly
          value={value}
          onChange={(next) => {
            onChange(next);
            setValue(structuredClone(next));
          }}
        />
      );
    };

    it('emits new values without writing to the value it was given', async () => {
      const onChange = vi.fn();
      const value = deepFreeze({ a: { 0: MORNING, 1: MORNING } });
      renderWithProvider(<Weekly value={value} onChange={onChange} />);

      fireEvent.click(dayButtons()[0]);
      await setStartHour('07');
      await userEvent.click(within(forms()[0]).getByText('Range'));
      await userEvent.click(await screen.findByText('Hour'));
      deleteRange(0);

      // The time picker emits the picked hour more than once; only the order of changes matters here.
      const emitted = onChange.mock.calls.map(([next]) => next);
      expect(emitted[0]).toEqual({ a: { 0: { ...MORNING, start: '07:00:00.000' }, 1: MORNING } });
      expect(emitted.slice(-2)).toEqual([
        { a: { 0: { ...MORNING, start: '00:00:00.000', stop: '00:00:00.000', mode: 'Hour' }, 1: MORNING } },
        { a: { 1: MORNING } },
      ]);
      expect(value).toEqual({ a: { 0: MORNING, 1: MORNING } });
    });

    it('drops a range once its last day is deleted', () => {
      const onChange = vi.fn();
      renderWithProvider(
        <Weekly value={deepFreeze({ a: { 0: MORNING }, b: { 0: EVENING, 1: EVENING } })} onChange={onChange} />,
      );

      fireEvent.click(dayButtons()[0]);
      deleteRange(0);

      expect(lastValue(onChange)).toEqual({ b: { 0: EVENING, 1: EVENING } });
    });

    it('does not emit on mount and settles under a parent that clones the value', () => {
      const onChange = vi.fn();
      renderWithProvider(<CloningWeekly initial={{ a: { 0: MORNING }, b: {} }} onChange={onChange} />);

      expect(onChange).not.toHaveBeenCalled();

      fireEvent.click(dayButtons()[1]);
      fireEvent.click(screen.getByTestId('drp-filter-add-range'));

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('shift-selects the days displayed between two days in a Sunday-first week', () => {
      const onChange = vi.fn();
      renderWithProvider(<Weekly value={{}} onChange={onChange} />, undefined, { notation: 'US' });
      const [sunday, , tuesday] = dayButtons();

      fireEvent.click(sunday);
      fireEvent.keyDown(tuesday, { key: 'Shift' });
      fireEvent.click(tuesday);
      fireEvent.keyUp(tuesday, { key: 'Shift' });
      fireEvent.click(screen.getByTestId('drp-filter-add-range'));

      const [range] = Object.values(lastValue(onChange));
      expect(Object.keys(range)).toEqual(['0', '1', '6']);
    });
  });
});
