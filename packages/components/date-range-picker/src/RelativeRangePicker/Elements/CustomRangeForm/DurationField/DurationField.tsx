import * as React from 'react';
import Select from '@synerise/ds-select';
import InputNumber from '@synerise/ds-input-number';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import * as S from '../../../RelativeRangePicker.styles';
import * as CONST from '../../../../constants';
import { Props } from './DurationField.types';

export const setDurationType = set(lensPath(['duration', 'type']));
const SELECT_DROPDOWN_OFFSET = -4;
const DurationField: React.FC<Props> = ({ currentRange, handleChange, handleDurationValueChange, intl }) => {
  const { duration } = currentRange;

  return (
    <>
      <S.InputSelectGroup compact>
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
          raw
        />
        <Select
          value={duration.type}
          onChange={(type): void => handleChange(setDurationType(type, currentRange))}
          dropdownAlign={{ points: ['bl', 'tl'], offset: [0, SELECT_DROPDOWN_OFFSET] }}
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

export default DurationField;
