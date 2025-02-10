import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { DataFormatNotationType, withDataFormat, WithDataFormatProps } from '@synerise/ds-data-format';

const DATE_TO_FORMAT = new Date('2023-06-25T15:40:00');
const INT_NUMBER_TO_FORMAT = 1234567;
const FLOAT_NUMBER_TO_FORMAT = 1234567.89;

const US_NOTATION: DataFormatNotationType = 'US';
const US_FORMATTED_DATE = '6/25/2023';
const US_FORMATTED_TIME = '3:40 PM';
const US_FORMATTED_INT_NUMBER = '1,234,567';
const US_FORMATTED_FLOAT_NUMBER = '1,234,567.89';

const EU_FORMATTED_DATE = '25.06.2023';
const EU_FORMATTED_TIME = '15:40';
const EU_FORMATTED_INT_NUMBER = '1 234 567';
const EU_FORMATTED_FLOAT_NUMBER = '1 234 567,89';

const normalizeSpaces = (content: string | null) => {
  return content?.replace(/\u00A0|\u202F/g, ' ');
};
describe('withDataFormat', () => {
  const FunctionComponent: React.FC<WithDataFormatProps> = ({
    formatValue,
    isSundayFirstWeekDay,
    firstDayOfWeek,
    is12HoursClock,
    getConstants,
    formatMultipleValues,
    decimalDelimiter,
  }) => {
    return (
      <>
        <span>{formatValue(FLOAT_NUMBER_TO_FORMAT)}</span>
        <span>{formatValue(INT_NUMBER_TO_FORMAT, { minimumFractionDigits: 2, prefix: 'Salary: ' })}</span>
        <span>{formatValue(DATE_TO_FORMAT)}</span>
        <span data-testid="formatted-time">{formatValue(DATE_TO_FORMAT, { targetFormat: 'time' })}</span>
        <span>isSundayFirstWeekDay: {isSundayFirstWeekDay.toString()}</span>
        <span>firstDayOfWeek: {firstDayOfWeek.toString()}</span>
        <span>is12HoursClock: {is12HoursClock.toString()}</span>
        <span>getConstants: {getConstants('weekdays-short').toString()}</span>
        <span>formatMultipleValues: {formatMultipleValues([123456, 123456789]).toString()}</span>
        <span>decimalDelimiter: {decimalDelimiter}</span>
      </>
    );
  };
  const FunctionComponentWithDataFormat = withDataFormat(FunctionComponent);

  class ClassComponent extends React.PureComponent<WithDataFormatProps> {
    constructor(props: WithDataFormatProps) {
      super(props);
    }
    render() {
      const {
        formatValue,
        isSundayFirstWeekDay,
        firstDayOfWeek,
        is12HoursClock,
        getConstants,
        formatMultipleValues,
        decimalDelimiter,
      } = this.props;
      return (
        <>
          <span>{formatValue(FLOAT_NUMBER_TO_FORMAT)}</span>
          <span>{formatValue(INT_NUMBER_TO_FORMAT, { minimumFractionDigits: 2, prefix: 'Salary: ' })}</span>
          <span>{formatValue(DATE_TO_FORMAT)}</span>
          <span data-testid="formatted-time">{formatValue(DATE_TO_FORMAT, { targetFormat: 'time' })}</span>
          <span>isSundayFirstWeekDay: {isSundayFirstWeekDay.toString()}</span>
          <span>firstDayOfWeek: {firstDayOfWeek}</span>
          <span>is12HoursClock: {is12HoursClock.toString()}</span>
          <span>getConstants: {getConstants('weekdays-short').toString()}</span>
          <span>formatMultipleValues: {formatMultipleValues([123456, 123456789]).toString()}</span>
          <span>decimalDelimiter: {decimalDelimiter}</span>
        </>
      );
    }
  }
  const ClassComponentWithDataFormat = withDataFormat(ClassComponent);

  it('should render properly FunctionComponentWithDataFormat with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<FunctionComponentWithDataFormat />);

    // ASSERT
    expect(getByText(EU_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
    expect(getByText(`Salary: ${EU_FORMATTED_INT_NUMBER},00`)).toBeTruthy();
    expect(getByText(EU_FORMATTED_DATE)).toBeTruthy();
    expect(getByText(EU_FORMATTED_TIME)).toBeTruthy();
    expect(getByText('isSundayFirstWeekDay: false')).toBeTruthy();
    expect(getByText('firstDayOfWeek: 1')).toBeTruthy();
    expect(getByText('is12HoursClock: false')).toBeTruthy();
    expect(getByText('getConstants: Mon,Tue,Wed,Thu,Fri,Sat,Sun')).toBeTruthy();
    expect(getByText('formatMultipleValues: 123 456,123 456 789')).toBeTruthy();
    expect(getByText('decimalDelimiter: ,')).toBeTruthy();
  });

  it('should render properly FunctionComponentWithDataFormat with US notation', () => {
    // ARRANGE
    const { getByText, getByTestId } = renderWithProvider(
      <FunctionComponentWithDataFormat />,
      {},
      { notation: US_NOTATION }
    );

    // ASSERT
    expect(getByText(US_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
    expect(getByText(`Salary: ${US_FORMATTED_INT_NUMBER}.00`)).toBeTruthy();
    expect(getByText(US_FORMATTED_DATE)).toBeTruthy();
    expect(normalizeSpaces(getByTestId('formatted-time').textContent)).toBe(US_FORMATTED_TIME);
    expect(getByText('isSundayFirstWeekDay: true')).toBeTruthy();
    expect(getByText('firstDayOfWeek: 0')).toBeTruthy();
    expect(getByText('is12HoursClock: true')).toBeTruthy();
    expect(getByText('getConstants: Sun,Mon,Tue,Wed,Thu,Fri,Sat')).toBeTruthy();
    expect(getByText('formatMultipleValues: 123,456,123,456,789')).toBeTruthy();
    expect(getByText('decimalDelimiter: .')).toBeTruthy();
  });

  it('should render properly ClassComponentWithDataFormat with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<ClassComponentWithDataFormat />);

    // ASSERT
    expect(getByText(EU_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
    expect(getByText(`Salary: ${EU_FORMATTED_INT_NUMBER},00`)).toBeTruthy();
    expect(getByText(EU_FORMATTED_DATE)).toBeTruthy();
    expect(getByText(EU_FORMATTED_TIME)).toBeTruthy();
    expect(getByText('isSundayFirstWeekDay: false')).toBeTruthy();
    expect(getByText('firstDayOfWeek: 1')).toBeTruthy();
    expect(getByText('is12HoursClock: false')).toBeTruthy();
    expect(getByText('getConstants: Mon,Tue,Wed,Thu,Fri,Sat,Sun')).toBeTruthy();
    expect(getByText('formatMultipleValues: 123 456,123 456 789')).toBeTruthy();
    expect(getByText('decimalDelimiter: ,')).toBeTruthy();
  });

  it('should render properly ClassComponentWithDataFormat with US notation', () => {
    // ARRANGE
    const { getByText, getByTestId } = renderWithProvider(
      <ClassComponentWithDataFormat />,
      {},
      { notation: US_NOTATION }
    );

    // ASSERT
    expect(getByText(US_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
    expect(getByText(`Salary: ${US_FORMATTED_INT_NUMBER}.00`)).toBeTruthy();
    expect(getByText(US_FORMATTED_DATE)).toBeTruthy();
    expect(normalizeSpaces(getByTestId('formatted-time').textContent)).toBe(US_FORMATTED_TIME);
    expect(getByText('isSundayFirstWeekDay: true')).toBeTruthy();
    expect(getByText('firstDayOfWeek: 0')).toBeTruthy();
    expect(getByText('is12HoursClock: true')).toBeTruthy();
    expect(getByText('getConstants: Sun,Mon,Tue,Wed,Thu,Fri,Sat')).toBeTruthy();
    expect(getByText('formatMultipleValues: 123,456,123,456,789')).toBeTruthy();
    expect(getByText('decimalDelimiter: .')).toBeTruthy();
  });
});
