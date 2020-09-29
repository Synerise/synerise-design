import * as React from 'react';
import Select from '@synerise/ds-select';
import InputNumber from '@synerise/ds-input-number';
import * as S from '../../../RelativeRangePicker.styles';
import * as CONST from '../../../../constants';
import { setOffsetType } from '../CustomRangeForm';
import { Props } from './OffsetField.types';
import { RANGES_MODE } from '../../../utils';

const SELECT_DROPDOWN_OFFSET = -4;
const OffsetField: React.FC<Props> = ({
  handleOffsetValueChange,
  currentGroup,
  handleChange,
  currentRange,
  texts,
}: Props) => {
  const { offset } = currentRange;
  return (
    <>
      {' '}
      <S.Title>{currentGroup === RANGES_MODE.PAST ? texts.before : texts.after}</S.Title>
      <S.InputSelectGroup compact>
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
        <Select
          value={offset.type}
          onChange={(type): void => handleChange(setOffsetType(type, currentRange))}
          dropdownAlign={{ points: ['bl', 'tl'], offset: [0, SELECT_DROPDOWN_OFFSET] }}
        >
          {CONST.RELATIVE_TYPES.map(type => (
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
