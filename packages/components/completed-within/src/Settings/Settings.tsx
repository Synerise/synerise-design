import * as React from 'react';
import { InputGroup } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { SettingsProps } from './Settings.types';
import * as S from './Settings.styles';
import { Period } from '../CompletedWithin.types';

const Settings: React.FC<SettingsProps> = ({ value, text, onPeriodChange, onValueChange, periods, maxValue }) => {
  return (
    <S.Settings>
      <InputGroup size="default" label={text.header} resetMargin compact>
        <InputNumber
          size="small"
          raw
          value={value.value}
          onChange={onValueChange}
          min={0}
          max={maxValue || Number.MAX_SAFE_INTEGER}
        />
        <Select
          size={'default' as SizeType}
          value={value.period}
          placeholder={text.periodPlaceholder}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          onChange={(option: Period): void => {
            onPeriodChange(option);
          }}
          dropdownStyle={{ minWidth: '150px' }}
        >
          {periods.map(period => (
            <Select.Option key={period.value} value={period.value}>
              {period.label}
            </Select.Option>
          ))}
        </Select>
      </InputGroup>
    </S.Settings>
  );
};

export default Settings;
