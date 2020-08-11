import * as React from 'react';
import Select from '@synerise/ds-select';
import InputNumber from '@synerise/ds-input-number';
import * as S from '../../../RelativeRangePicker.styles';
import * as CONST from '../../../../constants';
import { DURATION_MODIFIERS } from '../../../../constants';
import { Props } from './TimestampDuration.types';

const DROPDOWN_PADDING = 16;
const SELECT_DROPDOWN_OFFSET = 6;
const SELECT_OPTION_HEIGHT = 32;
const SELECT_HEIGHT = 30;
const TimestampDuration: React.FC<Props> = ({
  handleDurationValueChange,
  intl,
  durationModifier,
  onDurationModifierChange,
  value,
  onDurationUnitChange,
  unit,
}) => {
  const durationModiferValues = Object.values(DURATION_MODIFIERS);
  const selectDropdownOffset = React.useMemo(
    () =>
      durationModiferValues && durationModiferValues.length
        ? -(durationModiferValues.length * SELECT_OPTION_HEIGHT + DROPDOWN_PADDING + SELECT_DROPDOWN_OFFSET + SELECT_HEIGHT)
        : 0,
    [durationModiferValues]
  );
  return (
    <>
      <S.Title>
        {intl.formatMessage({
          id: 'DS.DATE-RANGE-PICKER.TIMESTAMP_TILL',
        })}
      </S.Title>
      <S.InputSelectGroup compact>
        <Select
          className="ds-select-duration-type"
          value={durationModifier}
          onChange={(modifier): void => {
            onDurationModifierChange(modifier as string);
          }}
          dropdownStyle={{ minWidth: '125px' }}
          dropdownAlign={{ offset: [0, selectDropdownOffset] }}
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
          onChange={(type): void => onDurationUnitChange(type as string)}
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
