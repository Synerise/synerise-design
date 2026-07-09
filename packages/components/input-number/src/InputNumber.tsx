import React, {
  type FocusEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { useDataFormat } from '@synerise/ds-core';
import FormField from '@synerise/ds-form-field';
import {
  SIZER_STYLE,
  useAutosizeWidth,
  useStretchToFit,
} from '@synerise/ds-input';

import * as S from './InputNumber.styles';
import { type InputNumberProps } from './InputNumber.types';
import { useStepper } from './hooks/useStepper';
import { formatNumber, parseFormattedNumber } from './utils/inputNumber.utils';

const AUTOSIZE_EXTRA_WIDTH = 45;

// Only digits, an optional leading minus and a single decimal separator are accepted on keypress.
// Note: the native `keypress` event (React's onKeyPress) does not fire for Backspace / arrows /
// Delete, so this filter never blocks editing keys — moving it to onKeyDown would.
const NUMERIC_KEY = /^-?\d*(\.|,)?\d*$/i;

const cx = (...classes: (string | false | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

const InputNumber = ({
  label,
  description,
  errorText,
  raw,
  error,
  prefixel,
  suffixel,
  style,
  className,
  tooltip,
  tooltipConfig,
  value,
  defaultValue,
  valueFormatOptions,
  onChange,
  onBlur,
  onKeyPress,
  onKeyDown,
  onStep,
  autoResize,
  autoResizeProps,
  min,
  max,
  step,
  disabled,
  readOnly,
  autoFocus,
  inputMode,
  placeholder,
  size,
  name,
  id: idProp,
  // forward remaining standard input attributes (maxLength, onFocus, tabIndex, data-*/aria-*, …)
  // to the input, as antd's rc-input-number did
  ...rest
}: InputNumberProps) => {
  const { formatValue, thousandDelimiter, decimalDelimiter } = useDataFormat();

  const formatter = useCallback(
    (inputValue: string | number | null | undefined): string =>
      formatNumber(
        inputValue,
        formatValue,
        thousandDelimiter,
        decimalDelimiter,
        valueFormatOptions,
      ),
    [formatValue, valueFormatOptions, thousandDelimiter, decimalDelimiter],
  );

  const [localValue, setLocalValue] = useState<number | null | undefined>(
    value ?? defaultValue,
  );
  const [displayValue, setDisplayValue] = useState<string>(() =>
    formatter(value ?? defaultValue),
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollLeftRef = useRef(0);

  const id = useMemo(() => idProp ?? uuid(), [idProp]);
  const showError = Boolean(error || errorText);

  useEffect(() => {
    if (value !== undefined && value !== localValue) {
      setLocalValue(value);
      setDisplayValue(formatter(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Typed input: parse the locale-formatted string to a JS number string FIRST (so a comma decimal
  // survives), then re-format for display — antd ran its `parser` before its `formatter` the same
  // way. `parseFormattedNumber`/`formatNumber` preserve a lone '-', a trailing decimal and trailing
  // zeros while the user is mid-type.
  const handleInputChange = useCallback(
    (rawValue: string): void => {
      const jsString = `${parseFormattedNumber(
        rawValue,
        formatValue,
        thousandDelimiter,
        decimalDelimiter,
      )}`;
      const formattedValue = formatNumber(
        jsString,
        formatValue,
        thousandDelimiter,
        decimalDelimiter,
        valueFormatOptions,
      );
      const valueAsNumber = parseFloat(jsString);
      const resultValue = Number.isNaN(valueAsNumber)
        ? defaultValue
        : valueAsNumber;
      setDisplayValue(formattedValue);
      setLocalValue(resultValue);
      onChange && onChange(resultValue ?? null);
    },
    [
      formatValue,
      thousandDelimiter,
      decimalDelimiter,
      valueFormatOptions,
      defaultValue,
      onChange,
    ],
  );

  // Stepper output is already a clean number — format it directly for display.
  // antd parity: a step fires both onChange (new value) and onStep (value + offset/direction).
  const commitStep = useCallback(
    (next: number, info: { offset: number; type: 'up' | 'down' }): void => {
      setDisplayValue(formatter(next));
      setLocalValue(next);
      onChange && onChange(next);
      onStep && onStep(next, info);
    },
    [formatter, onChange, onStep],
  );

  // The antd `precision` prop is gone — stepped values round to the larger of the step's own decimals
  // and valueFormatOptions.maximumFractionDigits (defaults to 0 → integer steps). useStepper adds the
  // step's decimals on top of this format-driven floor.
  const precision = valueFormatOptions?.maximumFractionDigits;

  const {
    step: stepOnce,
    startStep,
    stopStep,
    upDisabled,
    downDisabled,
  } = useStepper({
    value: localValue,
    step,
    min,
    max,
    precision,
    disabled,
    readOnly,
    onStep: commitStep,
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      // Forward to the consumer first, then run the arrow-key stepping.
      onKeyDown && onKeyDown(event);
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        stepOnce(1, event.shiftKey);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        stepOnce(-1, event.shiftKey);
      }
    },
    [stepOnce, onKeyDown],
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLInputElement>): void => {
      // Forward to the consumer first (they may inspect / preventDefault), then apply the
      // numeric-only key filter — preserving the bare-component behavior when no handler is passed.
      onKeyPress && onKeyPress(event);
      if (!NUMERIC_KEY.test(event.key)) {
        event.preventDefault();
      }
    },
    [onKeyPress],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>): void => {
      // antd / rc-input-number parity: on blur, re-align an out-of-range value to
      // the nearest bound. rc-input-number does this in `flushInputValue(false)` →
      // `triggerValueUpdate(value, userTyping=false)` → `getRangeValue` (target >
      // max ⇒ max, target < min ⇒ min). Typing itself is never clamped
      // (`userTyping=true`), so this only fires once editing ends.
      // Only re-align a real, finite number. An empty field — `''` from a cleared
      // controlled input (react-final-form gives `value=''`), `null`, `undefined`
      // or `NaN` — is left untouched, matching antd's `isEmpty` skip in
      // `triggerValueUpdate`. Without this, `'' < min` coerces to `0 < min` and a
      // cleared field snaps to `min` instead of staying empty (placeholder).
      if (typeof localValue === 'number' && Number.isFinite(localValue)) {
        let clamped = localValue;
        if (max !== undefined && clamped > max) {
          clamped = max;
        }
        if (min !== undefined && clamped < min) {
          clamped = min;
        }
        if (clamped !== localValue) {
          setLocalValue(clamped);
          setDisplayValue(formatter(clamped));
          onChange && onChange(clamped);
        }
      }
      onBlur && onBlur(event);
    },
    [localValue, min, max, formatter, onChange, onBlur],
  );

  const stretchToFit =
    autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);

  // Autosize: measure the displayed value with a hidden sizer and write the
  // resulting width (plus AUTOSIZE_EXTRA_WIDTH, which reserves room for the
  // steppers) onto the control wrapper.
  const { sizerRef, containerRef } = useAutosizeWidth<HTMLDivElement>({
    value: displayValue,
    placeholder,
    extraWidth: AUTOSIZE_EXTRA_WIDTH,
    placeholderIsMinWidth: autoResizeProps?.placeholderIsMinWidth,
    inputRef,
  });

  const handleStretchBefore = useCallback(() => {
    scrollLeftRef.current = inputRef.current?.scrollLeft || 0;
  }, []);
  const handleStretchAfter = useCallback(() => {
    inputRef.current && inputRef.current.scrollTo(scrollLeftRef.current, 0);
  }, []);
  // stretchToFit clamps the wrapper's max-width to the available width (identity
  // getMaxWidth — the wrapper is border-box, matching the legacy behaviour).
  const { outerRef } = useStretchToFit<HTMLDivElement>({
    enabled: !!stretchToFit,
    targetRef: containerRef,
    onBeforeResize: handleStretchBefore,
    onAfterResize: handleStretchAfter,
  });

  const showHandlers = !disabled && !readOnly;
  const isLarge = size === 'large';

  const hasPrefix = prefixel !== undefined && prefixel !== null;
  const hasSuffix = suffixel !== undefined && suffixel !== null;

  const numberCore = (
    <S.InputNumberRoot
      className={cx(
        'ds-input-number',
        isLarge && 'ds-input-number-lg',
        showError && 'error',
      )}
      $error={showError}
      $disabled={disabled}
      $size={size}
      $hasPrefix={hasPrefix}
      $hasSuffix={hasSuffix}
    >
      {showHandlers && (
        <S.HandlerWrap className="ds-input-number-handler-wrap">
          <S.HandlerUp
            role="button"
            aria-label="Increase Value"
            className="ds-input-number-handler ds-input-number-handler-up"
            $disabled={upDisabled}
            onMouseDown={(event) => {
              event.preventDefault();
              startStep(1, event.shiftKey);
            }}
            onMouseUp={stopStep}
            onMouseLeave={stopStep}
          />
          <S.HandlerDown
            role="button"
            aria-label="Decrease Value"
            className="ds-input-number-handler ds-input-number-handler-down"
            $disabled={downDisabled}
            onMouseDown={(event) => {
              event.preventDefault();
              startStep(-1, event.shiftKey);
            }}
            onMouseUp={stopStep}
            onMouseLeave={stopStep}
          />
        </S.HandlerWrap>
      )}
      <S.InputFieldWrap className="ds-input-number-input-wrap" $size={size}>
        <S.InputField
          {...rest}
          ref={inputRef}
          type="text"
          inputMode={inputMode ?? 'decimal'}
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={localValue ?? undefined}
          id={id}
          name={name}
          className="ds-input-number-input"
          autoComplete="off"
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          value={displayValue}
          $autoResize={autoResize}
          onChange={(event) => handleInputChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
        />
      </S.InputFieldWrap>
    </S.InputNumberRoot>
  );

  const withAddons =
    hasPrefix || hasSuffix ? (
      <S.GroupWrapper className="ds-input-number-group-wrapper">
        <S.Group className="ds-input-number-group">
          {hasPrefix && (
            <S.Addon className="ds-input-number-group-addon">
              {prefixel}
            </S.Addon>
          )}
          {numberCore}
          {hasSuffix && (
            <S.Addon className="ds-input-number-group-addon">
              {suffixel}
            </S.Addon>
          )}
        </S.Group>
      </S.GroupWrapper>
    ) : (
      numberCore
    );

  const rawInput = (
    <S.InputNumberWrapper
      ref={containerRef}
      style={style}
      className={className}
    >
      {withAddons}
    </S.InputNumberWrapper>
  );

  const autoSizeInput = (
    <S.InputNumberAutosize
      ref={outerRef}
      $autoResize={autoResize}
      className={autoResizeProps?.wrapperClassName}
      style={autoResizeProps?.wrapperStyle}
    >
      {rawInput}
      <span ref={sizerRef} style={SIZER_STYLE} aria-hidden />
    </S.InputNumberAutosize>
  );

  if (raw) {
    return <S.InputNumberContainer>{rawInput}</S.InputNumberContainer>;
  }
  return (
    <S.InputNumberContainer>
      <FormField
        id={id}
        label={label}
        tooltip={tooltip}
        tooltipConfig={tooltipConfig}
        description={description}
        errorText={errorText}
      >
        {autoResize ? autoSizeInput : rawInput}
      </FormField>
    </S.InputNumberContainer>
  );
};

export default InputNumber;
