import * as React from 'react';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import { Props } from './CustomRangeForm.types';
import * as S from '../../RelativeRangePicker.styles';
import ModeDropdown from '../ModeDropdown/ModeDropdown';
import DurationField from './DurationField/DurationField';
import OffsetField from './OffsetField/OffsetField';
import { RANGES_MODE } from '../../utils';
import TimestampRange from '../TimestampRange/TimestampRange';

export const setOffsetType = set(lensPath(['offset', 'type']));

const CustomRangeForm: React.FC<Props> = ({
  ranges,
  currentRange,
  currentGroup,
  handleDurationValueChange,
  handleOffsetValueChange,
  handleModeChange,
  handleChange,
  intl,
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
          intl={intl}
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
          intl={intl}
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
          currentGroup={currentGroup}
          handleChange={handleChange}
          onTimestampChange={handleTimestampChange}
          timestamp={timestamp}
          intl={intl}
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
          intl={intl}
          modes={relativeModes}
        />
      </S.RangeFormColumn>
      {isSinceModeEnable ? renderTimestampRange() : renderDurationColumn()}
      {!isSinceModeEnable && renderOffsetColumn()}
    </S.CustomForm>
  );
};

export default CustomRangeForm;
