import { type SizeType } from 'antd/es/config-provider/SizeContext';
import React from 'react';

import { InputGroup } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';

import { type Period } from '../CompletedWithin.types';
import * as S from './Settings.styles';
import { type SettingsProps } from './Settings.types';

const Settings = ({
  value,
  text,
  onPeriodChange,
  onValueChange,
  periods,
  maxValue,
  readOnly,
}: SettingsProps) => {
  return (
    <S.Settings data-testid="completed-within-dropdown">
      <InputGroup size="default" label={text.header} resetMargin compact>
        <InputNumber
          size="small"
          raw
          readOnly={readOnly}
          value={value.value}
          onChange={onValueChange}
          min={0}
          max={maxValue ?? Number.MAX_SAFE_INTEGER}
        />
        <Select
          // readOnly={readOnly} - STOR-1872: add readOnly prop to select
          size={'default' as SizeType}
          value={value.period}
          placeholder={text.periodPlaceholder}
          onChange={(option): void => {
            onPeriodChange(option as Period);
          }}
          dropdownStyle={{ minWidth: '150px' }}
        >
          {periods.map((period) => (
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
