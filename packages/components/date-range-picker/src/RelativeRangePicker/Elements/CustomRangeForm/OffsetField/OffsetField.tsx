import React, { useEffect } from 'react';

import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';

import {
  RANGES_MODE,
  RELATIVE_OFFSET_MAX,
  RELATIVE_UNITS,
} from '../../../../constants';
import { type RelativeUnits } from '../../../../date.types';
import * as S from '../../../RelativeRangePicker.styles';
import { setOffsetType } from '../CustomRangeForm';
import { type Props } from './OffsetField.types';

const SELECT_DROPDOWN_OFFSET = -4;
const OffsetField = ({
  handleOffsetValueChange,
  currentGroup,
  handleChange,
  currentRange,
  texts,
  rangeUnits,
}: Props) => {
  const { offset } = currentRange;
  useEffect(() => {
    if (offset?.value < 0) {
      handleOffsetValueChange(0);
    }
  }, [offset, handleOffsetValueChange]);
  return (
    <>
      {' '}
      <S.Title>
        {currentGroup === RANGES_MODE.PAST ? texts.before : texts.after}
      </S.Title>
      <S.InputSelectGroup compact>
        <InputNumber
          min={0}
          max={RELATIVE_OFFSET_MAX}
          precision={0}
          step={1}
          value={offset?.value}
          onBlur={({ target: { value } }): void => {
            !value && handleOffsetValueChange(0);
          }}
          onChange={handleOffsetValueChange}
        />
        <Select
          value={offset?.type}
          onChange={(type): void =>
            handleChange(setOffsetType(type, currentRange))
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
              {texts[type.toLowerCase()]}
            </Select.Option>
          ))}
        </Select>
      </S.InputSelectGroup>
    </>
  );
};

export default OffsetField;
