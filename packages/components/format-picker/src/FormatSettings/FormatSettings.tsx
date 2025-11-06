import React, { useCallback, useMemo } from 'react';
import { type IntlShape, useIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Checkbox from '@synerise/ds-checkbox';
import Dropdown from '@synerise/ds-dropdown';
import Icon, {
  AngleDownS,
  Coin2M,
  CommaDecM,
  CommaIncM,
  HashM,
  PercentM,
} from '@synerise/ds-icon';
import Radio from '@synerise/ds-radio';
import Tooltip from '@synerise/ds-tooltip';
import { Title } from '@synerise/ds-typography';

import {
  type FormatPickerTexts,
  type FormattingType,
} from '../FomartPicker.types';
import * as S from './FormatSettings.styles';
import { type FormatSettingsProps } from './FormatSettings.types';

const DEFAULT_CURRENCIES_CONFIG = [
  {
    currency: 'USD',
    label: 'Dollar (US)',
  },
  {
    currency: 'EUR',
    label: 'Euro (EU)',
  },
  {
    currency: 'PLN',
    label: 'Złoty (PL)',
  },
  {
    currency: 'JPY',
    label: 'Yen (JP)',
  },
];

const getFormattingTypes = (
  intl: IntlShape,
  text: FormatPickerTexts,
): FormattingType[] => [
  {
    format: 'numeric',
    icon: <HashM />,
    tooltip: text.numeric,
  },
  {
    format: 'percent',
    icon: <PercentM />,
    tooltip: text.percentage,
  },
  {
    format: 'cash',
    icon: <Coin2M />,
    tooltip: text.cash,
  },
];

const FormatSettings = ({
  onCompactNumbersChange,
  onCurrencyChange,
  onDataFormatChange,
  onFixedLengthChange,
  onUseSeparatorChange,
  onSetDefault,
  getFormattedValue,
  format,
  text,
  currenciesConfig = DEFAULT_CURRENCIES_CONFIG,
  disabled,
  maxFixedLength,
}: FormatSettingsProps) => {
  const intl = useIntl();

  const handleSelectCurrency = (currency: string) => {
    onCurrencyChange(currency);
  };

  const handleDecreaseFixedLength = useCallback(() => {
    if (format.fixedLength > 0) {
      onFixedLengthChange(format.fixedLength - 1);
    } else {
      onFixedLengthChange(0);
    }
  }, [onFixedLengthChange, format]);

  const handleIncreaseFixedLength = useCallback(() => {
    if (maxFixedLength === undefined || maxFixedLength > format.fixedLength) {
      onFixedLengthChange(format.fixedLength + 1);
    }
  }, [onFixedLengthChange, format, maxFixedLength]);

  const selectedCurrency = useMemo(() => {
    return currenciesConfig.find(
      (currency) => currency.currency === format.currency,
    );
  }, [currenciesConfig, format]);

  return (
    <S.FormatSettingsContainer data-testid="ds-format-picker-overlay">
      <S.FormatSettingsWrapper>
        <Title level={6}>{text.header}</Title>
        <S.FormatSettings>
          <Radio.Group
            defaultValue={format.dataFormat}
            onChange={(event): void => onDataFormatChange(event.target.value)}
          >
            <ButtonGroup>
              {getFormattingTypes(intl, text).map((type) => (
                <Tooltip
                  key={type.format}
                  trigger={['hover']}
                  title={type.tooltip}
                >
                  <Button
                    type={
                      type.format === format.dataFormat
                        ? 'primary'
                        : 'secondary'
                    }
                    mode="icon"
                    data-testid={`ds-format-picker-type-${type.format}`}
                    onClick={() => onDataFormatChange(type.format)}
                    disabled={disabled}
                  >
                    <Icon component={type.icon} />
                  </Button>
                </Tooltip>
              ))}
            </ButtonGroup>
          </Radio.Group>
          <S.WrapperButtons buttonsPosition="right">
            <S.FixedLengthButton
              type="secondary"
              mode="icon"
              onClick={handleDecreaseFixedLength}
              disabled={disabled}
            >
              <Icon component={<CommaDecM />} />
            </S.FixedLengthButton>
            <S.FixedLengthButton
              type="secondary"
              mode="icon"
              onClick={handleIncreaseFixedLength}
              disabled={disabled}
            >
              <Icon component={<CommaIncM />} />
            </S.FixedLengthButton>
          </S.WrapperButtons>
        </S.FormatSettings>
        <S.FormatOptions>
          {format.dataFormat === 'cash' && (
            <Dropdown
              trigger={['click']}
              disabled={disabled}
              hideOnItemClick
              popoverProps={{
                testId: 'format-picker-settings',
              }}
              asChild
              size="match-trigger"
              overlay={
                <S.DropdownWrapper>
                  {currenciesConfig.map(({ currency, label }) => (
                    <S.ListItem
                      key={currency}
                      suffixel={`${text.currencyMenuItemPrefix} ${getFormattedValue({ currency })}`}
                      onClick={() => {
                        handleSelectCurrency(currency);
                      }}
                    >
                      {label}
                    </S.ListItem>
                  ))}
                </S.DropdownWrapper>
              }
            >
              <S.DropdownTrigger data-testid="ds-format-picker-currency-trigger">
                <S.DropdownValue>{selectedCurrency?.label}</S.DropdownValue>
                <Icon component={<AngleDownS />} />
              </S.DropdownTrigger>
            </Dropdown>
          )}
          <Checkbox
            onChange={(event) => onUseSeparatorChange(event.target.checked)}
            checked={format.useSeparator}
            disabled={disabled}
          >
            {text.useSeparator}
          </Checkbox>
          <Checkbox
            onChange={(event) => onCompactNumbersChange(event.target.checked)}
            checked={format.compactNumbers}
            disabled={disabled}
          >
            {text.compactNumbers}
          </Checkbox>
        </S.FormatOptions>
      </S.FormatSettingsWrapper>
      {onSetDefault && (
        <S.FormatFooter>
          <Button
            data-testid="ds-format-picker-default-trigger"
            type="ghost"
            onClick={onSetDefault}
            disabled={disabled}
          >
            {text.setDefault}
          </Button>
        </S.FormatFooter>
      )}
    </S.FormatSettingsContainer>
  );
};

export default FormatSettings;
