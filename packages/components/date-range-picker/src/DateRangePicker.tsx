import * as React from 'react';
import { injectIntl } from 'react-intl';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsMin from 'date-fns/min';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsMax from 'date-fns/max';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfDay from 'date-fns/start_of_day';
import { omitBy, isUndefined } from 'lodash';

import Footer from '@synerise/ds-date-picker/dist/Elements/Footer/Footer';
import { Container, Separator, Addon } from './DateRangePicker.styles';
import RangePicker from './RangePicker/RangePicker';
import { RELATIVE, ABSOLUTE } from './constants';
import ADD from './dateUtils/add';
import START_OF from './dateUtils/startOf';
import END_OF from './dateUtils/endOf';
import fnsFormat from './dateUtils/format';
import relativeToAbsolute from './dateUtils/relativeToAbsolute';
import { Props, State } from './DateRangePicker.types';
import { DateFilter, DateRange } from './date.types';
import getDateFromString from './dateUtils/getDateFromString';
import AddonCollapse from './AddonCollapse/AddonCollapse';

export const normalizeRange = (range: DateRange): DateRange => {
  if (!range || !range.type) {
    return { type: ABSOLUTE, from: fnsStartOfDay(new Date()), to: new Date() };
  }
  if (range.type === RELATIVE) {
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
  }
  const from = range.from ? getDateFromString(range.from) : undefined;
  const to = range.to ? getDateFromString(range.to) : undefined;
  return { ...range, type: ABSOLUTE, from, to };
};

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
      mode: 'date',
      value: normalizeRange(props.value),
      changed: true,
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps({ value:newValue }: Props): void {
    const { value } = this.props;
    if (newValue !== value) this.setState({ mode: 'date', value: normalizeRange(newValue), changed: false });
  }

  handleFilterCancel = (): void => {
    this.setState({ mode: 'date' });
  };

  handleFilterApply = (filter?: DateFilter): void => {
    const { value } = this.state;
    this.setState({ mode: 'date', value: { ...value, filter }, changed: true });
  };

  handleRangeChange = (range: DateRange): void => {
    const { value } = this.state;
    this.setState({ value: normalizeRange({ ...range, filter: value.filter }), changed: true });
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
    this.setState({ mode: 'filter' });
  };

  handleRemoveFilterClick = (): void => {
    this.handleFilterApply(undefined);
  };

  handleSwitchMode = (): void => {
    const { mode } = this.state;
    const updatedMode = mode === 'time' ? 'date' : 'time';
    this.setState({ mode: updatedMode });
  };

  render(): JSX.Element {
    const { showRelativePicker, showFilter, showTime, format, disabledDate, intl, validate } = this.props;
    const { value, mode, changed } = this.state;
    const { from, to, key } = value;
    if (mode === 'filter')
      return (
        <Container>
          <div>RangeFilter placeholder</div>
        </Container>
      );
    const footerFormat = format || (showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
    let footerText = '';
    if (from) {
      footerText += fnsFormat(getDateFromString(from), footerFormat, intl.locale);
    }
    if (to) {
      footerText += ` - ${fnsFormat(getDateFromString(to), footerFormat, intl.locale)}`;
    }
    const validator = validate(value);
    const isValid = (!!(from && to) || key === 'ALL_TIME') && validator.valid;
    const addons: React.ReactElement[] = [];
    if (showRelativePicker)
      addons.push(
        <AddonCollapse
          content={<div>FilterSwitch Placholder</div>}
          title={intl.formatMessage({ id: 'SNRS.DATE.RELATIVE_DATE_RANGE' })}
          expanded
        />
      );
    if (showFilter)
      addons.push(<AddonCollapse content={<div>FilterSwitch Placholder</div>} title="Filter" expanded />);
    return (
      <Container>
        <RangePicker value={value} onChange={this.handleRangeChange} mode={mode} disabledDate={disabledDate} />
        {addons.length > 0 && mode !== 'time' && <Separator />}
        {addons.map(
          (addon, index: number): React.ReactNode => (
            // eslint-disable-next-line react/no-array-index-key
            <Addon key={index}>{addon}</Addon>
          )
        )}
        <Footer
          text={footerText}
          canApply={isValid && changed}
          onApply={this.handleApply}
          dateOnly={!showTime}
          mode={mode}
          canSwitchMode={isValid}
          message={!validator.valid ? validator.message : null}
          onSwitchMode={this.handleSwitchMode}
          texts={{ apply: 'Apply', now: 'now' }}
        />
      </Container>
    );
  }
}

export default injectIntl(DateRangePicker);
