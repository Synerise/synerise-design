import dayjs from 'dayjs';
import moment from 'moment';
import React, { type ReactNode } from 'react';

import {
  type DataFormatNotationType,
  FormattedDateTime,
} from '@synerise/ds-data-format';
import { renderWithProvider } from '@synerise/ds-utils';
import { screen } from '@testing-library/react';

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

const WRAPPER_TESTID = 'test_result';
const renderInWrapper = (content: ReactNode, ...rest) => {
  return renderWithProvider(
    <div data-testid={WRAPPER_TESTID}>{content}</div>,
    ...rest,
  );
};
const normalizedResult = () => {
  return screen
    .getByTestId(WRAPPER_TESTID)
    .textContent?.replace(/\u00A0|\u202F/g, ' ');
};

describe('FormattedDateTime', () => {
  it('should render properly datetime with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDateTime value={DATE_TO_FORMAT} />,
    );

    // ASSERT
    expect(
      getByText(`${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`),
    ).toBeTruthy();
  });

  it('should render properly datetime with EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedDateTime value={DATE_TO_FORMAT} />,
      {},
      { notation: EU_NOTATION },
    );

    // ASSERT
    expect(
      getByText(`${EU_FORMATTED_DATE}, ${EU_FORMATTED_TIME}`),
    ).toBeTruthy();
  });

  it('should render properly datetime with US notation', () => {
    renderInWrapper(
      <FormattedDateTime value={DATE_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );

    expect(normalizedResult()).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`,
    );
  });

  it('should render properly datetime from moment', () => {
    renderInWrapper(
      <FormattedDateTime value={MOMENT_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );
    expect(normalizedResult()).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`,
    );
  });

  it('should render properly datetime from daysjs', () => {
    renderInWrapper(
      <FormattedDateTime value={DAYJS_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );

    expect(normalizedResult()).toBe(
      `${US_FORMATTED_DATE}, ${US_FORMATTED_TIME}`,
    );
  });

  it('should render properly datetime with options', () => {
    renderInWrapper(
      <FormattedDateTime
        value={DAYJS_TO_FORMAT}
        options={{
          dateOptions: { month: 'long' },
          timeOptions: { second: 'numeric' },
        }}
      />,
      {},
      { notation: US_NOTATION },
    );

    expect(normalizedResult()).toBe(
      `${US_FORMATTED_LONG_DATE}, ${US_FORMATTED_TIME_WITH_SECONDS}`,
    );
  });
});
