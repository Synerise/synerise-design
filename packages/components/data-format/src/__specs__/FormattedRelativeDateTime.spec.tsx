import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import {
  FormattedRelativeDateTimeFrom,
  FormattedRelativeDateTimeTo,
} from '@synerise/ds-data-format';

const TEST_CASES = [
  // TODO - add cases for seconds and minutes when upgraded to jest 27 (useFakeTimers)
  {
    dateString: '2025-01-24T09:05:00.000', // 55 mins
    resultTo: 'an hour ago',
    resultFrom: 'in an hour',
    resultToWithoutSuffix: 'an hour',
    resultFromWithoutSuffix: 'an hour',
  },
  {
    dateString: '2025-01-24T08:15:00.000', // 1h 45min
    resultTo: '2 hours ago',
    resultFrom: 'in 2 hours',
    resultToWithoutSuffix: '2 hours',
    resultFromWithoutSuffix: '2 hours',
  },
  {
    dateString: '2025-01-23T08:00:00.000', // 26hrs
    resultTo: 'a day ago',
    resultFrom: 'in a day',
    resultToWithoutSuffix: 'a day',
    resultFromWithoutSuffix: 'a day',
  },
  {
    dateString: '2025-01-22T10:00:00.000', // 48hrs
    resultTo: '2 days ago',
    resultFrom: 'in 2 days',
    resultToWithoutSuffix: '2 days',
    resultFromWithoutSuffix: '2 days',
  },
  {
    dateString: '2024-12-25T10:00:00.000', // 30 days
    resultTo: 'a month ago',
    resultFrom: 'in a month',
    resultToWithoutSuffix: 'a month',
    resultFromWithoutSuffix: 'a month',
  },
  {
    dateString: '2024-11-25T10:00:00.000', // 60 days
    resultTo: '2 months ago',
    resultFrom: 'in 2 months',
    resultToWithoutSuffix: '2 months',
    resultFromWithoutSuffix: '2 months',
  },
  {
    dateString: '2024-01-24T10:00:00.000', // 12 months
    resultTo: 'a year ago',
    resultFrom: 'in a year',
    resultToWithoutSuffix: 'a year',
    resultFromWithoutSuffix: 'a year',
  },
  {
    dateString: '2023-01-24T10:00:00.000', // 24 months
    resultTo: '2 years ago',
    resultFrom: 'in 2 years',
    resultToWithoutSuffix: '2 years',
    resultFromWithoutSuffix: '2 years',
  },
];

// TODO - switch to useFakeTimers when upgraded to jest 27

describe.skip('FormattedRelativeDateTimeFrom', () => {
  

  it.each(TEST_CASES)('should render relative time from X', ({ dateString, resultFrom }) => {
    const date = new Date(dateString);
    renderWithProvider(<FormattedRelativeDateTimeFrom value={date} />);
    expect(screen.getByText(resultFrom)).toBeInTheDocument();
  });

  it.each(TEST_CASES)('should render relative time to X', ({ dateString, resultTo }) => {
    const date = new Date(dateString);
    renderWithProvider(<FormattedRelativeDateTimeTo value={date} />);
    expect(screen.getByText(resultTo)).toBeInTheDocument();
  });
  it.each(TEST_CASES)('should render relative time from X without suffix', ({ dateString, resultFromWithoutSuffix }) => {
    const date = new Date(dateString);
    renderWithProvider(<FormattedRelativeDateTimeFrom withoutSuffix value={date} />);
    expect(screen.getByText(resultFromWithoutSuffix)).toBeInTheDocument();
  });

  it.each(TEST_CASES)('should render relative time to X without suffix', ({ dateString, resultToWithoutSuffix }) => {
    const date = new Date(dateString);
    renderWithProvider(<FormattedRelativeDateTimeTo withoutSuffix value={date} />);
    expect(screen.getByText(resultToWithoutSuffix)).toBeInTheDocument();
  });
});
