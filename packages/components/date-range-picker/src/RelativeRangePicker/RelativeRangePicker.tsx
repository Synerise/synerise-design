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
} from './utils';
import { fnsIsAfter } from '../fns';
import { normalizeRange } from '../utils';
import { RelativeMode } from '../DateRangePicker.types';

class RelativeRangePicker extends React.PureComponent<Props, State> {
  static defaultProps = {
    ranges: CONST.RELATIVE_PRESETS,
    relativeModes: ['PAST', 'FUTURE'],
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
      sinceTimestamp: new Date(),
    };
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    const { ranges, value, future, past, relativeModes } = nextProps;
    const state = prevState;
    const currentRange =
      value && (value.type === CONST.RELATIVE || isAbsolute(value)) ? getValueForRelativeRange(value) : ranges[0];
    state.currentRange = currentRange as RelativeDateRange;
    state.groupedRanges = ranges;
    if (
      future !== prevState.future ||
      past !== prevState.past ||
      (relativeModes && !relativeModes.includes(state.currentGroup as RelativeMode))
    ) {
      state.currentGroup = getCurrentGroupFromProps(nextProps);
      state.future = prevState.future;
      state.past = prevState.past;
    }
    return state;
  }

  onModeChange = (mode: string | null): void => {
    this.setState({ currentGroup: mode });
  };

  onTimestampChange = (timestamp: Date | undefined): void => {
    this.setState({ sinceTimestamp: timestamp });
    if (!timestamp) {
      const { onChange } = this.props;
      onChange(normalizeRange({ to: undefined, from: undefined } as RelativeDateRange));
    }
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
    const { onChange, texts, value } = this.props;
    return <RangeButtons ranges={ranges} currentRange={currentRange} value={value} texts={texts} onChange={onChange} />;
  };

  renderRangesDropdown = (ranges: DateRange[]): React.ReactNode => {
    const { currentRange } = this.state;
    const { onChange, texts } = this.props;
    return <RangeDropdown ranges={ranges} currentRange={currentRange} texts={texts} onChange={onChange} />;
  };

  onOffsetValueChange = (value: number | undefined): void => {
    const { currentRange } = this.state;
    if (typeof value === 'number' && value >= 0 && currentRange) {
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
    const { currentRange, currentGroup, sinceTimestamp } = this.state;
    const { ranges, texts, relativeModes } = this.props;
    return (
      <CustomRangeForm
        handleModeChange={this.onModeChange}
        ranges={ranges}
        currentRange={currentRange}
        currentGroup={currentGroup}
        handleChange={this.onChange}
        handleDurationValueChange={this.onDurationValueChange}
        handleOffsetValueChange={this.onOffsetValueChange}
        handleTimestampChange={this.onTimestampChange}
        timestamp={sinceTimestamp}
        relativeModes={relativeModes || []}
        texts={texts}
      />
    );
  };

  render(): React.ReactNode {
    const { texts } = this.props;
    const { groupedRanges, currentGroup, currentRange } = this.state;
    const visibleRanges = (groupedRanges as []).slice(0, 3);
    const hiddenRanges = (groupedRanges as []).slice(3);
    if (!currentGroup) return null;
    return (
      <S.Container>
        <S.Ranges>
          <S.Range
            key="CUSTOM"
            onClick={this.handleCustomClick}
            type={currentRange && !currentRange.key ? 'primary' : 'tertiary'}
          >
            {texts?.custom}
          </S.Range>
          {this.renderRanges(visibleRanges)}
          {this.renderRangesDropdown(hiddenRanges)}
        </S.Ranges>
        {this.renderCustomRangeForm()}
      </S.Container>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(RelativeRangePicker);
