import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import * as S from '../../RelativeRangePicker.styles';
import TimestampDuration from './TimestampDuration/TimestampDuration';
import { Props } from './TimestampRange.types';
import ADD from '../../../dateUtils/add';
import DIFFERENCE from '../../../dateUtils/difference';
import { DURATION_MODIFIERS } from '../../../constants';
import { RelativeUnits, Duration } from '../../../date.types';
import { fnsIsAfter } from '../../../fns';

const TimestampRange: React.FC<Props> = ({
  currentRange,
  currentGroup,
  handleChange,
  intl,
  texts,
  onTimestampChange,
  timestamp,
}: Props) => {
  const [durationModifier, setDurationModifier] = React.useState<string>(DURATION_MODIFIERS.LAST);
  const [durationValue, setDurationValue] = React.useState<number>(1);
  const [durationUnit, setDurationUnit] = React.useState<string>(currentRange.duration.type);
  const hasError = !timestamp;
  const handleRangeChange = (date: Date | undefined, duration: Duration): void => {
    if (date) {
      const NOW = new Date();
      let rangeStart, newOffset, offsetToTimestamp;
      const future = fnsIsAfter(date, NOW);

      if (durationModifier === DURATION_MODIFIERS.NEXT) {
        rangeStart = ADD[duration.type](date, Number(future));
        newOffset = DIFFERENCE[duration.type](NOW, rangeStart);
        offsetToTimestamp = {
          ...currentRange,
          duration: { type: duration.type, value: duration.value },
          offset: { type: duration.type, value: newOffset - duration.value },
          key: undefined,
        };
      }
      if (durationModifier === DURATION_MODIFIERS.LAST) {
        rangeStart = ADD[duration.type](date, Number(future));
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

  const getErrorMsg = React.useCallback(
    () =>
      texts?.emptyDateError
        ? texts.emptyDateError
        : intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.EMPTY-DATE-ERROR' }),
    [texts, intl]
  );
  const renderDatePicker = (): React.ReactNode => {
    return (
      <S.DatePickerWrapper error={hasError}>
        <DatePicker
          value={timestamp}
          onApply={(date): void => {
            onTimestampChange && onTimestampChange(date);
          }}
          onClear={(): void => {
            onTimestampChange && onTimestampChange(undefined);
          }}
          disabledSeconds={[]}
          disabledHours={[]}
          disabledMinutes={[]}
          texts={{
            apply: texts?.apply ? texts.apply : intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.APPLY' }),
            now: texts?.now ? texts.now : intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.NOW' }),
            clearTooltip: texts?.clear ? texts.clear : intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.CLEAR' }),
            inputPlaceholder: texts?.selectDate
              ? texts.selectDate
              : intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SELECT-DATE' }),
          }}
          showTime
          error={hasError}
          errorText={hasError ? getErrorMsg() : null}
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
          val && setDurationValue(val);
        }}
        onDurationUnitChange={(unit): void => {
          unit && setDurationUnit(unit as RelativeUnits);
        }}
        unit={durationUnit}
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
