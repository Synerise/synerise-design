import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Weekly from './Weekly';
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
});
