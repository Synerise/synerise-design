import lensPath from 'ramda/src/lensPath.js';
import set from 'ramda/src/set.js';
import React, { type ReactNode } from 'react';

import { RANGES_MODE } from '../../../constants';
import * as S from '../../RelativeRangePicker.styles';
import ModeDropdown from '../ModeDropdown/ModeDropdown';
import TimestampRange from '../TimestampRange/TimestampRange';
import type { Props } from './CustomRangeForm.types';
import DurationField from './DurationField/DurationField';
import OffsetField from './OffsetField/OffsetField';

export const setOffsetType = set(lensPath(['offset', 'type']));

const CustomRangeForm = ({
  rangeUnits,
  currentRange,
  currentGroup,
  handleDurationValueChange,
  handleOffsetValueChange,
  handleModeChange,
  handleChange,
  texts,
  handleTimestampChange,
  timestamp,
  relativeModes,
  timeZone,
}: Props) => {
  const isSinceModeEnable = currentGroup === RANGES_MODE.SINCE;
  const renderOffsetColumn = (): ReactNode => {
    return (
      <S.RangeFormColumn>
        <OffsetField
          currentRange={currentRange}
          currentGroup={currentGroup}
          handleChange={handleChange}
          handleOffsetValueChange={handleOffsetValueChange}
          texts={texts}
          rangeUnits={rangeUnits}
        />
      </S.RangeFormColumn>
    );
  };
  const renderDurationColumn = (): ReactNode => {
    return (
      <S.RangeFormColumn>
        <DurationField
          currentRange={currentRange}
          currentGroup={currentGroup}
          handleChange={handleChange}
          handleDurationValueChange={handleDurationValueChange}
          texts={texts}
          rangeUnits={rangeUnits}
        />
      </S.RangeFormColumn>
    );
  };

  const renderTimestampRange = (): ReactNode => {
    return (
      <S.RangeFormColumn>
        <TimestampRange
          handleModeChange={handleModeChange}
          currentRange={currentRange}
          handleChange={handleChange}
          onTimestampChange={handleTimestampChange}
          timestamp={timestamp}
          texts={texts}
          timeZone={timeZone}
        />
      </S.RangeFormColumn>
    );
  };
  return (
    <S.CustomForm>
      <S.RangeFormColumn>
        <ModeDropdown
          currentGroup={currentGroup}
          onModeChange={handleModeChange}
          texts={texts}
          modes={relativeModes}
        />
      </S.RangeFormColumn>
      {isSinceModeEnable ? renderTimestampRange() : renderDurationColumn()}
      {!isSinceModeEnable && renderOffsetColumn()}
    </S.CustomForm>
  );
};

export default CustomRangeForm;
