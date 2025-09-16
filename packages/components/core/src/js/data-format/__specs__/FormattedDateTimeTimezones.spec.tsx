import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '../../testing';
import { FormattedDateTime, type DataFormatNotationType } from '../index';

import {TIMEZONE_DATA, TZ_DATE_TO_FORMAT } from './Timezones.data'

const EU_NOTATION: DataFormatNotationType = 'EU';
const US_NOTATION: DataFormatNotationType = 'US';


describe('FormattedDateTime TimezoneTesting', () => {
  it.each(TIMEZONE_DATA)(
    'should render properly datetime with default notation in TZ $timeZone',
    ({ timeZone, EUDate, EUTime }) => {
      renderWithProvider(<FormattedDateTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone, applyTimeZoneOffset: true });
      expect(screen.getByText(`${EUDate}, ${EUTime}`)).toBeTruthy();
    }
  );

  it.each(TIMEZONE_DATA)(
    'should render properly datetime with EU notation in TZ $timeZone',
    ({ timeZone, EUDate, EUTime }) => {
      renderWithProvider(<FormattedDateTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone, applyTimeZoneOffset: true, notation: EU_NOTATION });
      expect(screen.getByText(`${EUDate}, ${EUTime}`)).toBeTruthy();
    }
  );

  it.each(TIMEZONE_DATA)(
    'should render properly datetime with US notation in TZ $timeZone',
    ({ timeZone, USDate, USTime }) => {
      renderWithProvider(<FormattedDateTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone, applyTimeZoneOffset: true, notation: US_NOTATION });
      expect(screen.getByText(`${USDate}, ${USTime}`)).toBeTruthy();
    }
  );
});
