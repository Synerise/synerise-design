import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { FormattedDateTime, DataFormatNotationType } from '@synerise/ds-data-format';

const EU_NOTATION: DataFormatNotationType = 'EU';
const US_NOTATION: DataFormatNotationType = 'US';
const TZ_DATE_TO_FORMAT = new Date('2023-06-25T16:40:00Z');
const TIMEZONE_DATA = [
  {
    timeZone: 'Europe/Warsaw', // +02:00
    EUDate: '25.06.2023',
    EUTime: '18:40',
    USDate: '6/25/2023',
    USTime: '6:40 PM',
  },
  {
    timeZone: 'UTC', // +00:00
    EUDate: '25.06.2023',
    EUTime: '16:40',
    USDate: '6/25/2023',
    USTime: '4:40 PM',
  },
  {
    timeZone: 'America/New_York', // -04:00
    EUDate: '25.06.2023',
    EUTime: '12:40',
    USDate: '6/25/2023',
    USTime: '12:40 PM',
  },
  {
    timeZone: 'America/Nome', // -08:00
    EUDate: '25.06.2023',
    EUTime: '08:40',
    USDate: '6/25/2023',
    USTime: '8:40 AM',
  },
  {
    timeZone: 'Australia/Darwin', // +09:30
    EUDate: '26.06.2023',
    EUTime: '02:10',
    USDate: '6/26/2023',
    USTime: '2:10 AM',
  },
];

describe('FormattedDateTime TimezoneTesting', () => {
  it.each(TIMEZONE_DATA)(
    'should render properly datetime with default notation in TZ $timeZone',
    ({ timeZone, EUDate, EUTime }) => {
      renderWithProvider(<FormattedDateTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone });
      expect(screen.getByText(`${EUDate}, ${EUTime}`)).toBeTruthy();
    }
  );

  it.each(TIMEZONE_DATA)(
    'should render properly datetime with EU notation in TZ $timeZone',
    ({ timeZone, EUDate, EUTime }) => {
      renderWithProvider(<FormattedDateTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone, notation: EU_NOTATION });

      expect(screen.getByText(`${EUDate}, ${EUTime}`)).toBeTruthy();
    }
  );

  it.each(TIMEZONE_DATA)(
    'should render properly datetime with US notation in TZ $timeZone',
    ({ timeZone, USDate, USTime }) => {
      renderWithProvider(<FormattedDateTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone, notation: US_NOTATION });

      expect(screen.getByText(`${USDate}, ${USTime}`)).toBeTruthy();
    }
  );
});
