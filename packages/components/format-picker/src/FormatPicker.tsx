import React, { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { type NumberToFormatOptions, useDataFormat } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { Close3S, HashM } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import type {
  FormatPickerProps,
  FormatPickerTexts,
} from './FomartPicker.types';
import * as S from './FormatPicker.styles';
import FormatSettings from './FormatSettings/FormatSettings';

const FormatPicker = ({
  onUseSeparatorChange,
  onFixedLengthChange,
  onDataFormatChange,
  onCurrencyChange,
  onCompactNumbersChange,
  onSetDefault,
  onFormattedValueChange,
  value,
  format,
  text,
  currenciesConfig,
  buttonType = 'tertiary',
  disabled,
  maxFixedLength,
  isEmpty = false,
  onClear,
}: FormatPickerProps) => {
  const intl = useIntl();
  const { formatValue } = useDataFormat();

  const texts: FormatPickerTexts = useMemo(
    () => ({
      header: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.HEADER',
        defaultMessage: 'Number format',
      }),
      format: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.FORMAT',
        defaultMessage: 'Format',
      }),
      numeric: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.NUMERIC',
        defaultMessage: 'Numeric',
      }),
      cash: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.CASH',
        defaultMessage: 'Cash',
      }),
      percentage: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.PERCENTAGE',
        defaultMessage: 'Percentage',
      }),
      setDefault: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.SET-DEFAULT',
        defaultMessage: 'Set default',
      }),
      useSeparator: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.USE-SEPARATOR',
        defaultMessage: 'Use 1000 separator',
      }),
      currencyMenuItemPrefix: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.EG',
        defaultMessage: 'e.g.',
      }),
      compactNumbers: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.COMPACT-NUMBERS',
        defaultMessage: 'Use compact numbers',
      }),
      placeholder: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.PLACEHOLDER',
        defaultMessage: 'Set format',
      }),
      clear: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.CLEAR',
        defaultMessage: 'Clear',
      }),
      ...text,
    }),
    [text, intl],
  );

  const getFormattedValue = useCallback(
    (overrideOptions?: NumberToFormatOptions) => {
      const {
        useSeparator,
        compactNumbers,
        currency,
        dataFormat,
        fixedLength,
      } = format;
      let options: NumberToFormatOptions = { useGrouping: useSeparator };

      if (compactNumbers) {
        options = { notation: 'compact' };
      }

      if (dataFormat === 'cash' && currency) {
        options = { ...options, currency, style: 'currency' };
      }

      if (dataFormat === 'percent') {
        options = { ...options, suffix: compactNumbers ? ' %' : '%' };
      }

      if (typeof fixedLength === 'number') {
        options = {
          ...options,
          minimumFractionDigits: fixedLength,
          maximumFractionDigits: fixedLength,
          ...overrideOptions,
        };
      }
      return formatValue(value, options);
    },
    [value, format, formatValue],
  );

  useEffect(() => {
    onFormattedValueChange && onFormattedValueChange(getFormattedValue());
  }, [getFormattedValue, onFormattedValueChange]);

  const showClear = Boolean(onClear) && !isEmpty && !disabled;

  return (
    <S.FormatPickerWrapper withClear={showClear}>
      <Dropdown
        trigger={['click']}
        disabled={disabled}
        overlay={
          <FormatSettings
            onCurrencyChange={onCurrencyChange}
            onFixedLengthChange={onFixedLengthChange}
            onDataFormatChange={onDataFormatChange}
            onCompactNumbersChange={onCompactNumbersChange}
            onUseSeparatorChange={onUseSeparatorChange}
            onSetDefault={onSetDefault}
            format={format}
            text={texts}
            currenciesConfig={currenciesConfig}
            disabled={disabled}
            getFormattedValue={getFormattedValue}
            maxFixedLength={maxFixedLength}
          />
        }
        placement="topCenter"
        popoverProps={{
          testId: 'format-picker',
        }}
        size="auto"
        asChild
      >
        <S.TriggerButton
          type={buttonType}
          mode="icon-label"
          disabled={disabled}
          data-testid="ds-format-picker-trigger"
        >
          <Icon component={<HashM />} />
          {isEmpty
            ? texts.placeholder
            : `${texts.format} ${getFormattedValue()}`}
        </S.TriggerButton>
      </Dropdown>
      {showClear && (
        <Tooltip title={texts.clear}>
          <S.ClearButton
            mode="single-icon"
            type="ghost"
            onClick={onClear}
            aria-label={texts.clear}
            data-testid="ds-format-picker-clear"
          >
            <Icon component={<Close3S />} />
          </S.ClearButton>
        </Tooltip>
      )}
    </S.FormatPickerWrapper>
  );
};
export default FormatPicker;
