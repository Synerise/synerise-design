import React from 'react';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import { Props } from './CustomRangeForm.types';
import * as S from '../../RelativeRangePicker.styles';
import ModeDropdown from '../ModeDropdown/ModeDropdown';
import DurationField from './DurationField/DurationField';
import OffsetField from './OffsetField/OffsetField';
import { RANGES_MODE } from '../../../constants';
import TimestampRange from '../TimestampRange/TimestampRange';
import { RelativeUnits } from '../../../date.types';

export const setOffsetType = set(lensPath(['offset', 'type']));

const CustomRangeForm = ({
  ranges,
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
}: Props) => {
  const isSinceModeEnable = currentGroup === RANGES_MODE.SINCE;
  const renderOffsetColumn = (): React.ReactNode => {
    return (
      <S.RangeFormColumn>
        <OffsetField
          currentRange={currentRange}
          currentGroup={currentGroup}
          handleChange={handleChange}
          handleOffsetValueChange={handleOffsetValueChange}
          texts={texts}
          rangeUnits={rangeUnits as RelativeUnits[]}
        />
      </S.RangeFormColumn>
    );
  };
  const renderDurationColumn = (): React.ReactNode => {
    return (
      <S.RangeFormColumn>
        <DurationField
          currentRange={currentRange}
          currentGroup={currentGroup}
          handleChange={handleChange}
          handleDurationValueChange={handleDurationValueChange}
          texts={texts}
          rangeUnits={rangeUnits as RelativeUnits[]}
        />
      </S.RangeFormColumn>
    );
  };

  const renderTimestampRange = (): React.ReactNode => {
    return (
      <S.RangeFormColumn>
        <TimestampRange
          handleModeChange={handleModeChange}
          currentRange={currentRange}
          handleChange={handleChange}
          onTimestampChange={handleTimestampChange}
          timestamp={timestamp}
          texts={texts}
        />
      </S.RangeFormColumn>
    );
  };
  return (
    <S.CustomForm>
      <S.RangeFormColumn>
        <ModeDropdown
          ranges={ranges}
          currentGroup={currentGroup}
          currentRange={currentRange}
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
