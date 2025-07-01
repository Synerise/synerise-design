import React from 'react';

import type { DataFormatNotationType } from '@synerise/ds-data-format';
import { renderWithProvider } from '@synerise/ds-utils';
import { fireEvent } from '@testing-library/react';

import InputNumber from '../index';

describe('InputNumber', () => {
  it('should render', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid={TEST_ID} />,
    );

    // ASSERT
    expect(getByTestId(TEST_ID)).toBeTruthy();
  });

  it('should handle increase', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid={TEST_ID} defaultValue={3} />,
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ACT
    fireEvent.mouseDown(
      document.getElementsByClassName('ant-input-number-handler-up')[0],
    );

    // ASSERT
    expect(input.value).toEqual('4');
  });

  it('should handle decrease', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid={TEST_ID} defaultValue={3} />,
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ASSERT
    expect(input.value).toEqual('3');

    // ACT
    fireEvent.mouseDown(
      document.getElementsByClassName('ant-input-number-handler-down')[0],
    );

    // ASSERT
    expect(input.value).toEqual('2');
  });

  it('should keep min value', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid={TEST_ID} defaultValue={2} min={2} />,
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ACT
    fireEvent.mouseDown(
      document.getElementsByClassName('ant-input-number-handler-down')[0],
    );

    // ASSERT
    expect(input.value).toEqual('2');
  });

  it('should keep max value', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid={TEST_ID} defaultValue={2} max={2} />,
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ACT
    fireEvent.mouseDown(
      document.getElementsByClassName('ant-input-number-handler-up')[0],
    );

    // ASSERT
    expect(input.value).toEqual('2');
  });

  it('should render label', () => {
    // ARRANGE
    const LABEL = 'label';
    const { getByLabelText } = renderWithProvider(
      <InputNumber label={LABEL} />,
    );

    // ASSERT
    expect(getByLabelText(LABEL)).toBeTruthy();
  });

  it('should render description', () => {
    // ARRANGE
    const DESCRIPTION = 'description';
    const { getByText } = renderWithProvider(
      <InputNumber description={DESCRIPTION} />,
    );

    // ASSERT
    expect(getByText(DESCRIPTION)).toBeTruthy();
  });

  it('should handle error state', () => {
    // ARRANGE
    const ERROR_MESSAGE = 'error message';
    const { getByText, container } = renderWithProvider(
      <InputNumber errorText={ERROR_MESSAGE} />,
    );

    // ASSERT
    expect(getByText(ERROR_MESSAGE)).toBeTruthy();
    expect(container.querySelector('.ant-input-number.error')).toBeTruthy();
  });

  it('should render prefix and suffix', () => {
    // ARRANGE
    const PREFIX = 'Prefix value';
    const SUFFIX = 'Suffix value';
    const { getByText } = renderWithProvider(
      <InputNumber prefixel={PREFIX} suffixel={SUFFIX} />,
    );

    // ASSERT
    expect(getByText(PREFIX)).toBeTruthy();
    expect(getByText(SUFFIX)).toBeTruthy();
  });

  it('should render label with tooltip icon', () => {
    // ARRANGE
    const TOOLTIP = 'Tooltip title';
    const LABEL = 'Label';
    const { getByText } = renderWithProvider(
      <InputNumber label={LABEL} tooltip={TOOLTIP} />,
    );

    // ASSERT
    expect(getByText(LABEL)).toBeTruthy();
    expect(document.querySelector('.ds-icon > .info-fill-s')).toBeTruthy();
  });

  it('should have proper value and formatting for EU notation', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid={TEST_ID} defaultValue={1234567.89} />,
    );
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
      { notation: 'US' },
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
      { notation: 'US' },
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;

    // ASSERT
    expect(input.value).toEqual('1,234,567.891');
  });

  it('should fire onchange handler with value as number', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const changedValue = 123.45;
    const onChange = jest.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber
        data-testid={TEST_ID}
        defaultValue={1234567.891234}
        onChange={onChange}
      />,
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;
    fireEvent.change(input, { target: { value: changedValue } });

    // ASSERT
    expect(onChange).toBeCalledWith(changedValue);
  });
  it('should fire onchange handler with formatted and parsed value, so it matches the input value', () => {
    // ARRANGE
    const TEST_ID = 'test-id';
    const changedValue = '1234567.891a';
    const expectedValue = 1234567.891;
    const onChange = jest.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber
        data-testid={TEST_ID}
        defaultValue={1234567.89}
        onChange={onChange}
      />,
    );
    const input = getByTestId(TEST_ID) as HTMLInputElement;
    fireEvent.change(input, { target: { value: changedValue } });

    // ASSERT
    expect(onChange).toBeCalledWith(expectedValue);
  });
});

const setup = ({
  defaultValue,
  notation = 'EU',
}: {
  defaultValue: number;
  notation?: DataFormatNotationType;
}): { input: HTMLInputElement } => {
  const TEST_ID = `${notation}-test-id`;
  const { getByTestId } = renderWithProvider(
    <InputNumber data-testid={TEST_ID} defaultValue={defaultValue} />,
    {},
    { notation },
  );
  const input = getByTestId(TEST_ID) as HTMLInputElement;
  return { input };
};

describe('InputNumber near MAX_SAFE_INTEGER', () => {
  const testCases = [
    {
      initialValue: 999999999999999,
      expectedEuResult: '999 999 999 999 999',
      expectedUsResult: '999,999,999,999,999',
    },
    {
      initialValue: 9.99999999999999,
      expectedEuResult: '9,99999999999999',
      expectedUsResult: '9.99999999999999',
    },
    {
      initialValue: 9999999999.99999,
      expectedEuResult: '9 999 999 999,99999',
      expectedUsResult: '9,999,999,999.99999',
    },
    {
      initialValue: 9007199254740991,
      expectedEuResult: '9 007 199 254 740 991',
      expectedUsResult: '9,007,199,254,740,991',
    },
  ];

  for (const testCase of testCases) {
    it(`should have proper value and formatting near MAX_SAFE_INTEGER for: ${testCase.initialValue}`, async () => {
      const { input: euInput } = setup({
        defaultValue: testCase.initialValue,
        notation: 'EU',
      });
      const { input: usInput } = setup({
        defaultValue: testCase.initialValue,
        notation: 'US',
      });

      expect(euInput).toHaveValue(testCase.expectedEuResult);
      expect(usInput).toHaveValue(testCase.expectedUsResult);
    });
  }
});

describe('InputNumber with zeros', () => {
  const testCases = [
    {
      initialValue: 70,
      expectedEuResult: '70',
      expectedUsResult: '70',
    },
    {
      initialValue: 7.0,
      expectedEuResult: '7',
      expectedUsResult: '7',
    },
    {
      initialValue: 7.06,
      expectedEuResult: '7,06',
      expectedUsResult: '7.06',
    },
    {
      initialValue: 7.06,
      expectedEuResult: '7,06',
      expectedUsResult: '7.06',
    },
    {
      initialValue: 7.06,
      expectedEuResult: '7,06',
      expectedUsResult: '7.06',
    },
    {
      initialValue: 7.06005,
      expectedEuResult: '7,06005',
      expectedUsResult: '7.06005',
    },
    {
      initialValue: 7.06005,
      expectedEuResult: '7,06005',
      expectedUsResult: '7.06005',
    },
    {
      initialValue: 7.0600504,
      expectedEuResult: '7,0600504',
      expectedUsResult: '7.0600504',
    },
  ];

  for (const testCase of testCases) {
    it(`should have proper value and formatting with zeros for: ${testCase.initialValue}`, async () => {
      const { input: euInput } = setup({
        defaultValue: testCase.initialValue,
        notation: 'EU',
      });
      const { input: usInput } = setup({
        defaultValue: testCase.initialValue,
        notation: 'US',
      });

      expect(euInput).toHaveValue(testCase.expectedEuResult);
      expect(usInput).toHaveValue(testCase.expectedUsResult);
    });
  }
});
