import * as React from 'react';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import { Props } from './CustomRangeForm.types';
import * as S from '../../RelativeRangePicker.styles';
import ModeDropdown from '../ModeDropdown/ModeDropdown';
import DurationField from '../DurationField/DurationField';
import OffsetField from '../OffsetField/OffsetField';

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
      <S.RangeFormRow>
        <OffsetField
          currentRange={currentRange}
          currentGroup={currentGroup}
          handleChange={handleChange}
          handleOffsetValueChange={handleOffsetValueChange}
          intl={intl}
        />
      </S.RangeFormRow>
    );
  };
  const renderDurationColumn = (): React.ReactNode => {
    return (
      <S.RangeFormRow>
        <DurationField
          currentRange={currentRange}
          currentGroup={currentGroup}
          handleChange={handleChange}
          handleDurationValueChange={handleDurationValueChange}
          intl={intl}
        />
      </S.RangeFormRow>
    );
  };

  return (
    <S.CustomForm>
      <S.RangeFormRow>
        <ModeDropdown
          ranges={ranges}
          currentGroup={currentGroup}
          currentRange={currentRange}
          onModeChange={handleModeChange}
        />
      </S.RangeFormRow>
      {renderOffsetColumn()}
      {renderDurationColumn()}
    </S.CustomForm>
  );
};

export default CustomRangeForm;
