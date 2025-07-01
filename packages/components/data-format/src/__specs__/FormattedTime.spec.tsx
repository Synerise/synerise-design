import dayjs from 'dayjs';
import moment from 'moment';
import React, { type ReactNode } from 'react';

import {
  type DataFormatNotationType,
  FormattedTime,
} from '@synerise/ds-data-format';
import { renderWithProvider } from '@synerise/ds-utils';
import { screen } from '@testing-library/react';

const DATE_TO_FORMAT = new Date('2023-06-25T15:40:00');
const MOMENT_TO_FORMAT = moment(DATE_TO_FORMAT);
const DAYJS_TO_FORMAT = dayjs(DATE_TO_FORMAT);

const US_NOTATION: DataFormatNotationType = 'US';
const US_FORMATTED_TIME = '3:40 PM';
const US_FORMATTED_TIME_WITH_SECONDS = '3:40:00 PM';

const EU_NOTATION: DataFormatNotationType = 'EU';
const EU_FORMATTED_TIME = '15:40';
const EU_FORMATTED_TIME_WITH_SECONDS = '15:40:00';

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

describe('FormattedTime', () => {
  it('should render properly time with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedTime value={DATE_TO_FORMAT} />,
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly time with EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedTime value={DATE_TO_FORMAT} />,
      {},
      { notation: EU_NOTATION },
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly time with US notation', () => {
    renderInWrapper(
      <FormattedTime value={DATE_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );
    expect(normalizedResult()).toBe(US_FORMATTED_TIME);
  });

  it('should render properly time from moment', () => {
    renderInWrapper(
      <FormattedTime value={MOMENT_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );
    expect(normalizedResult()).toBe(US_FORMATTED_TIME);
  });

  it('should render properly time from daysjs', () => {
    renderInWrapper(
      <FormattedTime value={DAYJS_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );
    expect(normalizedResult()).toBe(US_FORMATTED_TIME);
  });

  it('should render properly time with options and EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedTime value={DAYJS_TO_FORMAT} options={{ second: 'numeric' }} />,
      {},
      { notation: EU_NOTATION },
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_TIME_WITH_SECONDS)).toBeTruthy();
  });

  it('should render properly time with options and US notation', () => {
    renderInWrapper(
      <FormattedTime value={DAYJS_TO_FORMAT} options={{ second: 'numeric' }} />,
      {},
      { notation: US_NOTATION },
    );
    expect(normalizedResult()).toBe(US_FORMATTED_TIME_WITH_SECONDS);
  });
});
