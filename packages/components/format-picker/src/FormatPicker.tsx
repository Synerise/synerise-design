import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { HashM } from '@synerise/ds-icon';

import FormatSettings from './FormatSettings/FormatSettings';
import { valueFormatter } from './utils/valueFormatter';

import { FormatPickerProps, FormatPickerTexts } from './FomartPicker.types';

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
}: FormatPickerProps) => {
  const intl = useIntl();

  const texts: FormatPickerTexts = useMemo(
    () => ({
      header: intl.formatMessage({ id: 'DS.FORMAT-PICKER.HEADER', defaultMessage: 'Number format' }),
      format: intl.formatMessage({ id: 'DS.FORMAT-PICKER.FORMAT', defaultMessage: 'Format' }),
      numeric: intl.formatMessage({ id: 'DS.FORMAT-PICKER.NUMERIC', defaultMessage: 'Numeric' }),
      cash: intl.formatMessage({ id: 'DS.FORMAT-PICKER.CASH', defaultMessage: 'Cash' }),
      percentage: intl.formatMessage({ id: 'DS.FORMAT-PICKER.PERCENTAGE', defaultMessage: 'Percentage' }),
      setDefault: intl.formatMessage({ id: 'DS.FORMAT-PICKER.SET-DEFAULT', defaultMessage: 'Set default' }),
      useSeparator: intl.formatMessage({ id: 'DS.FORMAT-PICKER.USE-SEPARATOR', defaultMessage: 'Use 1000 separator' }),
      compactNumbers: intl.formatMessage({
        id: 'DS.FORMAT-PICKER.COMPACT-NUMBERS',
        defaultMessage: 'Use compact numbers',
      }),
      ...text,
    }),
    [text, intl]
  );

  const formattedValue = useMemo(() => {
    return valueFormatter({ value, formatting: format, intl });
  }, [value, format, intl]);

  useEffect(() => {
    onFormattedValueChange && onFormattedValueChange(formattedValue);
  }, [formattedValue, onFormattedValueChange]);

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
          value={value}
          text={texts}
          currenciesConfig={currenciesConfig}
          disabled={disabled}
        />
      }
      placement="topCenter"
    >
      <Button type={buttonType} mode="icon-label" disabled={disabled}>
        <Icon component={<HashM />} />
        {`${texts.format} ${formattedValue}`}
      </Button>
    </Dropdown>
  );
};
export default FormatPicker;
