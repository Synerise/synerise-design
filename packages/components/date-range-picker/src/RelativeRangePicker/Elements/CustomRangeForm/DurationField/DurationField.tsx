import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import React, { useEffect } from 'react';

import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';

import { type Texts } from '../../../../DateRangePicker.types';
import {
  RANGES_MODE,
  RELATIVE_DURATION_MAX,
  RELATIVE_UNITS,
} from '../../../../constants';
import { type RelativeUnits } from '../../../../date.types';
import * as S from '../../../RelativeRangePicker.styles';
import { type Props } from './DurationField.types';

export const setDurationType = set(lensPath(['duration', 'type']));
const SELECT_DROPDOWN_OFFSET = -4;
const DurationField = ({
  currentGroup,
  currentRange,
  handleChange,
  handleDurationValueChange,
  rangeUnits,
  texts,
}: Props) => {
  const { duration } = currentRange;
  useEffect(() => {
    if (duration?.value < 1) {
      handleDurationValueChange(1);
    }
  }, [duration, handleDurationValueChange]);
  return (
    <>
      <S.Title>
        {currentGroup === RANGES_MODE.PAST ? texts.last : texts.next}
      </S.Title>
      <S.InputSelectGroup compact>
        <InputNumber
          min={1}
          max={RELATIVE_DURATION_MAX}
          precision={0}
          step={1}
          value={duration?.value}
          onBlur={({ target: { value } }): void => {
            !value && handleDurationValueChange(1);
          }}
          onChange={handleDurationValueChange}
          raw
        />
        <Select
          value={duration?.type}
          onChange={(type): void =>
            handleChange(setDurationType(type, currentRange))
          }
          dropdownAlign={{
            points: ['bl', 'tl'],
            offset: [0, SELECT_DROPDOWN_OFFSET],
          }}
          getPopupContainer={(node): HTMLElement =>
            node.parentElement !== null ? node.parentElement : document.body
          }
        >
          {((rangeUnits || RELATIVE_UNITS) as RelativeUnits[]).map((type) => (
            <Select.Option key={type} value={type}>
              {texts[type.toLowerCase() as keyof Texts]}
            </Select.Option>
          ))}
        </Select>
      </S.InputSelectGroup>
    </>
  );
};

export default DurationField;
