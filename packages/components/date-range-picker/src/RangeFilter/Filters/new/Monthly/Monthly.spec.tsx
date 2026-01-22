import React from 'react';
import { renderWithProvider } from '@synerise/ds-core';
import Monthly from './Monthly';
import { fireEvent, screen } from '@testing-library/react';
import { ERROR_MESSAGE, MONTHLY_SCHEDULE_TEST_DATA } from '../filters.spec.constants';




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
});
