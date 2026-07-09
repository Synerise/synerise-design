import React from 'react';

import { type DataFormatNotationType , renderWithProvider } from '@synerise/ds-core';
import { act, fireEvent } from '@testing-library/react';

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
      document.getElementsByClassName('ds-input-number-handler-up')[0],
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
      document.getElementsByClassName('ds-input-number-handler-down')[0],
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
      document.getElementsByClassName('ds-input-number-handler-down')[0],
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
      document.getElementsByClassName('ds-input-number-handler-up')[0],
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
    expect(container.querySelector('.ds-input-number.error')).toBeTruthy();
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
    const onChange = vi.fn();
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
    const onChange = vi.fn();
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

  it('clamps an over-max value to max on blur (antd parity)', () => {
    const onChange = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" max={100} onChange={onChange} />,
    );
    const input = getByTestId('x') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '150' } });
    // Typing is never clamped — the raw value is emitted while editing.
    expect(onChange).toHaveBeenLastCalledWith(150);
    fireEvent.blur(input);
    // On blur the out-of-range value re-aligns to max.
    expect(onChange).toHaveBeenLastCalledWith(100);
    expect(input.value).toBe('100');
  });

  it('clamps an under-min value to min on blur', () => {
    const onChange = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" min={10} onChange={onChange} />,
    );
    const input = getByTestId('x') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenLastCalledWith(10);
    expect(input.value).toBe('10');
  });

  it('leaves an in-range value unchanged on blur', () => {
    const onChange = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" min={0} max={100} onChange={onChange} />,
    );
    const input = getByTestId('x') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '50' } });
    onChange.mockClear();
    fireEvent.blur(input);
    expect(onChange).not.toHaveBeenCalled();
    expect(input.value).toBe('50');
  });

  it('leaves an emptied field empty on blur — controlled, must not reset to min (antd parity)', () => {
    // react-final-form gives a cleared numeric field value='' (empty string),
    // so emulate that: onChange(null) → value=''.
    const Wrapper = (): JSX.Element => {
      const [val, setVal] = React.useState<number | ''>(50);
      return (
        <InputNumber
          data-testid="x"
          min={5}
          value={val as unknown as number}
          onChange={(v) => setVal(v ?? '')}
        />
      );
    };
    const { getByTestId } = renderWithProvider(<Wrapper />);
    const input = getByTestId('x') as HTMLInputElement;
    act(() => {
      fireEvent.change(input, { target: { value: '' } });
    });
    act(() => {
      fireEvent.blur(input);
    });
    // antd leaves an emptied field empty (placeholder); it must NOT snap to min.
    expect(input.value).toBe('');
  });

  it('still calls the consumer onBlur handler after clamping', () => {
    const onBlur = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" max={100} onBlur={onBlur} />,
    );
    const input = getByTestId('x') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '150' } });
    fireEvent.blur(input);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('forwards key presses to a consumer onKeyPress handler', () => {
    const onKeyPress = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" onKeyPress={onKeyPress} />,
    );
    fireEvent.keyPress(getByTestId('x'), { key: '5', charCode: 53 });
    expect(onKeyPress).toHaveBeenCalledTimes(1);
  });

  it('passes tabIndex through to the input', () => {
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" tabIndex={3} />,
    );
    expect((getByTestId('x') as HTMLInputElement).tabIndex).toBe(3);
  });

  it('forwards onKeyDown to the consumer and still steps on ArrowUp', () => {
    const onKeyDown = vi.fn();
    const onChange = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber
        data-testid="x"
        defaultValue={1}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />,
    );
    fireEvent.keyDown(getByTestId('x'), { key: 'ArrowUp' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(2);
  });

  it('defaults inputMode to "decimal" and allows overriding it', () => {
    const { getByTestId: getDefault } = renderWithProvider(
      <InputNumber data-testid="d" />,
    );
    expect(getDefault('d').getAttribute('inputmode')).toBe('decimal');
    const { getByTestId: getOverride } = renderWithProvider(
      <InputNumber data-testid="o" inputMode="numeric" />,
    );
    expect(getOverride('o').getAttribute('inputmode')).toBe('numeric');
  });

  it('forwards standard input attributes (maxLength, onFocus)', () => {
    const onFocus = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" maxLength={5} onFocus={onFocus} />,
    );
    const input = getByTestId('x') as HTMLInputElement;
    expect(input.maxLength).toBe(5);
    fireEvent.focus(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
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

// --- DS-native stepper regression tests (no antd; arithmetic / keyboard owned by useStepper) ---

describe('InputNumber steppers (DS-native)', () => {
  const handlerUp = (): Element =>
    document.getElementsByClassName('ds-input-number-handler-up')[0];
  const handlerDown = (): Element =>
    document.getElementsByClassName('ds-input-number-handler-down')[0];

  it('steps with float-safe arithmetic (0.2 + 0.1 === 0.3)', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <InputNumber data-testid="x" defaultValue={0.2} step={0.1} onChange={onChange} />,
    );
    fireEvent.mouseDown(handlerUp());
    expect(onChange).toHaveBeenCalledWith(0.3);
  });

  it('derives stepper precision from the step decimals (no valueFormatOptions needed)', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <InputNumber data-testid="x" defaultValue={0} step={0.01} onChange={onChange} />,
    );
    fireEvent.mouseDown(handlerUp());
    expect(onChange).toHaveBeenCalledWith(0.01);
  });

  it('raises stepper precision from valueFormatOptions.maximumFractionDigits', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <InputNumber
        data-testid="x"
        value={1.234}
        step={1}
        valueFormatOptions={{ maximumFractionDigits: 2 }}
        onChange={onChange}
      />,
    );
    fireEvent.mouseDown(handlerUp());
    expect(onChange).toHaveBeenCalledWith(2.23);
  });

  it('defaults stepper precision to 0 (integer steps) with no step decimals or format options', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <InputNumber data-testid="x" value={1.6} step={1} onChange={onChange} />,
    );
    fireEvent.mouseDown(handlerUp());
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('clamps to max with a non-unit step', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <InputNumber data-testid="x" defaultValue={0} max={5} step={10} onChange={onChange} />,
    );
    fireEvent.mouseDown(handlerUp());
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('clamps to min when stepping down', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <InputNumber data-testid="x" defaultValue={0} min={-2} step={10} onChange={onChange} />,
    );
    fireEvent.mouseDown(handlerDown());
    expect(onChange).toHaveBeenCalledWith(-2);
  });

  it('steps via ArrowUp / ArrowDown keys', () => {
    const onChange = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" defaultValue={3} onChange={onChange} />,
    );
    const input = getByTestId('x');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenLastCalledWith(4);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenLastCalledWith(3);
  });

  it('multiplies the keyboard step by ten when Shift is held', () => {
    const onChange = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" defaultValue={0} step={1} onChange={onChange} />,
    );
    fireEvent.keyDown(getByTestId('x'), { key: 'ArrowUp', shiftKey: true });
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it('fires onStep with the new value and step info on stepper click (antd parity)', () => {
    const onStep = vi.fn();
    renderWithProvider(
      <InputNumber data-testid="x" defaultValue={4} step={2} onStep={onStep} />,
    );
    fireEvent.mouseDown(handlerUp());
    expect(onStep).toHaveBeenCalledWith(6, { offset: 2, type: 'up' });
    fireEvent.mouseDown(handlerDown());
    expect(onStep).toHaveBeenLastCalledWith(4, { offset: 2, type: 'down' });
  });

  it('fires onStep on ArrowUp / ArrowDown keyboard steps', () => {
    const onStep = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" defaultValue={3} onStep={onStep} />,
    );
    fireEvent.keyDown(getByTestId('x'), { key: 'ArrowUp' });
    expect(onStep).toHaveBeenLastCalledWith(4, { offset: 1, type: 'up' });
  });

  it('labels the steppers "Increase Value" / "Decrease Value" (antd parity)', () => {
    // The visual-test story queries the steppers by these exact accessible names.
    const { getByLabelText } = renderWithProvider(
      <InputNumber data-testid="x" defaultValue={1} />,
    );
    expect(getByLabelText('Increase Value')).toBeTruthy();
    expect(getByLabelText('Decrease Value')).toBeTruthy();
  });

  it('does not render steppers when disabled', () => {
    renderWithProvider(<InputNumber data-testid="x" disabled />);
    expect(
      document.getElementsByClassName('ds-input-number-handler-up').length,
    ).toBe(0);
  });

  it('does not render steppers when readOnly', () => {
    renderWithProvider(<InputNumber data-testid="x" readOnly />);
    expect(
      document.getElementsByClassName('ds-input-number-handler-up').length,
    ).toBe(0);
  });
});

describe('InputNumber stepper press-and-hold', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('auto-repeats while a stepper is held and stops on release', () => {
    const onChange = vi.fn();
    renderWithProvider(
      <InputNumber data-testid="x" defaultValue={0} step={1} onChange={onChange} />,
    );
    const up = document.getElementsByClassName('ds-input-number-handler-up')[0];

    fireEvent.mouseDown(up);
    expect(onChange).toHaveBeenCalledTimes(1); // immediate step

    act(() => {
      vi.advanceTimersByTime(600 + 200); // initial delay + one repeat interval
    });
    expect(onChange.mock.calls.length).toBeGreaterThan(1);

    fireEvent.mouseUp(up);
    const callsAfterRelease = onChange.mock.calls.length;
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onChange.mock.calls.length).toBe(callsAfterRelease); // no more after release
  });
});

// --- value-flow regression tests (formatter/parser owned by the DS utils) ---

describe('InputNumber value flow', () => {
  it('keeps a lone "-" while typing and reports null', () => {
    const onChange = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" onChange={onChange} />,
    );
    const input = getByTestId('x') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '-' } });
    expect(input.value).toEqual('-');
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('reports 0 (not null) rather than swallowing zero', () => {
    const onChange = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" onChange={onChange} />,
    );
    fireEvent.change(getByTestId('x'), { target: { value: '0' } });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('round-trips a decimal typed in EU notation', () => {
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" />,
      {},
      { notation: 'EU' },
    );
    const input = getByTestId('x') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1234,5' } });
    expect(input.value).toEqual('1 234,5');
  });

  it('round-trips a decimal typed in US notation', () => {
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" />,
      {},
      { notation: 'US' },
    );
    const input = getByTestId('x') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '1234.5' } });
    expect(input.value).toEqual('1,234.5');
  });

  it('forwards the native onBlur event', () => {
    const onBlur = vi.fn();
    const { getByTestId } = renderWithProvider(
      <InputNumber data-testid="x" onBlur={onBlur} />,
    );
    fireEvent.blur(getByTestId('x'));
    expect(onBlur).toHaveBeenCalled();
  });

  it('renders prefixel / suffixel inside group addons', () => {
    const { container } = renderWithProvider(
      <InputNumber prefixel={<span>pre</span>} suffixel={<span>suf</span>} />,
    );
    expect(
      container.getElementsByClassName('ds-input-number-group-addon').length,
    ).toBe(2);
  });
});
