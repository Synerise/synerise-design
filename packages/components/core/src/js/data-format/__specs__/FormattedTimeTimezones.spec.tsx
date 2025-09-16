import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithProvider } from '../../testing';
import { FormattedTime, type DataFormatNotationType } from '../index';

const EU_NOTATION: DataFormatNotationType = 'EU';
const US_NOTATION: DataFormatNotationType = 'US';

import {TIMEZONE_DATA, TZ_DATE_TO_FORMAT } from './Timezones.data';

describe('FormattedTime TimezoneTesting', () => {
  it.each(TIMEZONE_DATA)(
    'should render properly date with default notation in TZ $timeZone',
    ({ timeZone, EUTime }) => {
      renderWithProvider(<FormattedTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone, applyTimeZoneOffset: true });
      expect(screen.getByText(EUTime)).toBeTruthy();
    }
  );

  it.each(TIMEZONE_DATA)('should render properly date with EU notation in TZ $timeZone', ({ timeZone, EUTime }) => {
    renderWithProvider(<FormattedTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone, applyTimeZoneOffset: true, notation: EU_NOTATION });
    expect(screen.getByText(EUTime)).toBeTruthy();
  });

  it.each(TIMEZONE_DATA)(
    'should render properly date with US notation in TZ $timeZone',
    ({ timeZone, USTime }) => {
      renderWithProvider(<FormattedTime value={TZ_DATE_TO_FORMAT} />, {}, { timeZone, applyTimeZoneOffset: true, notation: US_NOTATION });
      expect(screen.getByText(`${USTime}`)).toBeTruthy();
    }
  );
});
