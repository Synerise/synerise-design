import * as React from 'react';

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

describe('withDataFormat', () => {
  const FunctionComponent: React.FC<WithDataFormatProps> = ({ formatValue }) => {
    return (
      <>
        <div>{formatValue(FLOAT_NUMBER_TO_FORMAT)}</div>
        <div>{formatValue(INT_NUMBER_TO_FORMAT, { minimumFractionDigits: 2, prefix: 'Salary: ' })}</div>
        <div>{formatValue(DATE_TO_FORMAT)}</div>
        <div>{formatValue(DATE_TO_FORMAT, { targetFormat: 'time' })}</div>
      </>
    );
  };
  const FunctionComponentWithDataFormat = withDataFormat(FunctionComponent);

  class ClassComponent extends React.PureComponent<WithDataFormatProps> {
    constructor(props: WithDataFormatProps) {
      super(props);
    }
    render() {
      const { formatValue } = this.props;
      return (
        <>
          <div>{formatValue(FLOAT_NUMBER_TO_FORMAT)}</div>
          <div>{formatValue(INT_NUMBER_TO_FORMAT, { minimumFractionDigits: 2, prefix: 'Salary: ' })}</div>
          <div>{formatValue(DATE_TO_FORMAT)}</div>
          <div>{formatValue(DATE_TO_FORMAT, { targetFormat: 'time' })}</div>
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
  });

  it('should render properly FunctionComponentWithDataFormat with US notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<FunctionComponentWithDataFormat />, {}, { notation: US_NOTATION });

    // ASSERT
    expect(getByText(US_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
    expect(getByText(`Salary: ${US_FORMATTED_INT_NUMBER}.00`)).toBeTruthy();
    expect(getByText(US_FORMATTED_DATE)).toBeTruthy();
    expect(getByText(US_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly ClassComponentWithDataFormat with default notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<ClassComponentWithDataFormat />);

    // ASSERT
    expect(getByText(EU_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
    expect(getByText(`Salary: ${EU_FORMATTED_INT_NUMBER},00`)).toBeTruthy();
    expect(getByText(EU_FORMATTED_DATE)).toBeTruthy();
    expect(getByText(EU_FORMATTED_TIME)).toBeTruthy();
  });

  it('should render properly ClassComponentWithDataFormat with US notation', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<ClassComponentWithDataFormat />, {}, { notation: US_NOTATION });

    // ASSERT
    expect(getByText(US_FORMATTED_FLOAT_NUMBER)).toBeTruthy();
    expect(getByText(`Salary: ${US_FORMATTED_INT_NUMBER}.00`)).toBeTruthy();
    expect(getByText(US_FORMATTED_DATE)).toBeTruthy();
    expect(getByText(US_FORMATTED_TIME)).toBeTruthy();
  });
});
