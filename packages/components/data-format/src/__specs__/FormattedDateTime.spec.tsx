import * as React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { FormattedDateTime, DataFormatNotationType } from '@synerise/ds-data-format';

const DATE_TO_FORMAT = new Date('2023-06-25T15:40:00');
const MOMENT_TO_FORMAT = moment(DATE_TO_FORMAT);
const DAYJS_TO_FORMAT = dayjs(DATE_TO_FORMAT);

const US_NOTATION: DataFormatNotationType = 'US';
const US_FORMATTED_DATE = '6/25/2023';
const US_FORMATTED_LONG_DATE = 'June 25, 2023';
const US_FORMATTED_TIME = '3:40 PM';
const US_FORMATTED_TIME_WITH_SECONDS = '3:40:00 PM';
const EU_NOTATION: DataFormatNotationType = 'EU';

const EU_FORMATTED_DATE = '25.06.2023';
const EU_FORMATTED_TIME = '15:40';

describe('FormattedDateTime', () => {
  it('should render properly datetime with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<FormattedDateTime value={DATE_TO_FORMAT} />);

    // ASSERT
    expect(getByText(`${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`)).toBeTruthy();
  });

  it('should render properly datetime with EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDateTime value={DATE_TO_FORMAT} />,
      {},
      { notation: EU_NOTATION }
    );

    // ASSERT
    expect(getByText(`${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`)).toBeTruthy();
  });

  it('should render properly datetime with US notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDateTime value={DATE_TO_FORMAT} />,
      {},
      { notation: US_NOTATION }
    );

    // ASSERT
    expect(getByText(`${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`)).toBeTruthy();
  });

  it('should render properly datetime from moment', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDateTime value={MOMENT_TO_FORMAT} />,
      {},
      { notation: US_NOTATION }
    );

    // ASSERT
    expect(getByText(`${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`)).toBeTruthy();
  });

  it('should render properly datetime from daysjs', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDateTime value={DAYJS_TO_FORMAT} />,
      {},
      { notation: US_NOTATION }
    );

    // ASSERT
    expect(getByText(`${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`)).toBeTruthy();
  });

  it('should render properly datetime with options', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDateTime
        value={DAYJS_TO_FORMAT}
        options={{ dateOptions: { month: 'long' }, timeOptions: { second: 'numeric' } }}
      />,
      {},
      { notation: US_NOTATION }
    );

    // ASSERT
    expect(getByText(`${US_FORMATTED_LONG_DATE}, ${US_FORMATTED_TIME_WITH_SECONDS}`)).toBeTruthy();
  });
});
