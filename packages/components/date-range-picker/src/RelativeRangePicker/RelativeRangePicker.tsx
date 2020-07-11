import * as React from 'react';
import { injectIntl } from 'react-intl';
import * as S from './RelativeRangePicker.styles';
import * as CONST from '../constants';
import getValueForRelativeRange from '../dateUtils/getValueForRelativeRange';
import { Props, State } from './RelativeRangePicker.types';
import { DateRange, RelativeDateRange } from '../date.types';
import RangeButtons from './Elements/RangeButtons/RangeButtons';
import RangeDropdown from './Elements/RangeDropdown/RangeDropdown';
import CustomRangeForm from './Elements/CustomRangeForm/CustomRangeForm';
import {
  getCurrentGroupFromProps,
  RANGES_MODE,
  isAbsolute,
  getDefaultCustomRange,
  setFuture,
  setOffsetValue,
  setDurationValue,
  GROUPS,
} from './utils';

class RelativeRangePicker extends React.PureComponent<Props, State> {
  static defaultProps = {
    ranges: CONST.RELATIVE_PRESETS,
  };

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line
    // @ts-ignore
    // eslint-disable-next-line
    this.state = {
      currentGroup: getCurrentGroupFromProps(props),
      future: props.future || false,
      past: props.past || true,
      showCustomForm: true,
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    const { ranges, value, future, past } = nextProps;
    const state = prevState;
    const currentRange =
      value && (value.type === CONST.RELATIVE || isAbsolute(value)) ? getValueForRelativeRange(value) : ranges[0];
    state.currentRange = currentRange as RelativeDateRange;
    state.groupedRanges = ranges.reduce(
      (acc, range: RelativeDateRange) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        acc[range.future ? GROUPS.FUTURE : GROUPS.PAST].push(range);
        return acc;
      },
      { [GROUPS.PAST]: [], [GROUPS.FUTURE]: [] }
    );
    if (future !== prevState.future || past !== prevState.past) {
      state.currentGroup = getCurrentGroupFromProps(nextProps);
      state.future = prevState.future;
      state.past = prevState.past;
    }
    return state;
  }

  handleTogglingPastRanges = (mode: string | null): void => {
    const { onChange } = this.props;
    const { currentRange } = this.state;

    this.setState({ currentGroup: mode }, () => {
      if (currentRange) {
        onChange({ ...currentRange, key: undefined, future: mode === RANGES_MODE.FUTURE });
      }
    });
  };

  handleCustomClick = (): void => {
    const { onChange } = this.props;
    const { currentGroup } = this.state;
    const sourceRange = getDefaultCustomRange(currentGroup);
    onChange({ ...sourceRange, key: undefined });
  };

  handleChange = (value: RelativeDateRange): void => {
    const { currentGroup } = this.state;
    const { onChange } = this.props;
    onChange({ ...setFuture(currentGroup === RANGES_MODE.FUTURE, value), key: undefined });
  };

  renderRanges = (ranges: DateRange[]): React.ReactNode => {
    if (!ranges || ranges.length === 0) return null;
    const { currentRange } = this.state;
    const { onChange, intl, value } = this.props;
    return <RangeButtons ranges={ranges} currentRange={currentRange} value={value} intl={intl} onChange={onChange} />;
  };

  renderRangesDropdown = (ranges: DateRange[]): React.ReactNode => {
    const { currentRange } = this.state;
    const { onChange, intl } = this.props;
    return <RangeDropdown ranges={ranges} currentRange={currentRange} intl={intl} onChange={onChange} />;
  };

  handleOffsetValueChange = (value: number | undefined): void => {
    const { currentRange } = this.state;
    currentRange && value && this.handleChange(setOffsetValue(value, currentRange));
  };

  handleDurationValueChange = (value: number | undefined): void => {
    const { currentRange } = this.state;
    currentRange && value && this.handleChange(setDurationValue(value, currentRange));
  };

  renderCustomRangeForm = (): React.ReactNode => {
    const { currentRange, currentGroup } = this.state;
    const { ranges, intl, value } = this.props;
    return (
      <CustomRangeForm
        // eslint-disable-next-line react/jsx-handler-names
        handleModeChange={this.handleTogglingPastRanges}
        ranges={ranges}
        currentRange={currentRange}
        currentGroup={currentGroup}
        value={value}
        intl={intl}
        // eslint-disable-next-line react/jsx-handler-names
        handleChange={this.handleChange}
        // eslint-disable-next-line react/jsx-handler-names
        handleDurationValueChange={this.handleDurationValueChange}
        // eslint-disable-next-line react/jsx-handler-names
        handleOffsetValueChange={this.handleOffsetValueChange}
      />
    );
  };

  render(): React.ReactNode {
    const { intl } = this.props;
    const { groupedRanges, currentGroup, showCustomForm, currentRange } = this.state;
    if (!currentGroup) return null;
    const ranges =
      groupedRanges && groupedRanges[currentGroup]
        ? groupedRanges[currentGroup].reduce(
            (acc: DateRange[], range: DateRange, index: number) => {
              acc[index > 2 ? 'hidden' : 'visible'].push(range);
              return acc;
            },
            { visible: [], hidden: [] }
          )
        : [];
    return (
      <S.Container>
        <S.Ranges>
          {(currentGroup === RANGES_MODE.PAST || currentGroup === RANGES_MODE.FUTURE) && (
            <S.Range
              key="CUSTOM"
              onClick={this.handleCustomClick}
              type={currentRange && !currentRange.key ? 'primary' : undefined}
            >
              {intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.CUSTOM' })}
            </S.Range>
          )}
          {this.renderRanges(ranges.visible)}
          {this.renderRangesDropdown(ranges.hidden)}
        </S.Ranges>
        {showCustomForm && currentRange && !isAbsolute(currentRange) && this.renderCustomRangeForm()}
      </S.Container>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(RelativeRangePicker);
