import * as React from 'react';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import { Props } from './CustomRangeForm.types';
import * as S from '../../RelativeRangePicker.styles';
import ModeDropdown from '../ModeDropdown/ModeDropdown';
import DurationField from './DurationField/DurationField';
import OffsetField from './OffsetField/OffsetField';
import { RANGES_MODE, TIMESTAMP_MODE } from '../../utils';
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
}: Props) => {
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

  const renderTimestmapRange = (): React.ReactNode => {
    return (
      <S.RangeFormColumn>
        <TimestampRange
          handleModeChange={handleModeChange}
          currentRange={currentRange}
          currentGroup={currentGroup}
          handleChange={handleChange}
          handleDurationValueChange={handleDurationValueChange}
          handleOffsetValueChange={handleOffsetValueChange}
          intl={intl}
        />
      </S.RangeFormColumn>
    );
  };
  const isSinceModeEnable =
    currentGroup === RANGES_MODE.SINCE || currentGroup === TIMESTAMP_MODE.NEXT || currentGroup === TIMESTAMP_MODE.LAST;
  return (
    <S.CustomForm>
      <S.RangeFormColumn>
        <ModeDropdown
          ranges={ranges}
          currentGroup={currentGroup}
          currentRange={currentRange}
          onModeChange={handleModeChange}
          intl={intl}
        />
      </S.RangeFormColumn>
      {isSinceModeEnable ? renderTimestmapRange() : renderOffsetColumn()}
      {!isSinceModeEnable && renderDurationColumn()}
    </S.CustomForm>
  );
};

export default CustomRangeForm;
