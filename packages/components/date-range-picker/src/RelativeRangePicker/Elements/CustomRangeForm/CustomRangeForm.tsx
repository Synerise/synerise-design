import * as React from 'react';
import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import { GROUPS } from 'RelativeRangePicker/utils';
import { Props } from './CustomRangeForm.types';
import * as S from '../../RelativeRangePicker.styles';
import * as CONST from '../../../constants';

const setDurationType = set(lensPath(['duration', 'type']));
const setOffsetType = set(lensPath(['offset', 'type']));

const CustomRangeForm: React.FC<Props> = ({
  currentRange,
  currentGroup,
  handleDurationValueChange,
  handleOffsetValueChange,
  handleChange,
  intl,
}: Props) => {
  const { offset, duration } = currentRange;
  return (
    <S.CustomForm>
      <div>
        <S.Title>
          {intl.formatMessage({
            id: currentGroup === GROUPS.PAST ? 'DS.DATE-RANGE-PICKER.LAST' : 'DS.DATE-RANGE-PICKER.NEXT',
          })}
        </S.Title>
        <S.InputSelectGroup>
          <InputNumber
            min={1}
            max={CONST.RELATIVE_DURATION_MAX}
            precision={0}
            step={1}
            value={duration.value}
            onBlur={({ target: { value } }): void => {
              !value && handleDurationValueChange(1);
            }}
            onChange={handleDurationValueChange}
          />
          <Select value={duration.type} onChange={(type): void => handleChange(setDurationType(type, currentRange))}>
            {CONST.RELATIVE_TYPES.map(type => (
              <Select.Option key={type} value={type}>
                {intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.${type.toUpperCase()}` })}
              </Select.Option>
            ))}
          </Select>
        </S.InputSelectGroup>
      </div>
      <div>
        <S.Title>
          {intl.formatMessage({
            id: currentGroup === GROUPS.PAST ? 'DS.DATE-RANGE-PICKER.BEFORE' : 'DS.DATE-RANGE-PICKER.AFTER',
          })}
        </S.Title>
        <S.InputSelectGroup>
          <InputNumber
            min={0}
            max={CONST.RELATIVE_OFFSET_MAX}
            precision={0}
            step={1}
            value={offset.value}
            onBlur={({ target: { value } }): void => {
              !value && handleOffsetValueChange(0);
            }}
            onChange={handleOffsetValueChange}
          />
          <Select value={offset.type} onChange={(type): void => handleChange(setOffsetType(type, currentRange))}>
            {CONST.RELATIVE_TYPES.map(type => (
              <Select.Option key={type} value={type}>
                {intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.${type.toUpperCase()}` })}
              </Select.Option>
            ))}
          </Select>
        </S.InputSelectGroup>
      </div>
    </S.CustomForm>
  );
};

export default CustomRangeForm;
