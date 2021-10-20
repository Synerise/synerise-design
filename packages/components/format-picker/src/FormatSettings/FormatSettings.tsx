import * as React from 'react';
import Icon, { AngleDownS, Coin2M, CommaDecM, CommaIncM, HashM, PercentM } from '@synerise/ds-icon';
import { IntlShape, useIntl } from 'react-intl';
import { Title } from '@synerise/ds-typography';
import Tooltip from '@synerise/ds-tooltip';
import Radio from '@synerise/ds-radio';
import ButtonGroup from '@synerise/ds-button-group';
import Button from '@synerise/ds-button';
import Checkbox from '@synerise/ds-checkbox';
import Dropdown from '@synerise/ds-dropdown';
import * as S from './FormatSettings.styles';
import { CurrencyConfig, FormatPickerTexts, FormattingType } from '../FomartPicker.types';
import { FormatSettingsProps } from './FormatSettings.types';
import { valueFormatter } from '../utils/valueFormatter';

const getFormattingTypes = (intl: IntlShape, text: FormatPickerTexts): FormattingType[] => [
  {
    format: 'numeric',
    icon: <HashM />,
    tooltip: text?.numeric,
  },
  {
    format: 'percent',
    icon: <PercentM />,
    tooltip: text?.percentage,
  },
  {
    format: 'cash',
    icon: <Coin2M />,
    tooltip: text?.cash,
  },
];

const getCurrenciesConfig = (currenciesConfig: CurrencyConfig[]): CurrencyConfig[] => [
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
  ...currenciesConfig,
];

const FormatSettings: React.FC<FormatSettingsProps> = ({
  onCompactNumbersChange,
  onCurrencyChange,
  onDataFormatChange,
  onFixedLengthChange,
  onUseSeparatorChange,
  onSetDefault,
  format,
  value,
  text,
  currenciesConfig,
}) => {
  const intl = useIntl();
  const handleDecreaseFixedLength = React.useCallback(() => {
    if (format.fixedLength > 0) {
      onFixedLengthChange(format.fixedLength - 1);
    } else {
      onFixedLengthChange(0);
    }
  }, [onFixedLengthChange, format]);

  const handleIncreaseFixedLength = React.useCallback(() => {
    onFixedLengthChange(format.fixedLength + 1);
  }, [onFixedLengthChange, format]);

  const selectedCurrency = React.useMemo(() => {
    return getCurrenciesConfig(currenciesConfig || []).find(currency => currency.currency === format.currency);
  }, [currenciesConfig, format]);

  return (
    <S.FormatSettingsContainer>
      <S.FormatSettingsWrapper>
        <Title level={6}>{text?.header}</Title>
        <S.FormatSettings>
          <Radio.Group defaultValue={format.dataFormat} onChange={(e): void => onDataFormatChange(e.target.value)}>
            <ButtonGroup>
              {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
              {getFormattingTypes(intl, text!).map(type => (
                <Tooltip key={type.format} trigger={['hover']} title={type.tooltip}>
                  <Button
                    type={type.format === format.dataFormat ? 'primary' : 'secondary'}
                    mode="icon"
                    onClick={(): void => onDataFormatChange(type.format)}
                  >
                    <Icon component={type.icon} />
                  </Button>
                </Tooltip>
              ))}
            </ButtonGroup>
          </Radio.Group>
          <ButtonGroup buttonsPosition="right">
            <S.FixedLengthButton type="secondary" mode="icon" onClick={handleDecreaseFixedLength}>
              <Icon component={<CommaDecM />} />
            </S.FixedLengthButton>
            <S.FixedLengthButton type="secondary" mode="icon" onClick={handleIncreaseFixedLength}>
              <Icon component={<CommaIncM />} />
            </S.FixedLengthButton>
          </ButtonGroup>
        </S.FormatSettings>
        <S.FormatOptions>
          {format.dataFormat === 'cash' && (
            <Dropdown
              trigger={['click']}
              overlay={
                <S.DropdownWrapper>
                  {getCurrenciesConfig(currenciesConfig || []).map(({ currency, label }) => (
                    <S.MenuItem
                      key={currency}
                      suffixel={valueFormatter({ value, formatting: { ...format, currency }, intl })}
                      onClick={(): void => onCurrencyChange(currency)}
                    >
                      {label}
                    </S.MenuItem>
                  ))}
                </S.DropdownWrapper>
              }
            >
              <S.DropdownTrigger>
                <S.DropdownValue>{selectedCurrency?.label}</S.DropdownValue>
                <Icon component={<AngleDownS />} />
              </S.DropdownTrigger>
            </Dropdown>
          )}
          <Checkbox onChange={(e): void => onUseSeparatorChange(e.target.checked)} checked={format.useSeparator}>
            {text?.useSeparator}
          </Checkbox>
          <Checkbox onChange={(e): void => onCompactNumbersChange(e.target.checked)} checked={format.compactNumbers}>
            {text?.compactNumbers}
          </Checkbox>
        </S.FormatOptions>
      </S.FormatSettingsWrapper>
      <S.FormatFooter>
        <Button type="ghost" onClick={onSetDefault}>
          {text?.setDefault}
        </Button>
      </S.FormatFooter>
    </S.FormatSettingsContainer>
  );
};

export default FormatSettings;
