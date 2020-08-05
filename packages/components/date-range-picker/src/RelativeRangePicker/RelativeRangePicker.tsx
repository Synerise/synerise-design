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
import { fnsIsAfter } from '../fns';
import { normalizeRange } from '../utils';

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

  onModeChange = (mode: string | null): void => {
    const { currentRange } = this.state;
    this.setState({ currentGroup: mode }, () => {
      const updatedState = {
        ...currentRange,
        duration: {
          ...currentRange.duration,
          value: currentRange.duration.value > 1 ? currentRange.duration.value : 1,
        },
        offset: {
          ...currentRange.offset,
          value: currentRange.offset.value > 1 ? currentRange.offset.value : 1,
        },
        key: undefined,
        future: mode === RANGES_MODE.FUTURE,
      };
      this.onChange(updatedState);
    });
  };

  handleCustomClick = (): void => {
    const { onChange } = this.props;
    const { currentGroup } = this.state;
    if (currentGroup !== RANGES_MODE.SINCE) {
      const sourceRange = getDefaultCustomRange(currentGroup);
      onChange({ ...sourceRange, key: undefined });
    }
  };

  onChange = (value: DateRange): void => {
    const { currentGroup } = this.state;
    const { onChange } = this.props;
    const isFuture = value.timestamp && fnsIsAfter(value.timestamp, new Date());
    const changes = {
      ...setFuture(currentGroup === RANGES_MODE.FUTURE || isFuture, value),
      key: undefined,
    };
    onChange(normalizeRange(changes));
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

  onOffsetValueChange = (value: number | undefined): void => {
    const { currentRange } = this.state;
    if (value && currentRange) {
      const changes = setOffsetValue(value, currentRange);
      this.onChange(changes);
    }
  };

  onDurationValueChange = (value: number | undefined): void => {
    const { currentRange } = this.state;
    if (value && currentRange) {
      const changes = setDurationValue(value, currentRange);
      this.onChange(changes);
    }
  };

  renderCustomRangeForm = (): React.ReactNode => {
    const { currentRange, currentGroup } = this.state;
    const { ranges, intl } = this.props;
    return (
      <CustomRangeForm
        handleModeChange={this.onModeChange}
        ranges={ranges}
        currentRange={currentRange}
        currentGroup={currentGroup}
        intl={intl}
        handleChange={this.onChange}
        handleDurationValueChange={this.onDurationValueChange}
        handleOffsetValueChange={this.onOffsetValueChange}
      />
    );
  };

  render(): React.ReactNode {
    const { intl } = this.props;
    const { groupedRanges, currentGroup, currentRange } = this.state;
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
          <S.Range
            key="CUSTOM"
            onClick={this.handleCustomClick}
            type={currentRange && !currentRange.key ? 'primary' : 'tertiary'}
          >
            {intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.CUSTOM' })}
          </S.Range>
          {this.renderRanges(ranges.visible)}
          {this.renderRangesDropdown(ranges.hidden)}
        </S.Ranges>
        {this.renderCustomRangeForm()}
      </S.Container>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(RelativeRangePicker);
