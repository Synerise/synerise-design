import React, { ReactNode, PureComponent } from 'react';
import { omitBy, isUndefined } from 'lodash';
import { injectIntl } from 'react-intl';
import fnsIsValid from 'date-fns/isValid';
import fnsStartOfSecond from 'date-fns/startOfSecond';
import { legacyParse } from '@date-fns/upgrade/v2';
import { toIsoString } from '@synerise/ds-data-format/dist/utils/timeZone.utils';
import { Container, Separator, Addon, PopupWrapper } from './DateRangePicker.styles';
import RangePicker from './RangePicker/RangePicker';
import { RELATIVE, ABSOLUTE, MODES, RELATIVE_PRESETS, ABSOLUTE_PRESETS } from './constants';
import * as CONST from './constants';
import relativeToAbsolute from './dateUtils/relativeToAbsolute';
import type { DateRangePickerProps, State, AddonType, Texts } from './DateRangePicker.types';
import type { DateFilter, DateRange, RelativeDateRange } from './date.types';
import AddonCollapse from './AddonCollapse/AddonCollapse';
import RelativeRangePicker from './RelativeRangePicker/RelativeRangePicker';
import Footer from './Footer/Footer';
import { getDefaultTexts, normalizeRange } from './utils';
import RangeFilter from './RangeFilter/RangeFilter';
import RangeFilterStatus from './RangeFilter/Shared/RangeFilterStatus/RangeFilterStatus';
import { FilterDefinition, FilterValue } from './RangeFilter/RangeFilter.types';
import { isLifetime } from './RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';

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
type RawDateRangePickerProps = Omit<DateRangePickerProps, 'texts'> & {
  texts: Texts;
  alignContentToTop?: boolean;
};

export class RawDateRangePicker extends PureComponent<RawDateRangePickerProps, State> {
  static defaultProps = {
    ranges: [...RELATIVE_PRESETS, ...ABSOLUTE_PRESETS],
    relativePast: true,
    showRelativePicker: true,
    validate: (): { valid: boolean } => ({ valid: true }),
    valueTransformer: defaultValueTransformer,
    isTruncateMs: true,
  };

  constructor(props: RawDateRangePickerProps) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      mode: MODES.DATE,
      value: normalizeRange(props.value),
      visibleAddonKey: 'relative-picker',
    };
  }

  componentDidUpdate(prevProps: Readonly<RawDateRangePickerProps>): void {
    const { value } = this.props;
    if (prevProps.value !== value) {
      this.handleRangeChange(value);
    }
  }

  handleFilterCancel = (): void => {
    this.setState({ mode: MODES.DATE });
  };

  handleFilterApply = (filter?: FilterValue<FilterDefinition>): void => {
    const { value } = this.state;
    this.setState({ mode: MODES.DATE, value: { ...value, filter: filter as DateFilter } });
  };

  allTexts = () => {
    const { texts, intl } = this.props;
    return getDefaultTexts(intl, false, texts);
  };

  handleRangeChange = (range?: DateRange): void => {
    if (!range) {
      return;
    }
    if (range.from && !fnsIsValid(range?.from)) {
      return;
    }
    const { onValueChange, valueTransformer, isTruncateMs } = this.props;
    const { value, mode } = this.state;
    const newValue = normalizeRange({ ...range, filter: value.filter });
    if (isTruncateMs) {
      if (newValue.from !== undefined) {
        newValue.from = fnsStartOfSecond(legacyParse(newValue.from));
      }
      if (newValue.to !== undefined) {
        newValue.to = fnsStartOfSecond(legacyParse(newValue.to));
      }
    }
    if ((newValue.type === 'RELATIVE' || newValue.key === CONST.ALL_TIME) && mode === MODES.TIME) {
      this.setState({ mode: MODES.DATE });
    }
    if (range?.key) {
      newValue.key = range?.key;
    }
    // transformation has to take place here, because `key` property might get omitted by valueTransformer
    const legacyValue = valueTransformer?.(newValue) ?? newValue;
    this.setState({ value: { ...legacyValue, translationKey: range?.translationKey } });
    onValueChange && onValueChange(legacyValue);
  };

  handleApply = (): void => {
    const { intl } = this.props;
    const { value } = this.state;
    const { forceAbsolute, onApply } = this.props;
    if (forceAbsolute && value.type === RELATIVE) {
      onApply &&
        onApply({
          ...value,
          ...relativeToAbsolute(value),
        });
      return;
    }
    if (value.key === CONST.ALL_TIME) {
      onApply && onApply(omitBy(value, isUndefined));
      return;
    }

    if (onApply) {
      const valueToEmit = {
        ...value,
        from:
          value.type === ABSOLUTE && value.from instanceof Date ? toIsoString(value.from, intl.timeZone) : undefined,
        to: value.type === ABSOLUTE && value.to instanceof Date ? toIsoString(value.to, intl.timeZone) : undefined,
        type: value.type,
      } as DateRange;

      onApply(valueToEmit);
    }
  };

  handleModalOpenClick = (): void => {
    this.setState({ mode: MODES.FILTER });
  };

  handleRemoveFilterClick = (): void => {
    this.handleFilterApply(undefined);
  };

  handleSwitchMode = (): void => {
    const { mode } = this.state;
    const updatedMode = mode === MODES.TIME ? MODES.DATE : MODES.TIME;
    this.setState({ mode: updatedMode });
  };

  handleAddonCollapse = (addonKey: string, expanded: boolean): void => {
    this.setState(state => ({ ...state, visibleAddonKey: expanded ? addonKey : undefined }));
  };

  getAddons = (): AddonType[] => {
    const {
      showRelativePicker,
      showFilter,
      relativeFuture,
      relativePast,
      ranges,
      relativeModes,
      rangeUnits,
      showCustomRange,
      valueTransformer,
    } = this.props;
    const { value, visibleAddonKey } = this.state;
    const allTexts = this.allTexts();
    const addons: AddonType[] = [];
    if (showRelativePicker && !!relativeModes && relativeModes?.length > 0) {
      const addonKey = 'relative-picker';
      const rangeTranslationKey = value?.translationKey;
      addons.push({
        content: (
          <AddonCollapse
            content={
              <RelativeRangePicker
                future={relativeFuture}
                past={relativePast}
                ranges={ranges}
                value={value}
                onChange={this.handleRangeChange}
                relativeModes={relativeModes}
                texts={allTexts}
                rangeUnits={rangeUnits}
                showCustomRange={showCustomRange}
                valueTransformer={valueTransformer}
              />
            }
            expanded={addonKey === visibleAddonKey}
            title={allTexts.relativeDateRange}
            onCollapseChange={(expanded): void => this.handleAddonCollapse(addonKey, expanded)}
            collapsedSummary={rangeTranslationKey && allTexts[rangeTranslationKey]}
          />
        ),
        key: addonKey,
      });
    }
    if (showFilter) {
      const addonKey = 'filter';
      const filterEnabled = (value.from && value.to) || isLifetime(value);
      const label = value?.filter ? allTexts.filterEnabled : allTexts.selectDateFilter;
      addons.push({
        content: (
          <RangeFilterStatus
            onFilterRemove={this.handleRemoveFilterClick}
            filter={value.filter}
            texts={allTexts}
            disabled={!filterEnabled}
            label={label}
            onClick={this.handleModalOpenClick}
          />
        ),
        key: addonKey,
      });
    }
    return addons;
  };

  render(): JSX.Element {
    const {
      showRelativePicker,
      showFilter,
      showTime,
      format,
      valueFormatOptions,
      disabledDate,
      validate,
      forceAdjacentMonths,
      savedFilters,
      onFilterSave,
      intl,
      containerClass = 'ds-date-range-picker',
      footerProps,
      allowedFilterTypes,
      disableAbsoluteTimepickerInRelative = false,
      filterValueSelectionModes,
      filterRangeDisplayMode,
      showNowButton = true,
      alignContentToTop,
    } = this.props;
    const { value, mode } = this.state;
    if (value.type === 'RELATIVE' && (!value.from || !value.to)) {
      const absolute = normalizeRange(value);
      Object.assign(value, { from: absolute.from, to: absolute.to });
    }
    const { from, to, key } = value;
    const addons = this.getAddons();
    const allTexts = this.allTexts();

    function isRelative(dateRange: DateRange): dateRange is RelativeDateRange {
      const isLegacyCustom = Object.keys(value).includes('key') && key === undefined;
      return (
        (dateRange.key &&
          (CONST.RELATIVE_PRESETS.map(e => e.key).includes(dateRange.key) ||
            dateRange.key === CONST.CUSTOM_RANGE_KEY)) ||
        isLegacyCustom
      );
    }

    let content: ReactNode | undefined;
    if (mode === MODES.FILTER) {
      content = (
        <Container>
          <RangeFilter
            texts={allTexts}
            value={value.filter}
            onCancel={this.handleFilterCancel}
            onApply={this.handleFilterApply}
            savedFilters={savedFilters}
            allowedFilterTypes={allowedFilterTypes}
            onFilterSave={onFilterSave}
            valueSelectionModes={filterValueSelectionModes}
            rangeDisplayMode={filterRangeDisplayMode}
          />
        </Container>
      );
    } else {
      const validator = validate ? validate(value) : { valid: true };
      const isValidAbsolute = !Object.keys(value).includes('key') && Boolean(from && to);

      const isValidRelative = isRelative(value) && Boolean(value.offset && value.duration);
      const isValidSince = value.type === 'SINCE' && Boolean(value.offset && value.duration);
      // TODO apply ranges and find mapped lifetime here, this applies only for defaultValueTransformer
      const isValid = (isValidAbsolute || isValidRelative || isValidSince || key === CONST.ALL_TIME) && validator.valid;
      const canSwitchToTimePicker =
        isValid && !isLifetime(value) && (!disableAbsoluteTimepickerInRelative || value.type === 'ABSOLUTE');

      content = (
        <Container className={containerClass}>
          <RangePicker
            showNowButton={showNowButton}
            value={normalizeRange(value)}
            onChange={this.handleRangeChange}
            mode={mode}
            disabledDate={disabledDate}
            onSwitchMode={this.handleSwitchMode}
            dateOnly={!showTime}
            canSwitchMode={canSwitchToTimePicker}
            texts={allTexts}
            forceAdjacentMonths={forceAdjacentMonths}
            intl={intl}
          />
          {addons.length > 0 && <Separator />}
          {addons.map(
            (addon, index: number): ReactNode => (
              <Addon last={addons.length === index + 1} className="addon-wrapper" key={addon.key}>
                {addon.content}
              </Addon>
            )
          )}
          <Footer
            canApply={isValid || isLifetime(value)}
            onApply={this.handleApply}
            dateOnly={!showTime}
            mode={mode}
            canSwitchMode={isValid}
            message={!validator.valid ? validator.message : null}
            onSwitchMode={this.handleSwitchMode}
            texts={allTexts}
            value={value}
            showTime={showTime}
            format={format}
            valueFormatOptions={valueFormatOptions}
            {...footerProps}
          />
        </Container>
      );
    }
    return (
      <PopupWrapper alignContentToTop={alignContentToTop} hasFilter={showFilter} hasRelativePicker={showRelativePicker}>
        {content}
      </PopupWrapper>
    );
  }
}

// @ts-ignore
export default injectIntl(RawDateRangePicker);
