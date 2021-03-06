import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import * as S from '../../RelativeRangePicker.styles';
import TimestampDuration from './TimestampDuration/TimestampDuration';
import { Props } from './TimestampRange.types';
import ADD from '../../../dateUtils/add';
import START_OF from '../../../dateUtils/startOf';
import END_OF from '../../../dateUtils/endOf';
import DIFFERENCE from '../../../dateUtils/difference';
import { DURATION_MODIFIERS } from '../../../constants';
import { RelativeUnits, Duration } from '../../../date.types';
import { fnsIsAfter } from '../../../fns';

const TimestampRange: React.FC<Props> = ({
  currentRange,
  currentGroup,
  handleChange,
  texts,
  onTimestampChange,
  timestamp,
}: Props) => {
  const [durationModifier, setDurationModifier] = React.useState<string>(DURATION_MODIFIERS.LAST);
  const [durationValue, setDurationValue] = React.useState<number>(currentRange.duration.value);
  const [durationUnit, setDurationUnit] = React.useState<string>(currentRange.duration.type);
  const [error, setError] = React.useState<boolean>(!timestamp);

  React.useEffect(() => {
    setError(!timestamp);
  }, [timestamp]);

  const handleRangeChange = (date: Date | undefined, duration: Duration): void => {
    if (date) {
      const NOW = new Date();
      let rangeStart, newOffset, offsetToTimestamp;
      const future = fnsIsAfter(NOW, date);
      if (durationModifier === DURATION_MODIFIERS.NEXT) {
        rangeStart = END_OF[duration.type](ADD[duration.type](date, -Number(future)));
        newOffset = DIFFERENCE[duration.type](NOW, rangeStart);
        offsetToTimestamp = {
          ...currentRange,
          duration: { type: duration.type, value: duration.value },
          offset: { type: duration.type, value: newOffset - duration.value },
          key: undefined,
        };
      }
      if (durationModifier === DURATION_MODIFIERS.LAST) {
        rangeStart = START_OF[duration.type](ADD[duration.type](date, -Number(future)));
        newOffset = DIFFERENCE[duration.type](NOW, rangeStart);
        offsetToTimestamp = {
          ...currentRange,
          duration: { type: duration.type, value: duration.value },
          offset: { type: duration.type, value: newOffset },
          key: undefined,
        };
      }
      offsetToTimestamp && handleChange(offsetToTimestamp);
    }
  };

  React.useEffect((): void => {
    const duration: Duration = { type: durationUnit as RelativeUnits, value: durationValue };
    handleRangeChange(timestamp, duration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationValue, durationModifier, durationUnit, timestamp]);

  const renderDatePicker = (): React.ReactNode => {
    return (
      <S.DatePickerWrapper error={error}>
        <DatePicker
          value={timestamp}
          onValueChange={(value): void => {
            setError(!value);
            onTimestampChange && onTimestampChange(value);
          }}
          onApply={(date): void => {
            onTimestampChange && onTimestampChange(date);
          }}
          onClear={(): void => {
            onTimestampChange && onTimestampChange(undefined);
          }}
          dropdownProps={{
            getPopupContainer: (node): HTMLElement => (node.parentElement != null ? node.parentElement : document.body),
          }}
          disabledSeconds={[]}
          disabledHours={[]}
          disabledMinutes={[]}
          texts={{
            apply: texts.apply,
            now: texts.now,
            clearTooltip: texts.clear,
            inputPlaceholder: texts.selectDate,
          }}
          showTime
          error={error}
          errorText={error ? texts.emptyDateError : null}
          popoverPlacement="topLeft"
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
        value={durationValue}
        handleDurationValueChange={(val): void => {
          val && setDurationValue(Number(val));
        }}
        onDurationUnitChange={(unit): void => {
          unit && setDurationUnit(unit as RelativeUnits);
        }}
        unit={durationUnit}
        durationModifier={durationModifier}
        onDurationModifierChange={(modifier): void => {
          setDurationModifier(modifier);
        }}
        texts={texts}
      />
    </S.RangeFormColumn>
  );
};

export default TimestampRange;
