import fnsIsValid from 'date-fns/isValid';
import fnsStartOfSecond from 'date-fns/startOfSecond';
import { isUndefined, omitBy } from 'lodash';
import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import { legacyParse } from '@date-fns/upgrade/v2';

import AddonCollapse from './AddonCollapse/AddonCollapse';
import {
  Addon,
  Container,
  PopupWrapper,
  Separator,
} from './DateRangePicker.styles';
import type { AddonType, DateRangePickerProps } from './DateRangePicker.types';
import Footer from './Footer/Footer';
import RangeFilter from './RangeFilter/RangeFilter';
import {
  type FilterDefinition,
  type FilterValue,
} from './RangeFilter/RangeFilter.types';
import RangeFilterStatus from './RangeFilter/Shared/RangeFilterStatus/RangeFilterStatus';
import RangePicker from './RangePicker/RangePicker';
import { isLifetime } from './RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';
import RelativeRangePicker from './RelativeRangePicker/RelativeRangePicker';
import {
  ABSOLUTE,
  ABSOLUTE_PRESETS,
  MODES,
  RELATIVE,
  RELATIVE_PRESETS,
} from './constants';
import * as CONST from './constants';
import type { DateFilter, DateRange, RelativeDateRange } from './date.types';
import relativeToAbsolute from './dateUtils/relativeToAbsolute';
import { getDefaultTexts, normalizeRange, toIsoString } from './utils';

const isRelative = (dateRange: DateRange): dateRange is RelativeDateRange => {
  const isLegacyCustom =
    Object.keys(dateRange).includes('key') && dateRange.key === undefined;
  return (
    (dateRange.key &&
      (CONST.RELATIVE_PRESETS.map((preset) => preset.key).includes(
        dateRange.key,
      ) ||
        dateRange.key === CONST.CUSTOM_RANGE_KEY)) ||
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
type RawDateRangePickerProps = DateRangePickerProps & {
  alignContentToTop?: boolean;
};

export const RawDateRangePicker = ({
  showRelativePicker = true,
  showFilter,
  showTime,
  format,
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
  alignContentToTop,
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
}: RawDateRangePickerProps) => {
  const [localValue, setLocalValue] = useState(normalizeRange(value));
  const [mode, setMode] = useState(MODES.DATE);
  const [visibleAddonKey, setVisibleAddonKey] = useState<string | undefined>(
    'relative-picker',
  );

  const intl = useIntl();
  const { timeZone } = intl;

  useEffect(() => {
    setLocalValue(normalizeRange(value));
  }, [value]);

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

      const newValue = normalizeRange({ ...range, filter: localValue.filter });
      if (isTruncateMs) {
        if (newValue.from !== undefined) {
          newValue.from = fnsStartOfSecond(legacyParse(newValue.from));
        }
        if (newValue.to !== undefined) {
          newValue.to = fnsStartOfSecond(legacyParse(newValue.to));
        }
      }
      if (
        (newValue.type === 'RELATIVE' || newValue.key === CONST.ALL_TIME) &&
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
      onValueChange && onValueChange(legacyValue);
    },
    [isTruncateMs, mode, localValue.filter, onValueChange, valueTransformer],
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
      onApply &&
        onApply({
          ...localValue,
          ...relativeToAbsolute(localValue),
        });
      return;
    }
    if (localValue.key === CONST.ALL_TIME) {
      onApply && onApply(omitBy(localValue, isUndefined));
      return;
    }

    if (onApply) {
      const valueToEmit = {
        ...localValue,
        from:
          localValue.type === ABSOLUTE && localValue.from instanceof Date
            ? toIsoString(localValue.from, timeZone)
            : undefined,
        to:
          localValue.type === ABSOLUTE && localValue.to instanceof Date
            ? toIsoString(localValue.to, timeZone)
            : undefined,
        type: localValue.type,
      } as DateRange;

      onApply(valueToEmit);
    }
  }, [forceAbsolute, timeZone, localValue, onApply]);

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
      const { to, from } = normalizeRange(localValue);
      return {
        ...localValue,
        from,
        to,
      };
    }
    return localValue;
  }, [localValue]);

  const addons = useMemo(() => {
    const result: AddonType[] = [];
    if (showRelativePicker && !!relativeModes && relativeModes?.length > 0) {
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
              />
            }
            expanded={addonKey === visibleAddonKey}
            title={allTexts.relativeDateRange}
            onCollapseChange={(expanded) =>
              handleAddonCollapse(addonKey, expanded)
            }
            collapsedSummary={
              rangeTranslationKey && allTexts[rangeTranslationKey]
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
        key === CONST.ALL_TIME) &&
      validator.valid;
    const canSwitchToTimePicker =
      isValid &&
      !isLifetime(localValue) &&
      (!disableAbsoluteTimepickerInRelative || localValue.type === 'ABSOLUTE');

    content = (
      <Container className={containerClass}>
        <RangePicker
          showNowButton={showNowButton}
          value={normalizeRange(localValue)}
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
          format={format}
          valueFormatOptions={valueFormatOptions}
          {...footerProps}
        />
      </Container>
    );
  }
  return (
    <PopupWrapper
      data-testid="date-range-picker-container"
      alignContentToTop={alignContentToTop}
      hasFilter={showFilter}
      hasRelativePicker={showRelativePicker}
    >
      {content}
    </PopupWrapper>
  );
};

export default RawDateRangePicker;
