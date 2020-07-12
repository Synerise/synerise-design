import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import * as S from '../../RelativeRangePicker.styles';
import TimestampDuration from './TimestampDuration/TimestampDuration';
import { Props } from './TimestampRange.types';
import ADD from '../../../dateUtils/add';
import DIFFERENCE from '../../../dateUtils/difference';
import START_OF from '../../../dateUtils/startOf';
import { DURATION_MODIFIERS } from '../../../constants';

const TimestampRange: React.FC<Props> = ({
  currentRange,
  currentGroup,
  handleChange,
  handleDurationValueChange,
  intl,
}: Props) => {
  const [durationModifier, setDurationModifier] = React.useState(DURATION_MODIFIERS.LAST);
  const { duration } = currentRange;

  const handleRangeChange = (date: Date): void => {
    const NOW = new Date();
    let rangeStart, rangeEnd, newOffset, offsetToTimestamp;
    if (durationModifier === DURATION_MODIFIERS.NEXT) {
      const next = ADD[duration.type](date, 1);
      rangeStart = date;
      rangeEnd = ADD[duration.type](START_OF[duration.type](next), 0);
      newOffset = DIFFERENCE[duration.type](START_OF[duration.type](rangeEnd), NOW);
      offsetToTimestamp = {
        ...currentRange,
        offset: { type: duration.type, value: newOffset },
      };
    }
    if (durationModifier === DURATION_MODIFIERS.LAST) {
      const next = ADD[duration.type](date, 1);
      rangeStart = ADD[duration.type](START_OF[duration.type](next), 0);
      newOffset = DIFFERENCE[duration.type](START_OF[duration.type](rangeStart), NOW);
      offsetToTimestamp = {
        ...currentRange,
        offset: { type: duration.type, value: -newOffset },
      };
    }
    // console.log('newOffset', newOffset);
    // console.log('newOne', offsetToTimestamp);
    // setModifiedDate(newOne);
    offsetToTimestamp && handleChange(offsetToTimestamp);
  };
  const getTimestamp = (): Date => {
    const { from, to } = currentRange;
    if (durationModifier === DURATION_MODIFIERS.NEXT) {
      return from === null || from === undefined ? new Date() : (from as Date);
    }
    if (durationModifier === DURATION_MODIFIERS.LAST) {
      return to === null || to === undefined ? new Date() : (to as Date);
    }
    return new Date();
  };
  const renderDatePicker = (): React.ReactNode => {
    return (
      <S.DatePickerWrapper>
        <DatePicker
          value={getTimestamp()}
          onApply={(date): void => {
            date && handleRangeChange(date);
          }}
          disabledSeconds={[]}
          disabledHours={[]}
          disabledMinutes={[]}
          texts={{
            apply: 'Apply',
            now: 'Now',
          }}
        />
      </S.DatePickerWrapper>
    );
  };
  return (
    <S.RangeFormColumn>
      {renderDatePicker()}
      <TimestampDuration
        currentRange={currentRange}
        currentGroup={currentGroup}
        handleChange={handleChange}
        handleDurationValueChange={handleDurationValueChange}
        intl={intl}
        durationModifier={durationModifier}
        onDurationModifierChange={(modifier): void => {
          setDurationModifier(modifier);
        }}
      />
    </S.RangeFormColumn>
  );
};

export default TimestampRange;
