import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, prettyDOM, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Daily from './Daily';
import { DAILY_FILTER_VALUE, DAILY_SCHEDULE_TEST_DATA, ERROR_MESSAGE } from '../filters.spec.constants';
import { DEFAULT_RANGE_END, DEFAULT_RANGE_START } from '../constants';


afterEach(() => {
  vi.clearAllMocks();
});

describe('daily scheduler', () => {
  
  it.each(DAILY_SCHEDULE_TEST_DATA)('should render error messages $case', ({ value, errors, expectedTimepickerCount, expectedErrorCount }) => {
      
    renderWithProvider( <Daily errorTexts={errors} onChange={vi.fn()} value={value} />);
    
    const timepickers = screen.getAllByTestId('tp-input');
    expect(timepickers.length).toBe(expectedTimepickerCount);
    const errorMessages = screen.getAllByText(ERROR_MESSAGE);
    expect(errorMessages.length).toBe(expectedErrorCount);

  })
});
