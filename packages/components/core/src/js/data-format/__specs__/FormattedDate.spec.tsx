import dayjs from 'dayjs';
import moment from 'moment';
import React from 'react';

import {
  type DataFormatNotationType,
  FormattedDate,
} from '../index';
import { renderWithProvider } from '../../testing';

const DATE_TO_FORMAT = new Date('2023-06-25T15:40:00');
const MOMENT_TO_FORMAT = moment(DATE_TO_FORMAT);
const DAYJS_TO_FORMAT = dayjs(DATE_TO_FORMAT);

const US_NOTATION: DataFormatNotationType = 'US';
const US_FORMATTED_DATE = '6/25/2023';
const US_FORMATTED_LONG_DATE = 'June 25, 2023';

const EU_NOTATION: DataFormatNotationType = 'EU';
const EU_FORMATTED_DATE = '25.06.2023';

describe('FormattedDate', () => {
  it('should render properly date with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate value={DATE_TO_FORMAT} />,
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_DATE)).toBeTruthy();
  });

  it('should render properly date with EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate value={DATE_TO_FORMAT} />,
      {},
      { notation: EU_NOTATION },
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_DATE)).toBeTruthy();
  });

  it('should render properly date with US notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate value={DATE_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText(US_FORMATTED_DATE)).toBeTruthy();
  });

  it('should render properly date from moment', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate value={MOMENT_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText(US_FORMATTED_DATE)).toBeTruthy();
  });

  it('should render properly date from daysjs', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate value={DAYJS_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText(US_FORMATTED_DATE)).toBeTruthy();
  });

  it('should render properly date with options', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate value={DAYJS_TO_FORMAT} options={{ month: 'long' }} />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText(US_FORMATTED_LONG_DATE)).toBeTruthy();
  });

  it('should render properly date with translation, month long and PL locale', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate value={DAYJS_TO_FORMAT} options={{ month: 'long' }} />,
      {},
      { locale: 'pl', notation: EU_NOTATION },
    );

    // ASSERT
    expect(getByText('25 czerwca 2023')).toBeTruthy();
  });

  it('should render properly date with translation, month short and PL locale', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate value={DAYJS_TO_FORMAT} options={{ month: 'short' }} />,
      {},
      { locale: 'pl', notation: EU_NOTATION },
    );

    // ASSERT
    expect(getByText('25 cze 2023')).toBeTruthy();
  });

  it('should render properly weekday-long', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate
        value={DAYJS_TO_FORMAT}
        options={{ targetFormat: 'weekday-long' }}
      />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText('Sunday')).toBeTruthy();
  });

  it('should render properly weekday-long and PL locale', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate
        value={DAYJS_TO_FORMAT}
        options={{ targetFormat: 'weekday-long' }}
      />,
      {},
      { locale: 'pl', notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText('niedziela')).toBeTruthy();
  });

  it('should render properly weekday-short', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate
        value={DAYJS_TO_FORMAT}
        options={{ targetFormat: 'weekday-short' }}
      />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText('Sun')).toBeTruthy();
  });

  it('should render properly month-long', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate
        value={DAYJS_TO_FORMAT}
        options={{ targetFormat: 'month-long' }}
      />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText('June')).toBeTruthy();
  });

  it('should render properly month-long with PL locale', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate
        value={DAYJS_TO_FORMAT}
        options={{ targetFormat: 'month-long' }}
      />,
      {},
      { locale: 'pl', notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText('czerwiec')).toBeTruthy();
  });

  it('should render properly month-short', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate
        value={DAYJS_TO_FORMAT}
        options={{ targetFormat: 'month-short' }}
      />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText('Jun')).toBeTruthy();
  });

  it('should render properly month-short with PL locale', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDate
        value={DAYJS_TO_FORMAT}
        options={{ targetFormat: 'month-short' }}
      />,
      {},
      { locale: 'pl', notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText('cze')).toBeTruthy();
  });
});
