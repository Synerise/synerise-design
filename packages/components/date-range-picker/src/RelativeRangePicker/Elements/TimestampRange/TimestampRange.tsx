/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useIntl } from 'react-intl';
import DatePicker from '@synerise/ds-date-picker';
import { getDefaultTexts } from '@synerise/ds-date-picker/dist/utils/getDefaultTexts';
import * as S from '../../RelativeRangePicker.styles';
import TimestampDuration from './TimestampDuration/TimestampDuration';
import { TimestampRangeProps as Props } from './TimestampRange.types';
import { CUSTOM_RANGE_KEY, DURATION_MODIFIERS } from '../../../constants';
import { RelativeUnits, Duration, RelativeDateRange } from '../../../date.types';
import { DEFAULT_RANGE } from '../../../utils';

const TimestampRange: React.FC<Props> = ({
  currentRange,
  handleChange,
  texts,
  onTimestampChange,
  getValueOnReset = (): RelativeDateRange => ({
    ...DEFAULT_RANGE,
    type: 'RELATIVE',
    offset: { type: 'SINCE', value: new Date() as any as number },
    duration: { type: 'DAYS', value: 30 },
    translationKey: CUSTOM_RANGE_KEY,
  }),
  timestamp,
}: Props) => {
  const [durationModifier, setDurationModifier] = React.useState<
    typeof DURATION_MODIFIERS.LAST | typeof DURATION_MODIFIERS.NEXT
  >(currentRange?.future ? DURATION_MODIFIERS.NEXT : DURATION_MODIFIERS.LAST);
  const [durationValue, setDurationValue] = React.useState<number>(currentRange?.duration?.value);
  const [durationUnit, setDurationUnit] = React.useState<string>(currentRange?.duration?.type);
  const [error, setError] = React.useState<boolean>(!timestamp);
  const intl = useIntl();
  const allTexts = getDefaultTexts(intl, texts);
  React.useEffect(() => {
    setError(!timestamp);
  }, [timestamp]);

  const handleRangeChange = (date: Date | undefined, duration: Duration): void => {
    if (date) {
      const offsetToTimestamp = {
        future: durationModifier === DURATION_MODIFIERS.NEXT,
        duration: { type: duration.type, value: duration.value },
        offset: { type: 'SINCE', value: timestamp },
        key: undefined,
        translationKey: CUSTOM_RANGE_KEY,
      };
      handleChange(offsetToTimestamp as any); // FIXME
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
            onTimestampChange && onTimestampChange(value as Date);
          }}
          onApply={(date): void => {
            onTimestampChange && onTimestampChange(date as Date);
          }}
          onClear={(): void => {
            onTimestampChange && onTimestampChange(getValueOnReset() as any); // FIXME cannot reselect date after clearing
          }}
          dropdownProps={{
            getPopupContainer: (node): HTMLElement => (node.parentElement != null ? node.parentElement : document.body),
          }}
          texts={{
            apply: allTexts.apply,
            now: allTexts.now,
            clearTooltip: allTexts.clearTooltip,
            inputPlaceholder: allTexts.inputPlaceholder,
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
