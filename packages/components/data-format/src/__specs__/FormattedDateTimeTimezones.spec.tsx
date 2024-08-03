import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { FormattedDateTime, DataFormatNotationType } from '@synerise/ds-data-format';

import {TIMEZONE_DATA, TZ_DATE_TO_FORMAT } from './Timezones.data'

const EU_NOTATION: DataFormatNotationType = 'EU';
const US_NOTATION: DataFormatNotationType = 'US';


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
