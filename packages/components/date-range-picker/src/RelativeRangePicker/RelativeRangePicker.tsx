import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as S from './RelativeRangePicker.styles';
import * as CONST from '../constants';
import getRelativePresetForRange from '../dateUtils/getRelativePresetForRange';
import { Props, State } from './RelativeRangePicker.types';
import { DateRange, RelativeDateRange } from '../date.types';
import RangeButtons from './Elements/RangeButtons/RangeButtons';
import RangeDropdown from './Elements/RangeDropdown/RangeDropdown';
import CustomRangeForm from './Elements/CustomRangeForm/CustomRangeForm';
import {
  getCurrentGroupFromProps,
  RANGES_MODE,
  getDefaultCustomRange,
  setFuture,
  setOffsetValue,
  setDurationValue,
} from './utils';
import { fnsIsAfter } from '../fns';
import { DEFAULT_RANGE, normalizeRange } from '../utils';
import { RelativeMode } from '../DateRangePicker.types';
import { CUSTOM_RANGE_KEY } from '../constants';

class RelativeRangePicker extends React.PureComponent<Props & WrappedComponentProps, State> {
  static defaultProps: Partial<Props> = {
    ranges: [...CONST.RELATIVE_PRESETS, ...CONST.ABSOLUTE_PRESETS],
    relativeModes: ['PAST', 'FUTURE'],
    rangeUnits: CONST.RELATIVE_UNITS,
    showCustomRange: true,
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
    const currentRange = value && value.type === CONST.RELATIVE ? getRelativePresetForRange(value) : DEFAULT_RANGE;
    state.currentRange = currentRange as RelativeDateRange;
    state.groupedRanges = ranges;
    if (state.groupedRanges) {
      if (!relativeModes?.includes('PAST')) {
        state.groupedRanges = state.groupedRanges.filter(preset => preset.future);
      }
      if (!relativeModes?.includes('FUTURE')) {
        state.groupedRanges = state.groupedRanges.filter(preset => !preset.future);
      }
    }

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

  onModeChange = (mode: RelativeMode | null): void => {
    this.setState({ currentGroup: mode }, () => this.onChange(DEFAULT_RANGE));
  };

  onTimestampChange = (timestamp: Date | undefined): void => {
    this.setState({ sinceTimestamp: timestamp });
    if (!timestamp) {
      const { onChange } = this.props;
      const updatedRange = normalizeRange({ to: undefined, from: undefined } as RelativeDateRange);
      onChange(updatedRange);
    }
  };

  handleCustomClick = (): void => {
    const { onChange } = this.props;
    const { currentGroup, currentRange } = this.state;
    if (currentGroup !== RANGES_MODE.SINCE) {
      const sourceRange = getDefaultCustomRange(currentGroup);
      onChange({ ...sourceRange, key: undefined, translationKey: CUSTOM_RANGE_KEY });
    } else {
      onChange({ ...currentRange, key: undefined, translationKey: CUSTOM_RANGE_KEY });
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

  onOffsetValueChange = (value: string | number | undefined): void => {
    const { currentRange } = this.state;
    if (typeof value === 'number' && value >= 0 && currentRange) {
      const changes = setOffsetValue(value, currentRange);
      this.onChange(changes);
    }
  };

  onDurationValueChange = (value: string | number | undefined): void => {
    const { currentRange } = this.state;
    if (value && currentRange) {
      const changes = setDurationValue(value, currentRange);
      this.onChange(changes);
    }
  };

  renderCustomRangeForm = (): React.ReactNode => {
    const { currentRange, currentGroup, sinceTimestamp } = this.state;
    const { ranges, texts, relativeModes, rangeUnits } = this.props;
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
        rangeUnits={rangeUnits}
      />
    );
  };

  render(): React.ReactNode {
    const { texts, value, showCustomRange } = this.props;
    const { groupedRanges, currentGroup, currentRange } = this.state;
    const isCustomValue = !value?.key || !currentRange?.key;
    const visibleRanges = groupedRanges ? groupedRanges.slice(0, 3) : [];
    const hiddenRanges = groupedRanges ? groupedRanges.slice(3) : [];
    if (!currentGroup) return null;
    return (
      <S.Container>
        <S.Ranges>
          {showCustomRange && (
            <S.Range
              key={CUSTOM_RANGE_KEY}
              onClick={this.handleCustomClick}
              type={isCustomValue ? 'primary' : 'tertiary'}
            >
              {texts?.custom}
            </S.Range>
          )}
          {this.renderRanges(visibleRanges)}
          {this.renderRangesDropdown(hiddenRanges)}
        </S.Ranges>
        {isCustomValue && showCustomRange && this.renderCustomRangeForm()}
      </S.Container>
    );
  }
}

export default injectIntl(RelativeRangePicker);
