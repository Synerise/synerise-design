import * as React from 'react';
import { ReactText } from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { InfoFillS } from '@synerise/ds-icon';
import { useDataFormat } from '@synerise/ds-data-format';

import './style/index.less';
import * as S from './InputNumber.styles';
import { Props } from './InputNumber.types';
import { formatNumber, parseFormattedNumber } from './utils/inputNumber.utils';

const InputNumber: React.FC<Props> = ({
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
  valueFormatOptions,
  onChange,
  ...antdProps
}) => {
  const { formatValue, thousandDelimiter, decimalDelimiter } = useDataFormat();

  const id = React.useMemo(() => uuid(), []);
  const showError = Boolean(error || errorText);

  const formatter = React.useCallback(
    (value: string | number | undefined): string => {
      return formatNumber(value, formatValue, thousandDelimiter, decimalDelimiter, valueFormatOptions);
    },
    [formatValue, valueFormatOptions, thousandDelimiter, decimalDelimiter]
  );

  const parser = React.useCallback(
    (value: string | undefined): ReactText => {
      return parseFormattedNumber(value, formatValue, thousandDelimiter, decimalDelimiter);
    },
    [formatValue, thousandDelimiter, decimalDelimiter]
  );

  const handleOnChange = React.useCallback(
    (value: string | number | undefined): void => {
      const formattedValue = formatter(value);
      const parsedFormattedValue = parser(formattedValue);
      const valueAsNumber =
        typeof parsedFormattedValue === 'string' ? parseFloat(parsedFormattedValue) : parsedFormattedValue;
      const resultValue = Number.isNaN(valueAsNumber) ? '' : valueAsNumber;
      onChange && onChange(resultValue);
    },
    [onChange, formatter, parser]
  );

  return (
    <S.InputNumberContainer>
      {label && !raw && (
        <S.ContentAbove>
          <S.Label htmlFor={id}>
            {label}
            {(tooltip || tooltipConfig) && (
              <Tooltip
                title={tooltip}
                placement="top"
                trigger="hover"
                transitionName="zoom-big-fast"
                {...tooltipConfig}
              >
                <span>
                  <Icon size={24} component={<InfoFillS />} />
                </span>
              </Tooltip>
            )}
          </S.Label>
        </S.ContentAbove>
      )}
      <S.InputNumberWrapper prefixel={!!prefixel} suffixel={!!suffixel} style={style}>
        {!!prefixel && <S.Prefixel>{prefixel}</S.Prefixel>}
        <S.AntdInputNumber
          {...antdProps}
          onChange={handleOnChange}
          id={id}
          error={showError}
          className={showError ? 'error' : undefined}
          autoComplete="off"
          formatter={formatter}
          parser={parser}
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
