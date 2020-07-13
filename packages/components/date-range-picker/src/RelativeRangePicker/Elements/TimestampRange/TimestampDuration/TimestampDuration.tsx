import * as React from 'react';
import Select from '@synerise/ds-select';
import InputNumber from '@synerise/ds-input-number';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import * as S from '../../../RelativeRangePicker.styles';
import * as CONST from '../../../../constants';
import { DURATION_MODIFIERS } from '../../../../constants';
import { Props } from './TimestampDuration.types';

export const setDurationType = set(lensPath(['duration', 'type']));

const TimestampDuration: React.FC<Props> = ({
  handleDurationValueChange,
  intl,
  durationModifier,
  onDurationModifierChange,
  value,
  onDurationUnitChange,
  unit
}) => {
  const durationModiferValues = Object.values(DURATION_MODIFIERS);
  return (
    <>
      <S.Title>
        {intl.formatMessage({
          id: 'DS.DATE-RANGE-PICKER.TIMESTAMP_TILL',
        })}
      </S.Title>
      <S.InputSelectGroup>
        <Select
          className="ds-select-duration-type"
          value={durationModifier}
          onChange={(modifier): void => {
            onDurationModifierChange(modifier as string);
          }}
          dropdownStyle={{ minWidth: '125px' }}
        >
          {durationModiferValues.map(modifier => (
            <Select.Option key={modifier} value={modifier}>
              {intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.${modifier.toUpperCase()}` })}
            </Select.Option>
          ))}
        </Select>
        <InputNumber
          min={1}
          max={CONST.RELATIVE_DURATION_MAX}
          precision={0}
          step={1}
          value={value}
          onChange={handleDurationValueChange}
        />
        <Select
          value={unit}
          dropdownStyle={{ minWidth: '125px' }}
          onChange={(type): void => onDurationUnitChange(type) }
        >
          {CONST.RELATIVE_TYPES.map(type => (
            <Select.Option key={type} value={type}>
              {intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.${type.toUpperCase()}` })}
            </Select.Option>
          ))}
        </Select>
      </S.InputSelectGroup>
    </>
  );
};

export default TimestampDuration;
