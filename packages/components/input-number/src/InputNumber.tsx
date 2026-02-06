import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { v4 as uuid } from 'uuid';

import { useDataFormat } from '@synerise/ds-core';
import '@synerise/ds-core/dist/js/style';
import FormField from '@synerise/ds-form-field';
import { AutosizeWrapper } from '@synerise/ds-input';
import { useResizeObserver } from '@synerise/ds-utils';

import * as S from './InputNumber.styles';
import { type InputNumberProps } from './InputNumber.types';
import './style/index.less';
import { formatNumber, parseFormattedNumber } from './utils/inputNumber.utils';

const AUTOSIZE_EXTRA_WIDTH = 45;

const InputNumber = ({
  label,
  description,
  errorText,
  raw,
  error,
  prefixel,
  suffixel,
  style,
  tooltip,
  tooltipConfig,
  value,
  defaultValue,
  valueFormatOptions,
  onChange,
  autoResize,
  autoResizeProps,
  ...antdProps
}: InputNumberProps) => {
  const { formatValue, thousandDelimiter, decimalDelimiter } = useDataFormat();
  const [displayValue, setDisplayValue] = useState('');
  const [localValue, setLocalValue] = useState<number | null | undefined>(
    value ?? defaultValue,
  );
  const antdInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputNumberRef = useRef<HTMLElement | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    if (value !== undefined && value !== localValue) {
      setLocalValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const id = useMemo(() => uuid(), []);
  const showError = Boolean(error || errorText);

  const formatter = useCallback(
    (inputValue: string | number | null | undefined): string => {
      const formatted = formatNumber(
        inputValue,
        formatValue,
        thousandDelimiter,
        decimalDelimiter,
        valueFormatOptions,
      );
      return formatted;
    },
    [formatValue, valueFormatOptions, thousandDelimiter, decimalDelimiter],
  );

  const parser = useCallback(
    (inputValue: string | undefined): number => {
      return parseFloat(
        `${parseFormattedNumber(inputValue, formatValue, thousandDelimiter, decimalDelimiter)}`,
      );
    },
    [formatValue, thousandDelimiter, decimalDelimiter],
  );

  const handleOnChange = useCallback(
    (changedValue: string | number | null): void => {
      const formattedValue = formatter(changedValue);
      const parsedFormattedValue = parser(formattedValue);
      const valueAsNumber =
        typeof parsedFormattedValue === 'string'
          ? parseFloat(parsedFormattedValue)
          : parsedFormattedValue;
      const resultValue = Number.isNaN(valueAsNumber)
        ? defaultValue
        : valueAsNumber;
      setDisplayValue(formattedValue);
      setLocalValue(resultValue);
      onChange && onChange(resultValue ?? null);
    },
    [formatter, parser, defaultValue, onChange],
  );

  useEffect(() => {
    const input = antdInputRef.current;
    const cancelNonNumeric = (event: KeyboardEvent) => {
      if (!/^-?\d*(\.|,)?\d*$/i.test(event.key)) {
        event.preventDefault();
      }
    };
    if (input) {
      input.addEventListener('keypress', cancelNonNumeric);
    }
    return () => {
      if (input) {
        input.removeEventListener('keypress', cancelNonNumeric);
      }
    };
  });

  const stretchToFit =
    autoResize && autoResize !== true && Boolean(autoResize.stretchToFit);

  const handlePreAutosize = useCallback(() => {
    scrollLeftRef.current = inputRef.current?.scrollLeft || 0;
    inputNumberRef.current &&
      inputNumberRef.current.style.removeProperty('max-width');
  }, []);

  const handleAutosize = useCallback(() => {
    const parentRect =
      elementRef.current && elementRef.current.getBoundingClientRect();
    if (stretchToFit && inputNumberRef.current && parentRect?.width) {
      inputNumberRef.current.style.maxWidth = `${parentRect?.width}px`;
      inputRef.current && inputRef.current.scrollTo(scrollLeftRef.current, 0);
    }
  }, [stretchToFit]);

  const handleWrapperToResize = useCallback(() => {
    handlePreAutosize();
    handleAutosize();
  }, [handleAutosize, handlePreAutosize]);

  const transformRef = useCallback((element: HTMLElement) => {
    inputNumberRef.current = element as HTMLDivElement;
    return element.querySelector('input') as HTMLInputElement;
  }, []);

  useResizeObserver(elementRef, handleWrapperToResize);

  const rawInput = (
    <S.InputNumberWrapper style={style}>
      <S.AntdInputNumber
        {...antdProps}
        ref={antdInputRef}
        onChange={handleOnChange}
        addonBefore={prefixel}
        addonAfter={suffixel}
        id={id}
        error={showError}
        className={showError ? 'error' : undefined}
        autoComplete="off"
        formatter={formatter}
        parser={parser}
        defaultValue={defaultValue}
        value={localValue}
        decimalSeparator={decimalDelimiter}
      />
    </S.InputNumberWrapper>
  );

  const autoSizeInput = (
    <S.InputNumberAutosize ref={elementRef} autoResize={autoResize}>
      <AutosizeWrapper
        {...autoResizeProps}
        extraWidth={AUTOSIZE_EXTRA_WIDTH}
        autoResize={!!autoResize}
        value={displayValue}
        transformRef={transformRef}
        preAutosize={handlePreAutosize}
        onAutosize={handleAutosize}
      >
        {rawInput}
      </AutosizeWrapper>
    </S.InputNumberAutosize>
  );

  if (raw) {
    return <S.InputNumberContainer>{rawInput}</S.InputNumberContainer>;
  }
  return (
    <S.InputNumberContainer autoResize={autoResize}>
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
