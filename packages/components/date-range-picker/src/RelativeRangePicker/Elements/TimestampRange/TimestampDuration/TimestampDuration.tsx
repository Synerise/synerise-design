import React from 'react';

import InputNumber from '@synerise/ds-input-number';
import Select from '@synerise/ds-select';

import { type Texts } from '../../../../DateRangePicker.types';
import * as CONST from '../../../../constants';
import { DURATION_MODIFIERS } from '../../../../constants';
import * as S from '../../../RelativeRangePicker.styles';
import { type Props } from './TimestampDuration.types';

const SELECT_DROPDOWN_OFFSET = -4;
const TimestampDuration: React.FC<Props> = ({
  handleDurationValueChange,
  durationModifier,
  onDurationModifierChange,
  value,
  onDurationUnitChange,
  unit,
  texts,
}) => {
  const durationModiferValues = Object.values(DURATION_MODIFIERS);
  return (
    <>
      <S.Title>{texts.timestampTill}</S.Title>
      <S.InputSelectGroup compact>
        <Select
          className="ds-select-duration-type"
          value={durationModifier}
          onChange={(modifier): void => {
            onDurationModifierChange(modifier as string);
          }}
          dropdownStyle={{ minWidth: '125px' }}
          dropdownAlign={{
            points: ['bl', 'tl'],
            offset: [0, SELECT_DROPDOWN_OFFSET],
          }}
          getPopupContainer={(node): HTMLElement =>
            node.parentElement !== null ? node.parentElement : document.body
          }
        >
          {durationModiferValues.map((modifier) => (
            <Select.Option key={modifier} value={modifier}>
              {texts[modifier]}
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
          dropdownAlign={{
            points: ['bl', 'tl'],
            offset: [0, SELECT_DROPDOWN_OFFSET],
          }}
          getPopupContainer={(node): HTMLElement =>
            node.parentElement !== null ? node.parentElement : document.body
          }
        >
          {CONST.RELATIVE_UNITS.map((type) => (
            <Select.Option key={type} value={type}>
              {texts[type.toLowerCase() as keyof Texts]}
            </Select.Option>
          ))}
        </Select>
      </S.InputSelectGroup>
    </>
  );
};

export default TimestampDuration;
