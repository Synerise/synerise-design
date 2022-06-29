import * as React from 'react';
import { omitBy, isUndefined } from 'lodash';
import { injectIntl } from 'react-intl';
import fnsIsValid from 'date-fns/isValid';
import { Container, Separator, Addon } from './DateRangePicker.styles';
import RangePicker from './RangePicker/RangePicker';
import { RELATIVE, ABSOLUTE, MODES, RELATIVE_PRESETS, ABSOLUTE_PRESETS } from './constants';
import relativeToAbsolute from './dateUtils/relativeToAbsolute';
import { Props, State, AddonType } from './DateRangePicker.types';
import { DateFilter, DateRange } from './date.types';
import AddonCollapse from './AddonCollapse/AddonCollapse';
import RelativeRangePicker from './RelativeRangePicker/RelativeRangePicker';
import Footer from './Footer/Footer';
import { normalizeRange } from './utils';
import RangeFilter from './RangeFilter/RangeFilter';
import RangeFilterStatus from './RangeFilter/Shared/RangeFilterStatus/RangeFilterStatus';
import { FilterDefinition, FilterValue } from './RangeFilter/RangeFilter.types';

export class RawDateRangePicker extends React.PureComponent<Props, State> {
  static defaultProps = {
    ranges: [...RELATIVE_PRESETS, ...ABSOLUTE_PRESETS],
    relativePast: true,
    showRelativePicker: true,
    validate: (): { valid: boolean } => ({ valid: true }),
  };

  constructor(props: Props) {
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

    const { onValueChange } = this.props;
    const { value, mode } = this.state;
    const newValue = normalizeRange({ ...range, filter: value.filter });
    if (newValue.type === 'RELATIVE' && mode === MODES.TIME) {
      // clicked on RangeButtons and was selecting time
      this.setState({ mode: MODES.DATE });
    }
    this.setState({ value: { ...newValue, key: range?.key, translationKey: range?.translationKey } });
    onValueChange && onValueChange(newValue);
  };

  handleApply = (): void => {
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
    if (value.key === 'ALL_TIME') {
      onApply && onApply(omitBy(value, isUndefined));
      return;
    }

    onApply &&
      onApply({
        ...value,
        from: value.type === ABSOLUTE && value.from instanceof Date ? value.from.toISOString() : undefined,
        to: value.type === ABSOLUTE && value.to instanceof Date ? value.to.toISOString() : undefined,
        type: value.type,
      });
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
      addons.push({
        content: (
          <AddonCollapse
            content={
              <RangeFilterStatus
                onFilterRemove={this.handleRemoveFilterClick}
                filter={value.filter}
                disabled={!value.from || !value.to}
                label={value?.filter ? 'Filter enabled' : 'Add filter'}
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
    const { showTime, format, disabledDate, validate, forceAdjacentMonths, texts, savedFilters, onFilterSave, intl } =
      this.props;
    const { value, mode } = this.state;
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
            onFilterSave={onFilterSave}
          />
        </Container>
      );

    const validator = validate ? validate(value) : { valid: true };
    const isValid = (!!(from && to) || key === 'ALL_TIME') && validator.valid;

    return (
      <Container className="ds-date-range-picker">
        <RangePicker
          value={value}
          onChange={this.handleRangeChange}
          mode={mode}
          disabledDate={disabledDate}
          onSwitchMode={this.handleSwitchMode}
          dateOnly={!showTime}
          canSwitchMode={isValid}
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
          canApply={isValid}
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
        />
      </Container>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(RawDateRangePicker);
