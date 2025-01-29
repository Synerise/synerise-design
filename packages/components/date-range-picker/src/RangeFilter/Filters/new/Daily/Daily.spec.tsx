import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Daily from './Daily';
import { screen } from '@testing-library/react';
import { DAILY_SCHEDULE_TEST_DATA, ERROR_MESSAGE } from '../filters.spec.constants';


afterEach(() => {
  jest.clearAllMocks();
});

describe('daily scheduler', () => {
  
  it.each(DAILY_SCHEDULE_TEST_DATA)('should render error messages $case', ({ value, errors, expectedTimepickerCount, expectedErrorCount }) => {
      
    renderWithProvider( <Daily errorTexts={errors} onChange={jest.fn()} value={value} />);
    
    const timepickers = screen.getAllByTestId('tp-input');
    expect(timepickers.length).toBe(expectedTimepickerCount);
    const errorMessages = screen.getAllByText(ERROR_MESSAGE);
    expect(errorMessages.length).toBe(expectedErrorCount);

  })
});