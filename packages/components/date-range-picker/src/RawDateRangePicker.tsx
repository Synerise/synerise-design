import {
  isValid as fnsIsValid,
  startOfSecond as fnsStartOfSecond,
} from 'date-fns';
import isUndefined from 'lodash.isundefined';
import omitBy from 'lodash.omitby';
import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import {
  applyTimezoneOffset,
  getTimeZone,
  toIsoString,
} from '@synerise/ds-core';

import AddonCollapse from './AddonCollapse/AddonCollapse';
import {
  ABSOLUTE,
  ABSOLUTE_PRESETS,
  ALL_TIME,
  CUSTOM_RANGE_KEY,
  MODES,
  RELATIVE,
  RELATIVE_PRESETS,
} from './constants';
import {
  Addon,
  Container,
  DateRangePickerWrapper,
  Separator,
} from './DateRangePicker.styles';
import type {
  AddonType,
  DateRangePickerProps,
  Texts,
} from './DateRangePicker.types';
import type { DateFilter, DateRange, RelativeDateRange } from './date.types';
import relativeToAbsolute from './dateUtils/relativeToAbsolute';
import { toDateValue } from './dateUtils/toDateValue';
import Footer from './Footer/Footer';
import RangeFilter from './RangeFilter/RangeFilter';
import type {
  FilterDefinition,
  FilterValue,
} from './RangeFilter/RangeFilter.types';
import RangeFilterStatus from './RangeFilter/Shared/RangeFilterStatus/RangeFilterStatus';
import RangePicker from './RangePicker/RangePicker';
import { isLifetime } from './RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';
import RelativeRangePicker from './RelativeRangePicker/RelativeRangePicker';
import { getDefaultTexts, normalizeLocalRange, normalizeRange } from './utils';

/**
 * Inside the panel a `Date` holds the wall clock of the provider timezone in its local
 * fields (`toIsoString` is the encoder of that convention, `getValueAsLocalDate` the
 * decoder). Anything leaving the component has to be re-anchored to a real instant first,
 * otherwise a consumer feeding the value straight back in — or reading it as a timestamp —
 * is off by the browser-to-provider timezone delta.
 */
const toEmittedLimit = (
  limit: DateRange['from'],
  timeZone?: string,
  asZonedDate?: boolean,
): Date | string | undefined => {
  if (!(limit instanceof Date)) {
    return undefined;
  }
  // With the `timeZone` prop set the caller has opted into zone-aware values, so emit a `TZDate`
  // — the instant plus the zone — and let them project it. Without it, keep the offset-carrying
  // string every existing consumer already receives.
  return asZonedDate
    ? applyTimezoneOffset(limit, timeZone, undefined)
    : toIsoString(limit, timeZone);
};

const isRelative = (dateRange: DateRange): dateRange is RelativeDateRange => {
  const isLegacyCustom =
    Object.keys(dateRange).includes('key') && dateRange.key === undefined;
  return (
    (dateRange.key &&
      (RELATIVE_PRESETS.map((preset) => preset.key).includes(dateRange.key) ||
        dateRange.key === CUSTOM_RANGE_KEY)) ||
    isLegacyCustom
  );
};

export function defaultValueTransformer(value: DateRange): DateRange {
  const { id, timestamp, translationKey, filter } = value;
  if (value.key === 'ALL_TIME' || isLifetime(value)) {
    return {
      type: 'ABSOLUTE',
      translationKey,
      ...(filter ? { filter } : {}),
    };
  }
  const baseValue = {
    ...(id ? { id } : {}),
    ...(timestamp ? { timestamp } : {}),
    ...(translationKey ? { translationKey } : {}),
    ...(filter ? { filter } : {}),
  };
  if (value.type === 'ABSOLUTE') {
    return {
      ...baseValue,
      type: value.type, // FIXME type set explicitly for better type narrowing in typescript
      ...(value.from ? { from: value.from } : {}),
      ...(value.to ? { to: value.to } : {}),
    };
  }
  if (value.type === 'RELATIVE') {
    return {
      ...baseValue,
      type: value.type,
      key: value.key,
      duration: value.duration,
      offset: value.offset,
      future: value.future,
    };
  }
  return value;
}

export const RawDateRangePicker = ({
  showRelativePicker = true,
  showFilter,
  showTime,
  valueFormatOptions,
  disabledDate,
  validate = (): { valid: boolean } => ({ valid: true }),
  forceAdjacentMonths,
  savedFilters,
  onFilterSave,
  containerClass = 'ds-date-range-picker',
  footerProps,
  allowedFilterTypes,
  disableAbsoluteTimepickerInRelative = false,
  filterValueSelectionModes,
  filterRangeDisplayMode,
  showNowButton = true,
  relativeFuture,
  relativePast = true,
  ranges = [...RELATIVE_PRESETS, ...ABSOLUTE_PRESETS],
  relativeModes,
  rangeUnits,
  showCustomRange,
  valueTransformer = defaultValueTransformer,
  onValueChange,
  isTruncateMs = true,
  forceAbsolute,
  onApply,
  texts,
  value,
  timeZone: timeZoneProp,
}: Omit<DateRangePickerProps, 'placement'>) => {
  const intl = useIntl();
  // Two zones, because the two halves of this component do not default alike.
  //
  // `timeZone` is the zone the panel *works in* — decoding incoming bounds, resolving relative
  // ranges, rendering the calendar. It is `undefined` without the prop, which is what routes
  // every one of those through the legacy browser-clock path a consumer sees today.
  //
  // `encodeTimeZone` is the zone `toIsoString` stamps on the way out. It keeps falling back to
  // the provider's zone because that fallback is already master's behaviour: handing
  // `toIsoString` an `undefined` would take its `timeZone = 'UTC'` default and emit `+00:00`,
  // moving every saved instant by the provider's offset.
  const resolvedTimeZone = getTimeZone(timeZoneProp, intl);
  const emitZonedDates = Boolean(timeZoneProp);
  const timeZone = resolvedTimeZone;
  const encodeTimeZone = resolvedTimeZone ?? intl.timeZone;
  const [localValue, setLocalValue] = useState(normalizeRange(value, timeZone));
  const [mode, setMode] = useState(MODES.DATE);
  const [visibleAddonKey, setVisibleAddonKey] = useState<string | undefined>(
    'relative-picker',
  );

  useEffect(() => {
    setLocalValue(normalizeRange(value, timeZone));
  }, [value, timeZone]);

  const allTexts = useMemo(() => {
    return getDefaultTexts(intl, false, texts);
  }, [intl, texts]);

  const handleRangeChange = useCallback(
    (range?: DateRange) => {
      if (!range) {
        return;
      }
      if (range.from && !fnsIsValid(range?.from)) {
        return;
      }

      const newValue = normalizeLocalRange(
        { ...range, filter: localValue.filter },
        timeZone,
      );
      if (isTruncateMs) {
        if (newValue.from !== undefined) {
          newValue.from = fnsStartOfSecond(toDateValue(newValue.from));
        }
        if (newValue.to !== undefined) {
          newValue.to = fnsStartOfSecond(toDateValue(newValue.to));
        }
      }
      if (
        (newValue.type === 'RELATIVE' || newValue.key === ALL_TIME) &&
        mode === MODES.TIME
      ) {
        setMode(MODES.DATE);
      }
      if (range?.key) {
        newValue.key = range?.key;
      }

      // transformation has to take place here, because `key` property might get omitted by valueTransformer
      const legacyValue = valueTransformer?.(newValue) ?? newValue;
      setLocalValue({ ...legacyValue, translationKey: range?.translationKey });
      // Opted in, the bounds are re-anchored with the same encoding as `onApply`, so a
      // consumer can read them as timestamps or feed them straight back in as `value`;
      // handing out the panel's internal wall-clock dates would drift by the timezone delta.
      // Opted out, they are the plain local dates this callback has always emitted.
      onValueChange &&
        onValueChange(
          timeZoneProp
            ? {
                ...legacyValue,
                ...(legacyValue.from
                  ? {
                      from: toEmittedLimit(
                        legacyValue.from,
                        encodeTimeZone,
                        emitZonedDates,
                      ),
                    }
                  : {}),
                ...(legacyValue.to
                  ? {
                      to: toEmittedLimit(
                        legacyValue.to,
                        encodeTimeZone,
                        emitZonedDates,
                      ),
                    }
                  : {}),
              }
            : legacyValue,
        );
    },
    [
      isTruncateMs,
      mode,
      localValue.filter,
      onValueChange,
      timeZone,
      timeZoneProp,
      encodeTimeZone,
      emitZonedDates,
      valueTransformer,
    ],
  );

  const handleAddonCollapse = useCallback(
    (addonKey: string, expanded: boolean) => {
      setVisibleAddonKey(expanded ? addonKey : undefined);
    },
    [],
  );

  const handleFilterApply = useCallback(
    (filter?: FilterValue<FilterDefinition>) => {
      setMode(MODES.DATE);
      setLocalValue({ ...localValue, filter: filter as DateFilter });
    },
    [localValue],
  );

  const handleRemoveFilterClick = useCallback(() => {
    handleFilterApply(undefined);
  }, [handleFilterApply]);

  const handleModalOpenClick = useCallback(() => {
    setMode(MODES.FILTER);
  }, []);

  const handleFilterCancel = useCallback(() => {
    setMode(MODES.DATE);
  }, []);

  const handleApply = useCallback(() => {
    if (forceAbsolute && localValue.type === RELATIVE) {
      // Resolved on the panel's clock, then emitted with the same encoding as a plain absolute
      // apply. Opted out, the bounds stay the plain local dates this path has always emitted.
      // `type` is not part of that gate: `relativeToAbsolute` already returns `ABSOLUTE` and
      // spreading it is what makes this path absolute at all.
      const resolved = relativeToAbsolute(localValue, timeZone);
      onApply &&
        onApply({
          ...localValue,
          ...resolved,
          ...(timeZoneProp
            ? {
                from: toEmittedLimit(
                  resolved.from,
                  encodeTimeZone,
                  emitZonedDates,
                ),
                to: toEmittedLimit(resolved.to, encodeTimeZone, emitZonedDates),
              }
            : {}),
        });
      return;
    }
    if (localValue.key === ALL_TIME) {
      onApply && onApply(omitBy(localValue, isUndefined));
      return;
    }

    if (onApply) {
      const valueToEmit = {
        ...localValue,
        from:
          localValue.type === ABSOLUTE
            ? toEmittedLimit(localValue.from, encodeTimeZone, emitZonedDates)
            : undefined,
        to:
          localValue.type === ABSOLUTE
            ? toEmittedLimit(localValue.to, encodeTimeZone, emitZonedDates)
            : undefined,
        type: localValue.type,
      } as DateRange;

      onApply(valueToEmit);
    }
  }, [
    forceAbsolute,
    timeZone,
    timeZoneProp,
    encodeTimeZone,
    emitZonedDates,
    localValue,
    onApply,
  ]);

  const handleSwitchMode = useCallback(() => {
    const updatedMode = mode === MODES.TIME ? MODES.DATE : MODES.TIME;
    setMode(updatedMode);
  }, [mode]);

  const fullValue = useMemo(() => {
    if (
      localValue &&
      localValue.type === 'RELATIVE' &&
      (!localValue.from || !localValue.to)
    ) {
      const { to, from } = normalizeLocalRange(localValue, timeZone);
      return {
        ...localValue,
        from,
        to,
      };
    }
    return localValue;
  }, [localValue, timeZone]);

  const addons = useMemo(() => {
    const result: AddonType[] = [];
    if (showRelativePicker && relativeModes && relativeModes?.length > 0) {
      const addonKey = 'relative-picker';
      const rangeTranslationKey = localValue?.translationKey;
      result.push({
        content: (
          <AddonCollapse
            content={
              <RelativeRangePicker
                future={relativeFuture}
                past={relativePast}
                ranges={ranges}
                value={localValue}
                onChange={handleRangeChange}
                relativeModes={relativeModes}
                texts={allTexts}
                rangeUnits={rangeUnits}
                showCustomRange={showCustomRange}
                valueTransformer={valueTransformer}
                timeZone={timeZone}
              />
            }
            expanded={addonKey === visibleAddonKey}
            title={allTexts.relativeDateRange}
            onCollapseChange={(expanded) =>
              handleAddonCollapse(addonKey, expanded)
            }
            collapsedSummary={
              rangeTranslationKey &&
              allTexts[rangeTranslationKey as keyof Texts]
            }
          />
        ),
        key: addonKey,
      });
    }
    if (showFilter) {
      const addonKey = 'filter';
      const filterEnabled =
        (fullValue.from && fullValue.to) || isLifetime(fullValue);
      const label = localValue?.filter
        ? allTexts.filterEnabled
        : allTexts.selectDateFilter;
      result.push({
        content: (
          <RangeFilterStatus
            onFilterRemove={handleRemoveFilterClick}
            filter={localValue.filter}
            texts={allTexts}
            disabled={!filterEnabled}
            label={label}
            onClick={handleModalOpenClick}
          />
        ),
        key: addonKey,
      });
    }
    return result;
  }, [
    showRelativePicker,
    relativeModes,
    showFilter,
    timeZone,
    localValue,
    relativeFuture,
    relativePast,
    ranges,
    handleRangeChange,
    allTexts,
    rangeUnits,
    showCustomRange,
    valueTransformer,
    visibleAddonKey,
    handleAddonCollapse,
    fullValue,
    handleRemoveFilterClick,
    handleModalOpenClick,
  ]);

  let content: ReactNode | undefined;
  if (mode === MODES.FILTER) {
    content = (
      <Container>
        <RangeFilter
          texts={allTexts}
          value={localValue.filter}
          onCancel={handleFilterCancel}
          onApply={handleFilterApply}
          savedFilters={savedFilters}
          allowedFilterTypes={allowedFilterTypes}
          onFilterSave={onFilterSave}
          valueSelectionModes={filterValueSelectionModes}
          rangeDisplayMode={filterRangeDisplayMode}
        />
      </Container>
    );
  } else {
    const { from, to, key } = localValue;
    const validator = validate ? validate(localValue) : { valid: true };
    const isValidAbsolute =
      !Object.keys(localValue).includes('key') && Boolean(from && to);

    const isValidRelative =
      isRelative(localValue) &&
      Boolean(localValue.offset && localValue.duration);
    const isValidSince =
      localValue.type === 'SINCE' &&
      Boolean(localValue.offset && localValue.duration);
    // TODO apply ranges and find mapped lifetime here, this applies only for defaultValueTransformer
    const isValid =
      (isValidAbsolute ||
        isValidRelative ||
        isValidSince ||
        key === ALL_TIME) &&
      validator.valid;
    const canSwitchToTimePicker =
      isValid &&
      !isLifetime(localValue) &&
      (!disableAbsoluteTimepickerInRelative || localValue.type === 'ABSOLUTE');

    content = (
      <Container className={containerClass}>
        <RangePicker
          showNowButton={showNowButton}
          timeZone={timeZone}
          value={normalizeLocalRange(localValue, timeZone)}
          onChange={handleRangeChange}
          mode={mode}
          disabledDate={disabledDate}
          onSwitchMode={handleSwitchMode}
          dateOnly={!showTime}
          canSwitchMode={canSwitchToTimePicker}
          texts={allTexts}
          forceAdjacentMonths={forceAdjacentMonths}
          intl={intl}
        />
        {addons.length > 0 && <Separator />}
        {addons.map(
          (addon, index: number): ReactNode => (
            <Addon
              last={addons.length === index + 1}
              className="addon-wrapper"
              key={addon.key}
            >
              {addon.content}
            </Addon>
          ),
        )}
        <Footer
          canApply={isValid || isLifetime(localValue)}
          onApply={handleApply}
          dateOnly={!showTime}
          mode={mode}
          canSwitchMode={isValid}
          message={!validator.valid ? validator.message : null}
          onSwitchMode={handleSwitchMode}
          texts={allTexts}
          value={fullValue}
          showTime={showTime}
          valueFormatOptions={valueFormatOptions}
          timeZone={timeZone}
          {...footerProps}
        />
      </Container>
    );
  }
  return (
    <DateRangePickerWrapper data-testid="date-range-picker-container">
      {content}
    </DateRangePickerWrapper>
  );
};

export default RawDateRangePicker;
