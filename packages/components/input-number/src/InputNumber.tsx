import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';
import { Label } from '@synerise/ds-input';
import { useDataFormat } from '@synerise/ds-data-format';

import './style/index.less';
import * as S from './InputNumber.styles';
import { InputNumberProps } from './InputNumber.types';
import { formatNumber, parseFormattedNumber } from './utils/inputNumber.utils';

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
  ...antdProps
}: InputNumberProps) => {
  const { formatValue, thousandDelimiter, decimalDelimiter } = useDataFormat();
  const [localValue, setLocalValue] = useState<number | null | undefined>(value ?? defaultValue);
  const antdInputRef = useRef<HTMLInputElement>(null);

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
      const formatted = formatNumber(inputValue, formatValue, thousandDelimiter, decimalDelimiter, valueFormatOptions);
      return formatted;
    },
    [formatValue, valueFormatOptions, thousandDelimiter, decimalDelimiter]
  );

  const parser = useCallback(
    (inputValue: string | undefined): number => {
      return parseFloat(`${parseFormattedNumber(inputValue, formatValue, thousandDelimiter, decimalDelimiter)}`);
    },
    [formatValue, thousandDelimiter, decimalDelimiter]
  );

  const handleOnChange = useCallback(
    (changedValue: string | number | null): void => {
      const formattedValue = formatter(changedValue);
      const parsedFormattedValue = parser(formattedValue);
      const valueAsNumber =
        typeof parsedFormattedValue === 'string' ? parseFloat(parsedFormattedValue) : parsedFormattedValue;
      const resultValue = Number.isNaN(valueAsNumber) ? defaultValue : valueAsNumber;
      setLocalValue(resultValue);
      onChange && onChange(resultValue ?? null);
    },
    [formatter, parser, defaultValue, onChange]
  );

  useEffect(() => {
    const input = antdInputRef.current;
    const cancelNonNumeric = (event: KeyboardEvent) => {
      if (!/^\d*(\.|,)?\d*$/i.test(event.key)) {
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

  return (
    <S.InputNumberContainer>
      {label && !raw && (
        <S.ContentAbove>
          <Label id={id} label={label} tooltip={tooltip} tooltipConfig={tooltipConfig} />
        </S.ContentAbove>
      )}
      <S.InputNumberWrapper prefixel={!!prefixel} suffixel={!!suffixel} style={style}>
        {!!prefixel && <S.Prefixel>{prefixel}</S.Prefixel>}
        <S.AntdInputNumber
          {...antdProps}
          ref={antdInputRef}
          onChange={handleOnChange}
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
        {!!suffixel && <S.Suffixel>{suffixel}</S.Suffixel>}
      </S.InputNumberWrapper>
      {(showError || description) && !raw && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </S.InputNumberContainer>
  );
};

export default InputNumber;
