import React, { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import { type NumberToFormatOptions, useDataFormat } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { HashM } from '@synerise/ds-icon';

import {
  type FormatPickerProps,
  type FormatPickerTexts,
} from './FomartPicker.types';
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

  return (
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
    >
      <Button type={buttonType} mode="icon-label" disabled={disabled}>
        <Icon component={<HashM />} />
        {`${texts.format} ${getFormattedValue()}`}
      </Button>
    </Dropdown>
  );
};
export default FormatPicker;
