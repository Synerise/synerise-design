import React, { useState } from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Daily from './Daily';
import { type DailySchedule } from './Daily.types';
import {  DAILY_SCHEDULE_TEST_DATA, ERROR_MESSAGE } from '../filters.spec.constants';


afterEach(() => {
  vi.clearAllMocks();
});

const MORNING: DailySchedule = {
  start: '06:00:00.000',
  stop: '11:59:59.999',
  restricted: true,
  display: false,
  inverted: false,
  mode: 'Range',
};
const EVENING: DailySchedule = { ...MORNING, start: '18:00:00.000', stop: '23:59:59.999' };

const deepFreeze = <T,>(value: T): T => {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
};

const forms = () => screen.getAllByTestId('range-filter-form');

const setStartHour = async (formIndex: number, hour: string) => {
  fireEvent.click(within(forms()[formIndex]).getAllByTestId('tp-input')[0]);
  const hours = await screen.findAllByTestId('ds-time-picker-unit-hour');
  fireEvent.click(within(hours[hours.length - 1]).getByText(hour));
};

const switchMode = async (formIndex: number, from: string, to: string) => {
  await userEvent.click(within(forms()[formIndex]).getByText(from));
  await userEvent.click(await screen.findByText(to));
};

const deleteRange = (formIndex: number) => {
  const icons = forms()[formIndex].querySelectorAll('.ds-icon');
  fireEvent.click(icons[icons.length - 1]);
};

const StatefulDaily = ({ initial, onChange }: { initial: DailySchedule[]; onChange: (value: DailySchedule[]) => void }) => {
  const [value, setValue] = useState(initial);
  return (
    <Daily
      value={value}
      onChange={(next) => {
        onChange(next);
        setValue(next);
      }}
    />
  );
};

describe('daily scheduler', () => {

  it.each(DAILY_SCHEDULE_TEST_DATA)('should render error messages $case', ({ value, errors, expectedTimepickerCount, expectedErrorCount }) => {

    renderWithProvider( <Daily errorTexts={errors} onChange={vi.fn()} value={value} />);

    const timepickers = screen.getAllByTestId('tp-input');
    expect(timepickers.length).toBe(expectedTimepickerCount);
    const errorMessages = screen.getAllByText(ERROR_MESSAGE);
    expect(errorMessages.length).toBe(expectedErrorCount);

  })

  it('emits a mode change and resets the times for the new mode', async () => {
    const onChange = vi.fn();
    renderWithProvider(<Daily value={deepFreeze([MORNING, EVENING])} onChange={onChange} />);

    await switchMode(1, 'Range', 'Hour');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith([
      MORNING,
      { ...EVENING, start: '00:00:00.000', stop: '00:00:00.000', mode: 'Hour' },
    ]);
  });

  it('emits new values without writing to the value it was given', async () => {
    const onChange = vi.fn();
    const value = deepFreeze([MORNING, EVENING]);
    renderWithProvider(<Daily value={value} onChange={onChange} />);

    await setStartHour(0, '07');
    deleteRange(1);

    expect(onChange).toHaveBeenCalledTimes(2);
    const [[afterTimeChange], [afterDelete]] = onChange.mock.calls;
    expect(afterTimeChange).not.toBe(value);
    expect(afterTimeChange[0]).toEqual({ ...MORNING, start: '07:00:00.000' });
    expect(afterDelete).toEqual([MORNING]);
    expect(value).toEqual([MORNING, EVENING]);
  });

  it('keeps a range row mounted when its start time changes', async () => {
    renderWithProvider(<StatefulDaily initial={[MORNING, EVENING]} onChange={vi.fn()} />);
    const [firstRow] = forms();

    await setStartHour(0, '07');

    expect(forms()[0]).toBe(firstRow);
  });

  it.each([
    { case: 'null', value: null },
    { case: 'an empty string', value: '' },
  ])('treats $case as no ranges', async ({ value }) => {
    const onChange = vi.fn();
    renderWithProvider(<Daily value={value as unknown as DailySchedule[]} onChange={onChange} />);

    expect(screen.queryAllByTestId('range-filter-form')).toHaveLength(0);
    await userEvent.click(screen.getByRole('button'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toHaveLength(1);
  });
});
