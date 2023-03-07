import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import InputNumber from '../index';

describe('InputNumber', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(<InputNumber data-testid={TEST_ID} />);

    // ASSERT
    expect(getByTestId(TEST_ID)).toBeTruthy();
  });

  it('should handle increase', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(<InputNumber data-testid={TEST_ID} defaultValue={3} />);
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ACT
    fireEvent.mouseDown(document.getElementsByClassName('ant-input-number-handler-up')[0]);

    // ASSERT
    expect(input.value).toEqual('4');
  });

  it('should handle decrease', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(<InputNumber data-testid={TEST_ID} defaultValue={3} />);
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ASSERT
    expect(input.value).toEqual('3');

    // ACT
    fireEvent.mouseDown(document.getElementsByClassName('ant-input-number-handler-down')[0]);

    // ASSERT
    expect(input.value).toEqual('2');
  });

  it('should keep min value', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(<InputNumber data-testid={TEST_ID} defaultValue={2} min={2} />);
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ACT
    fireEvent.mouseDown(document.getElementsByClassName('ant-input-number-handler-down')[0]);

    // ASSERT
    expect(input.value).toEqual('2');
  });

  it('should keep max value', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(<InputNumber data-testid={TEST_ID} defaultValue={2} max={2} />);
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ACT
    fireEvent.mouseDown(document.getElementsByClassName('ant-input-number-handler-up')[0]);

    // ASSERT
    expect(input.value).toEqual('2');
  });

  it('should render label', () => {
    // ARRANGE
    const LABEL = 'label';
    const { getByLabelText } = renderWithProvider(<InputNumber label={LABEL} />);

    // ASSERT
    expect(getByLabelText(LABEL)).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const DESCRIPTION = 'description';
    const { getByText } = renderWithProvider(<InputNumber description={DESCRIPTION} />);

    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should handle error state', () => {
    // ARRANGE
    const ERROR_MESSAGE = 'error message';
    const { getByText, container } = renderWithProvider(<InputNumber errorText={ERROR_MESSAGE} />);

    // ASSERT
    expect(getByText(ERROR_MESSAGE)).toBeTruthy();
    expect(container.querySelector('.ant-input-number.error')).toBeTruthy();
  });

  it('should render prefix and suffix', () => {
    // ARRANGE
    const PREFIX = 'Prefix value';
    const SUFFIX = 'Suffix value';
    const { getByText } = renderWithProvider(<InputNumber prefixel={PREFIX} suffixel={SUFFIX} />);

    // ASSERT
    expect(getByText(PREFIX)).toBeTruthy();
    expect(getByText(SUFFIX)).toBeTruthy();
  });

  it('should have proper value and formatting for EU notation', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(<InputNumber data-testid={TEST_ID} defaultValue={1234567.89} />);
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ASSERT
    expect(input.value).toEqual('1 234 567,89');
    expect(input.getAttribute('aria-valuenow')).toEqual('1234567.89');
  });

  it('should have proper value and formatting for US notation', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid={TEST_ID} defaultValue={1234567.89} />,
      {},
      { notation: 'US' }
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ASSERT
    expect(input.value).toEqual('1,234,567.89');
    expect(input.getAttribute('aria-valuenow')).toEqual('1234567.89');
  });

  it('should have proper value and formatting with formatting options', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(
      <InputNumber
        data-testid={TEST_ID}
        defaultValue={1234567.891234}
        valueFormatOptions={{ maximumFractionDigits: 3 }}
      />,
      {},
      { notation: 'US' }
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ASSERT
    expect(input.value).toEqual('1,234,567.891');
  });
});
