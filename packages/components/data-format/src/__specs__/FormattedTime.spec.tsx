import React from 'react';
import moment from 'moment';
import dayjs from 'dayjs';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { FormattedTime, DataFormatNotationType } from '@synerise/ds-data-format';

const DATE_TO_FORMAT = new Date('2023-06-25T15:40:00');
const MOMENT_TO_FORMAT = moment(DATE_TO_FORMAT);
const DAYJS_TO_FORMAT = dayjs(DATE_TO_FORMAT);

const US_NOTATION: DataFormatNotationType = 'US';
const US_FORMATTED_TIME = '3:40 PM';
const US_FORMATTED_TIME_WITH_SECONDS = '3:40:00 PM';

const EU_NOTATION: DataFormatNotationType = 'EU';
const EU_FORMATTED_TIME = '15:40';
const EU_FORMATTED_TIME_WITH_SECONDS = '15:40:00';

describe('FormattedTime', () => {
  it('should render properly time with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<FormattedTime value={DATE_TO_FORMAT} />);

    // ASSERT
    expect(getByText(EU_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly time with EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<FormattedTime value={DATE_TO_FORMAT} />, {}, { notation: EU_NOTATION });

    // ASSERT
    expect(getByText(EU_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly time with US notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<FormattedTime value={DATE_TO_FORMAT} />, {}, { notation: US_NOTATION });

    // ASSERT
    expect(getByText(US_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly time from moment', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<FormattedTime value={MOMENT_TO_FORMAT} />, {}, { notation: US_NOTATION });

    // ASSERT
    expect(getByText(US_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly time from daysjs', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<FormattedTime value={DAYJS_TO_FORMAT} />, {}, { notation: US_NOTATION });

    // ASSERT
    expect(getByText(US_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly time with options and EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedTime value={DAYJS_TO_FORMAT} options={{ second: 'numeric' }} />,
      {},
      { notation: EU_NOTATION }
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_TIME_WITH_SECONDS)).toBeTruthy();
  });

  it('should render properly time with options and US notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedTime value={DAYJS_TO_FORMAT} options={{ second: 'numeric' }} />,
      {},
      { notation: US_NOTATION }
    );

    // ASSERT
    expect(getByText(US_FORMATTED_TIME_WITH_SECONDS)).toBeTruthy();
  });
});
