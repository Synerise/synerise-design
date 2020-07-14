import * as React from 'react';
import { injectIntl } from 'react-intl';
import { omitBy, isUndefined } from 'lodash';
import { Container, Separator, Addon } from './DateRangePicker.styles';
import RangePicker from './RangePicker/RangePicker';
import { RELATIVE, ABSOLUTE, MODES } from './constants';
import relativeToAbsolute from './dateUtils/relativeToAbsolute';
import { Props, State } from './DateRangePicker.types';
import { DateFilter, DateRange } from './date.types';
import AddonCollapse from './AddonCollapse/AddonCollapse';
import RelativeRangePicker from './RelativeRangePicker/RelativeRangePicker';
import Footer from './Footer/Footer';
import { normalizeRange } from './utils';

class DateRangePicker extends React.PureComponent<Props, State> {
  static defaultProps = {
    relativeFuture: false,
    relativePast: true,
    showRelativePicker: true,
    showFilter: false,
    showTime: false,
    validate: (): { valid: boolean } => ({ valid: true }),
  };

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      mode: MODES.DATE,
      value: normalizeRange(props.value),
      changed: true,
    };
  }

  handleFilterCancel = (): void => {
    this.setState({ mode: MODES.DATE });
  };

  handleFilterApply = (filter?: DateFilter): void => {
    const { value } = this.state;
    this.setState({ mode: MODES.DATE, value: { ...value, filter }, changed: true });
  };

  handleRangeChange = (range: DateRange): void => {
    const { value } = this.state;
    const newValue = normalizeRange({ ...range, filter: value.filter });
    this.setState({ value: newValue, changed: true });
  };

  handleApply = (): void => {
    const { value } = this.state;
    const { forceAbsolute, onApply } = this.props;
    if (forceAbsolute && value.type === RELATIVE) {
      onApply &&
        onApply({
          ...value,
          ...relativeToAbsolute(value),
          type: value.type,
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

  render(): JSX.Element {
    const {
      showRelativePicker,
      showFilter,
      showTime,
      format,
      disabledDate,
      intl,
      validate,
      relativeFuture,
      relativePast,
      ranges,
    } = this.props;
    const { value, mode, changed } = this.state;
    const { from, to, key } = value;

    if (mode === MODES.FILTER)
      return (
        <Container>
          <div>RangeFilter placeholder</div>
        </Container>
      );

    const validator = validate(value);
    const isValid = (!!(from && to) || key === 'ALL_TIME') && validator.valid;
    const addons: React.ReactElement[] = [];
    if (showRelativePicker)
      addons.push(
        <AddonCollapse
          content={
            <RelativeRangePicker
              future={relativeFuture}
              past={relativePast}
              ranges={ranges}
              value={value}
              onChange={this.handleRangeChange}
            />
          }
          title={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.RELATIVE_DATE_RANGE' })}
          expanded
        />
      );
    if (showFilter)
      addons.push(
        <AddonCollapse
          content={<div>FilterSwitch Placholder</div>}
          title={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.FILTER' })}
          expanded
        />
      );
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
          intl={intl}
        />
        {addons.length > 0 && <Separator />}
        {addons.map(
          (addon, index: number): React.ReactNode => (
            // eslint-disable-next-line react/no-array-index-key
            <Addon key={index}>{addon}</Addon>
          )
        )}
        <Footer
          canApply={isValid && changed}
          onApply={this.handleApply}
          dateOnly={!showTime}
          mode={mode}
          canSwitchMode={isValid}
          message={!validator.valid ? validator.message : null}
          onSwitchMode={this.handleSwitchMode}
          texts={{ apply: intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.APPLY' }) }}
          value={value}
          showTime={showTime}
          format={format}
        />
      </Container>
    );
  }
}

export default injectIntl(DateRangePicker);
