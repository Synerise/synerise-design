/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import * as S from '../../RelativeRangePicker.styles';
import TimestampDuration from './TimestampDuration/TimestampDuration';
import { TimestampRangeProps as Props } from './TimestampRange.types';
import ADD from '../../../dateUtils/add';
import START_OF from '../../../dateUtils/startOf';
import END_OF from '../../../dateUtils/endOf';
import DIFFERENCE from '../../../dateUtils/difference';
import { DURATION_MODIFIERS } from '../../../constants';
import { RelativeUnits, Duration, RelativeDateRange } from '../../../date.types';
import { fnsIsAfter } from '../../../fns';
import { DEFAULT_RANGE } from '../../../utils';

const TimestampRange: React.FC<Props> = ({
  currentRange,
  currentGroup,
  handleChange,
  texts,
  onTimestampChange,
  getValueOnReset = (): RelativeDateRange => ({
    ...DEFAULT_RANGE,
    type: 'RELATIVE',
    offset: { type: 'SINCE', value: new Date() as any as number },
    duration: { type: 'DAYS', value: 30 },
  }),
  timestamp,
}: Props) => {
  const [durationModifier, setDurationModifier] = React.useState<
    typeof DURATION_MODIFIERS.LAST | typeof DURATION_MODIFIERS.NEXT
  >(DURATION_MODIFIERS.LAST);
  const [durationValue, setDurationValue] = React.useState<number>(currentRange?.duration?.value);
  const [durationUnit, setDurationUnit] = React.useState<string>(currentRange?.duration?.type);
  const [error, setError] = React.useState<boolean>(!timestamp);

  React.useEffect(() => {
    setError(!timestamp);
  }, [timestamp]);

  const handleRangeChange = (date: Date | undefined, duration: Duration): void => {
    if (date) {
      const NOW = new Date();
      let rangeStart, newOffset, offsetToTimestamp;
      const future = fnsIsAfter(NOW, date);
      const isSince = currentGroup === 'SINCE';
      if (isSince) {
        offsetToTimestamp = {
          future: durationModifier === DURATION_MODIFIERS.NEXT,
          duration: { type: duration.type, value: duration.value },
          offset: { type: 'SINCE', value: timestamp },
          key: undefined,
        };
      } else if (durationModifier === DURATION_MODIFIERS.NEXT) {
        rangeStart = END_OF[duration.type](ADD[duration.type](date, -Number(future)));
        newOffset = DIFFERENCE[duration.type](NOW, rangeStart);
        offsetToTimestamp = {
          future: true,
          ...currentRange,
          duration: { type: duration.type, value: duration.value },
          offset: { type: duration.type, value: newOffset - duration.value },
          key: undefined,
        };
      } else if (durationModifier === DURATION_MODIFIERS.LAST) {
        rangeStart = START_OF[duration.type](ADD[duration.type](date, -Number(future)));
        newOffset = DIFFERENCE[duration.type](NOW, rangeStart);
        offsetToTimestamp = {
          future: false,
          ...currentRange,
          duration: { type: duration.type, value: duration.value },
          offset: { type: duration.type, value: newOffset },
          key: undefined,
        };
      }
      offsetToTimestamp && handleChange(offsetToTimestamp as any); // FIXME
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
            onTimestampChange && onTimestampChange(getValueOnReset() as any); // FIXME cannot reselect date after clearing
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
          setDurationModifier(modifier as any); // FIXME
        }}
        texts={texts}
      />
    </S.RangeFormColumn>
  );
};

export default TimestampRange;
