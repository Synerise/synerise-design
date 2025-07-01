import React from 'react';

import {
  type DataFormatNotationType,
  FormattedNumber,
} from '@synerise/ds-data-format';
import { renderWithProvider } from '@synerise/ds-utils';

const INT_NUMBER_TO_FORMAT = 1234567;
const FLOAT_NUMBER_TO_FORMAT = 1234567.89;

const US_NOTATION: DataFormatNotationType = 'US';
const US_FORMATTED_INT_NUMBER = '1,234,567';
const US_FORMATTED_FLOAT_NUMBER = '1,234,567.89';

const EU_NOTATION: DataFormatNotationType = 'EU';
const EU_FORMATTED_INT_NUMBER = '1 234 567';
const EU_FORMATTED_FLOAT_NUMBER = '1 234 567,89';

describe('FormattedNumber', () => {
  it('should render properly value with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedNumber value={INT_NUMBER_TO_FORMAT} />,
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_INT_NUMBER)).toBeTruthy();
  });

  it('should render properly int value with EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedNumber value={INT_NUMBER_TO_FORMAT} />,
      {},
      { notation: EU_NOTATION },
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_INT_NUMBER)).toBeTruthy();
  });

  it('should render properly float value with EU notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedNumber value={FLOAT_NUMBER_TO_FORMAT} />,
      {},
      { notation: EU_NOTATION },
    );

    // ASSERT
    expect(getByText(EU_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
  });

  it('should render properly int value with US notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedNumber value={INT_NUMBER_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText(US_FORMATTED_INT_NUMBER)).toBeTruthy();
  });

  it('should render properly float value with US notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedNumber value={FLOAT_NUMBER_TO_FORMAT} />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText(US_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
  });

  it('should render properly number value with options', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <FormattedNumber
        value={INT_NUMBER_TO_FORMAT}
        options={{ minimumFractionDigits: 2, prefix: 'Salary: ' }}
      />,
      {},
      { notation: US_NOTATION },
    );

    // ASSERT
    expect(getByText(`Salary: ${US_FORMATTED_INT_NUMBER}.00`)).toBeTruthy();
  });
});
