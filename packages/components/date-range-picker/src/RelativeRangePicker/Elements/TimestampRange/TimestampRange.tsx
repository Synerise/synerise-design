import React, { type ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { DatePicker, getDefaultTexts } from '@synerise/ds-date-picker';

import { CUSTOM_RANGE_KEY, DURATION_MODIFIERS } from '../../../constants';
import type {
  Duration,
  RelativeUnit,
  SinceDateRange,
} from '../../../date.types';
import { getNow } from '../../../dateUtils/getNow';
import { DEFAULT_RANGE } from '../../../utils';
import * as S from '../../RelativeRangePicker.styles';
import TimestampDuration from './TimestampDuration/TimestampDuration';
import type { DurationModifier } from './TimestampDuration/TimestampDuration.types';
import type { TimestampRangeProps as Props } from './TimestampRange.types';

const TimestampRange: React.FC<Props> = ({
  currentRange,
  handleChange,
  texts,
  onTimestampChange,
  getValueOnReset,
  timestamp,
  timeZone,
}: Props) => {
  const [durationModifier, setDurationModifier] =
    React.useState<DurationModifier>(
      currentRange?.future ? DURATION_MODIFIERS.NEXT : DURATION_MODIFIERS.LAST,
    );
  const [durationValue, setDurationValue] = React.useState<number>(
    currentRange?.duration?.value,
  );
  const [durationUnit, setDurationUnit] = React.useState<RelativeUnit>(
    currentRange?.duration?.type as RelativeUnit,
  );
  const [error, setError] = React.useState<boolean>(!timestamp);
  const intl = useIntl();
  const allTexts = getDefaultTexts(intl, texts);
  // The SINCE anchor defaults to "now" on the provider's clock, so clearing the timestamp
  // lands on the provider's day rather than the browser's.
  const getResetValue = React.useCallback(() => {
    const sinceNow: SinceDateRange = {
      ...DEFAULT_RANGE,
      type: 'RELATIVE',
      offset: { type: 'SINCE', value: getNow(timeZone) },
      duration: { type: 'DAYS', value: 30 },
      translationKey: CUSTOM_RANGE_KEY,
    };
    return getValueOnReset?.() ?? sinceNow;
  }, [getValueOnReset, timeZone]);
  React.useEffect(() => {
    setError(!timestamp);
  }, [timestamp]);

  const handleRangeChange = (
    date: Date | undefined,
    duration: Duration,
  ): void => {
    if (date) {
      const offsetToTimestamp: SinceDateRange = {
        future: durationModifier === DURATION_MODIFIERS.NEXT,
        duration: { type: duration.type, value: duration.value },
        offset: { type: 'SINCE', value: date },
        key: undefined,
        translationKey: CUSTOM_RANGE_KEY,
        type: 'RELATIVE',
      };
      handleChange(offsetToTimestamp);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: dependencies intentionally omitted
  React.useEffect((): void => {
    const duration: Duration = {
      type: durationUnit,
      value: durationValue,
    };
    handleRangeChange(timestamp, duration);
  }, [durationValue, durationModifier, durationUnit, timestamp]);

  const renderDatePicker = (): ReactNode => {
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
            // FIXME: hands a range where a Date is expected, so a date cannot be reselected after clearing
            onTimestampChange?.(getResetValue() as unknown as Date);
          }}
          dropdownProps={{
            getPopupContainer: (node): HTMLElement =>
              node.parentElement !== null ? node.parentElement : document.body,
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
          unit && setDurationUnit(unit);
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
