import * as React from 'react';
import { InputGroup } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { SettingsProps } from './Settings.types';
import * as S from './Settings.styles';
import { Period } from '../CompletedWithin.types';

const Settings: React.FC<SettingsProps> = ({ value, texts, onPeriodChange, onValueChange, periods }) => {
  return (
    <S.Settings>
      <InputGroup size="default" label={texts.header} resetMargin compact>
        <InputNumber size="small" style={{ width: '50%' }} raw value={value.value} onChange={onValueChange} />
        <Select
          size={'default' as SizeType}
          style={{ width: '50%' }}
          defaultValue={periods[0].value}
          value={value.period}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          onChange={(option: Period): void => {
            onPeriodChange(option);
          }}
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
