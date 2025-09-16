import React from 'react';
import { renderWithProvider } from '@synerise/ds-core';
import Weekly from './Weekly';
import { fireEvent, screen } from '@testing-library/react';
import { WEEKLY_SCHEDULE_TEST_DATA, ERROR_MESSAGE } from '../filters.spec.constants';

afterEach(() => {
  jest.clearAllMocks();
});

describe('weekly scheduler', () => {
  const onChange = jest.fn();
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
});
