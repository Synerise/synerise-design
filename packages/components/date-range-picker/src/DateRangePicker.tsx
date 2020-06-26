import * as React from 'react';
import { ReactElement } from 'react';
import { injectIntl } from 'react-intl';
import fnsMin from 'date-fns/min';
import fnsMax from 'date-fns/max';
import fnsStartOfDay from 'date-fns/start_of_day';
import { omitBy, isUndefined } from 'lodash';

import Footer from '@synerise/ds-date-picker/dist/Elements/Footer/Footer';
import { Container, Separator, Addon } from './DateRangePicker.styles';
import RangeFilter from './RangeFilter/RangeFilter';
import RelativeRangePicker from './RelativeRangePicker/RelativeRangePicker';
import FilterSwitch from './RangeFilter/FilterSwitch/FilterSwitch';
import RangePicker from './RangePicker/RangePicker';
import { RELATIVE, ABSOLUTE } from './constants';
import ADD from './dateUtils/add'
import START_OF from './dateUtils/startOf';
import END_OF from './dateUtils/endOf';
import fnsFormat from './dateUtils/format';
import relativeToAbsolute from './dateUtils/relativeToAbsolute';
import { Props, State } from './DateRangePicker.types';
import { DateRange, DateFilter } from '../../types/Dates';

export const normalizeRange = (range: DateRange): DateRange => {
  if (!range || !range.type) {
    return { type: ABSOLUTE, from: fnsStartOfDay(new Date()), to: new Date() };
  } else if (range.type === RELATIVE) {
    const { future, offset, duration } = range;
    const now = new Date();
    let left;
    let right;

    if (future) {
      left = ADD[offset.type](START_OF[offset.type](now), offset.value);
      right = ADD[duration.type](END_OF[duration.type](left), duration.value - 1);
    } else {
      right = ADD[offset.type](END_OF[offset.type](now), -offset.value);
      left = ADD[duration.type](START_OF[duration.type](right), 1 - duration.value);
    }

    const from = fnsMin(left, right);
    const to = fnsMax(left, right);
    return { ...range, type: RELATIVE, from, to, offset, duration, future };
  } else {
    const from = range.from ? (typeof range.from === 'string' ? new Date(range.from) : range.from) : undefined;
    const to = range.to ? (typeof range.to === 'string' ? new Date(range.to) : range.to) : undefined;
    return { ...range, type: ABSOLUTE, from, to };
  }
};

class DateRangePicker extends React.PureComponent<Props, State> {
  static defaultProps = {
    relativeFuture: false,
    relativePast: true,
    showRelativePicker: true,
    showFilter: false,
    showTime: false,
    validate: () => ({ valid: true }),
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: 'date',
      value: normalizeRange(props.value),
      changed: true,
    };
  }

  componentWillReceiveProps({ value }: Props) {
    if (value !== this.props.value) this.setState({ mode: 'date', value: normalizeRange(value), changed: false });
  }

  handleFilterCancel = () => this.setState({ mode: 'date' });

  handleFilterApply = (filter?: DateFilter) =>
    this.setState({ mode: 'date', value: { ...this.state.value, filter }, changed: true });

  handleRangeChange = (range: DateRange) =>
    this.setState({ value: normalizeRange({ ...range, filter: this.state.value.filter }), changed: true });

  handleModeSwitch = (mode: string) => this.setState({ mode });

  handleApply = () => {
    const { value } = this.state;
    const { forceAbsolute } = this.props;
    this.props.onApply &&
      this.props.onApply(
        forceAbsolute && value.type === RELATIVE
          ? {
              ...value,
              ...relativeToAbsolute(value),
            }
          : value.key === 'ALL_TIME'
          ? omitBy(value, isUndefined)
          : {
              ...value,
              from: value.type === ABSOLUTE ? value.from instanceof Date && value.from.toISOString() : null,
              to: value.type === ABSOLUTE ? value.to instanceof Date && value.to.toISOString() : null,
            }
      );
  };

  onOpenModalButtonClick = () => this.handleModeSwitch('filter');

  onRemoveFilterButtonClick = () => this.handleFilterApply(undefined);

  onSwitchMode = () => this.handleModeSwitch(this.state.mode === 'time' ? 'date' : 'time');

  render() {
    const {
      showRelativePicker,
      showFilter,
      showTime,
      format,
      ranges,
      disabledDate,
      relativeFuture,
      relativePast,
      intl,
      validate,
    } = this.props;
    const { value, mode, changed } = this.state;
    const { from, to, filter, key } = value;
    if (mode === 'filter')
      return (
        <Container>
          <RangeFilter value={filter} onCancel={this.handleFilterCancel} onApply={this.handleFilterApply} />
        </Container>
      );
    const footerFormat = format || (showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
    let footerText = '';
    if (from) {
      footerText += fnsFormat(from, footerFormat, intl.locale);
    }
    if (to) {
      footerText += ' - ' + fnsFormat(to, footerFormat, intl.locale);
    }
    const validator = validate(value);
    const isValid = (!!(from && to) || key === 'ALL_TIME') && validator.valid;
    const addons: ReactElement[] = [];
    if (showRelativePicker)
      addons.push(
        <RelativeRangePicker
          future={relativeFuture}
          past={relativePast}
          ranges={ranges}
          value={value}
          onChange={this.handleRangeChange}
        />
      );
    if (showFilter)
      addons.push(
        <FilterSwitch
          isOn={filter}
          translations={{ enableFilter: intl.formatMessage({ id: 'SNRS.DATE.ENABLE_FILTER' }) }}
          onOpenModalButtonClick={this.onOpenModalButtonClick}
          onRemoveFilterButtonClick={this.onRemoveFilterButtonClick}
          statusInnerHtml={{ __html: intl.formatMessage({ id: 'SNRS.FILTER-SWITCH.FILTER_IS_ON' }) }}
        />
      );
    return (
      <Container>
        <RangePicker value={value} onChange={this.handleRangeChange} mode={mode} disabledDate={disabledDate} />
        {addons.length > 0 && mode !== 'time' && <Separator />}
        {addons.map((addon, index) => (
          <Addon key={index}>{addon}</Addon>
        ))}
        <Footer
          text={footerText}
          canApply={isValid && changed}
          onApply={this.handleApply}
          dateOnly={!showTime}
          mode={mode}
          canSwitchMode={isValid}
          message={!validator.valid ? validator.message : null}
          onSwitchMode={this.onSwitchMode}
          texts ={{selectTime:'Select time',
          selectDate:'Select date',
          apply:'Apply',
          now:'now'}}
        />
      </Container>
    );
  }
}

export default injectIntl(DateRangePicker);
