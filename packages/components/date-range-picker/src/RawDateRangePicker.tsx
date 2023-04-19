import * as React from 'react';
import { omitBy, isUndefined } from 'lodash';
import { injectIntl } from 'react-intl';
import fnsIsValid from 'date-fns/isValid';
import { Container, Separator, Addon } from './DateRangePicker.styles';
import RangePicker from './RangePicker/RangePicker';
import { RELATIVE, ABSOLUTE, MODES, RELATIVE_PRESETS, ABSOLUTE_PRESETS } from './constants';
import * as CONST from './constants';
import relativeToAbsolute from './dateUtils/relativeToAbsolute';
import type { DateRangePickerProps, DateRangePickerProps as Props, State, AddonType } from './DateRangePicker.types';
import type { DateFilter, DateRange, RelativeDateRange } from './date.types';
import AddonCollapse from './AddonCollapse/AddonCollapse';
import RelativeRangePicker from './RelativeRangePicker/RelativeRangePicker';
import Footer from './Footer/Footer';
import { normalizeRange } from './utils';
import RangeFilter from './RangeFilter/RangeFilter';
import RangeFilterStatus from './RangeFilter/Shared/RangeFilterStatus/RangeFilterStatus';
import { FilterDefinition, FilterValue } from './RangeFilter/RangeFilter.types';
import { isLifetime } from './RelativeRangePicker/Elements/RangeDropdown/RangeDropdown';

export function defaultValueTransformer(value: DateRange): DateRange {
  if (value.key === 'ALL_TIME' || isLifetime(value)) {
    return { type: 'ABSOLUTE' };
  }
  const { id, timestamp, translationKey, filter } = value;
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

export class RawDateRangePicker extends React.PureComponent<DateRangePickerProps, State> {
  static defaultProps = {
    ranges: [...RELATIVE_PRESETS, ...ABSOLUTE_PRESETS],
    relativePast: true,
    showRelativePicker: true,
    validate: (): { valid: boolean } => ({ valid: true }),
    valueTransformer: defaultValueTransformer,
  };

  constructor(props: DateRangePickerProps) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      mode: MODES.DATE,
      value: normalizeRange(props.value),
      visibleAddonKey: '',
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    const { value } = this.props;
    if (prevProps.value !== value && !value) {
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

  handleRangeChange = (range?: DateRange): void => {
    if (!range) {
      return;
    }
    if (range.from && !fnsIsValid(range?.from)) {
      return;
    }

    const { onValueChange, valueTransformer } = this.props;
    const { value, mode } = this.state;
    const newValue = normalizeRange({ ...range, filter: value.filter });
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
    const { value } = this.state;
    const { forceAbsolute, onApply, valueTransformer } = this.props;
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
        from: value.type === ABSOLUTE && value.from instanceof Date ? value.from.toISOString() : undefined,
        to: value.type === ABSOLUTE && value.to instanceof Date ? value.to.toISOString() : undefined,
        type: value.type,
      } as DateRange;
      onApply(valueTransformer?.(valueToEmit) ?? valueToEmit);
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
      texts,
      intl,
      rangeUnits,
      showCustomRange,
      valueTransformer,
    } = this.props;
    const { value, visibleAddonKey } = this.state;
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
                texts={texts}
                rangeUnits={rangeUnits}
                showCustomRange={showCustomRange}
                valueTransformer={valueTransformer}
              />
            }
            expanded={addonKey === visibleAddonKey}
            title={texts?.relativeDateRange}
            onCollapseChange={(expanded): void => this.handleAddonCollapse(addonKey, expanded)}
            collapsedSummary={rangeTranslationKey && texts[rangeTranslationKey]}
          />
        ),
        key: addonKey,
      });
    }
    if (showFilter) {
      const addonKey = 'filter';
      const label = value?.filter
        ? intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.FILTER-ENABLED`, defaultMessage: 'Filter enabled' })
        : intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.ADD-FILTER`, defaultMessage: 'Add filter' });
      addons.push({
        content: (
          <AddonCollapse
            content={
              <RangeFilterStatus
                onFilterRemove={this.handleRemoveFilterClick}
                filter={value.filter}
                disabled={!value.from || !value.to}
                label={label}
                onClick={this.handleModalOpenClick}
              />
            }
            title={texts?.filter}
            expanded={addonKey === visibleAddonKey}
            onCollapseChange={(expanded): void => this.handleAddonCollapse(addonKey, expanded)}
            collapsedSummary={
              value?.filter?.type ? intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.${value?.filter?.type}` }) : null
            }
          />
        ),
        key: addonKey,
      });
    }
    return addons;
  };

  render(): JSX.Element {
    const {
      showTime,
      format,
      valueFormatOptions,
      disabledDate,
      validate,
      forceAdjacentMonths,
      texts,
      savedFilters,
      onFilterSave,
      intl,
      containerClass = 'ds-date-range-picker',
      footerProps,
      allowedFilterTypes,
      disableAbsoluteTimepickerInRelative = false,
    } = this.props;
    const { value, mode } = this.state;
    if (value.type === 'RELATIVE' && (!value.from || !value.to)) {
      const absolute = normalizeRange(value);
      Object.assign(value, { from: absolute.from, to: absolute.to });
    }
    const { from, to, key } = value;
    const addons = this.getAddons();
    if (mode === MODES.FILTER)
      return (
        <Container>
          <RangeFilter
            texts={texts}
            value={value.filter}
            onCancel={this.handleFilterCancel}
            onApply={this.handleFilterApply}
            savedFilters={savedFilters}
            allowedFilterTypes={allowedFilterTypes}
            onFilterSave={onFilterSave}
          />
        </Container>
      );

    const validator = validate ? validate(value) : { valid: true };
    const isValidAbsolute = !Object.keys(value).includes('key') && Boolean(from && to);
    function isRelative(dateRange: DateRange): dateRange is RelativeDateRange {
      const isLegacyCustom = Object.keys(value).includes('key') && key === undefined;
      return CONST.RELATIVE_PRESETS.map(e => e.key).includes(dateRange.key) || isLegacyCustom;
    }
    const isValidRelative = isRelative(value) && Boolean(value.offset && value.duration);
    const isValidSince = value.type === 'SINCE' && Boolean(value.offset && value.duration);
    // TODO apply ranges and find mapped lifetime here, this applies only for defaultValueTransformer
    const isValid = (isValidAbsolute || isValidRelative || isValidSince || key === CONST.ALL_TIME) && validator.valid;
    const canSwitchToTimePicker = isValid && (!disableAbsoluteTimepickerInRelative || value.type === 'ABSOLUTE');

    return (
      <Container className={containerClass}>
        <RangePicker
          value={value}
          onChange={this.handleRangeChange}
          mode={mode}
          disabledDate={disabledDate}
          onSwitchMode={this.handleSwitchMode}
          dateOnly={!showTime}
          canSwitchMode={canSwitchToTimePicker}
          texts={texts}
          forceAdjacentMonths={forceAdjacentMonths}
          intl={intl}
        />
        {addons.length > 0 && <Separator />}
        {addons.map(
          (addon, index: number): React.ReactNode => (
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
          texts={texts}
          value={value}
          showTime={showTime}
          format={format}
          valueFormatOptions={valueFormatOptions}
          {...footerProps}
        />
      </Container>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(RawDateRangePicker);
