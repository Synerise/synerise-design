import * as React from 'react';
import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import find from 'ramda/src/find';
import { injectIntl } from 'react-intl';
import Icon from '@synerise/ds-icon';
import Select from '@synerise/ds-select';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import InputNumber from '@synerise/ds-input-number';
import {
  Container,
  Header,
  Title,
  Help,
  Ranges,
  Range,
  CustomForm,
  InputSelectGroup,
} from './RelativeRangePicker.styles';
import * as CONST from '../constants';
import getValueForRelativeRange from '../dateUtils/getValueForRelativeRange';
import { GroupRange, Props, State } from './RelativeRangePicker.types';
import { DateRange, RelativeDateRange } from '../date.types';

const setOffsetType = set(lensPath(['offset', 'type']));
const setOffsetValue = (value: number | string, currentRange: RelativeDateRange): RelativeDateRange => {
  const updatedValue = value === '' ? null : value;
  return set(lensPath(['offset', 'value']))(
    typeof updatedValue === 'number' && updatedValue >= 0 ? Math.round(updatedValue) : 0,
    currentRange
  );
};
const setDurationType = set(lensPath(['duration', 'type']));
const setDurationValue = (value: number | string, currentRange: RelativeDateRange): RelativeDateRange => {
  const updatedValue = value === '' ? null : value;
  return set(lensPath(['duration', 'value']))(
    typeof updatedValue === 'number' && updatedValue >= 1 ? Math.round(updatedValue) : 1,
    currentRange
  );
};
const setFuture = set(lensPath(['future']));

const GROUPS = {
  PAST: 'PAST',
  FUTURE: 'FUTURE',
};

const getDefaultCustomRange = (currentGroup: string | null): RelativeDateRange => ({
  type: CONST.RELATIVE,
  from: undefined,
  to: undefined,
  future: currentGroup === GROUPS.FUTURE,
  offset: { type: 'DAYS', value: 0 },
  duration: { type: 'DAYS', value: 30 },
});

const isAbsolute = (value: DateRange): boolean => value.type === CONST.ABSOLUTE && !value.from && !value.to;

function getCurrentGroupFromProps({ future, past }: { future: boolean; past: boolean }): string | null {
  if (past) {
    return GROUPS.PAST;
  }
  if (future) {
    return GROUPS.FUTURE;
  }
  return null;
}

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

    const currentRange =
      value && (value.type === CONST.RELATIVE || isAbsolute(value)) ? getValueForRelativeRange(value) : ranges[0];
    const newRange = currentRange;
    const newGroupedRanges: GroupRange = ranges.reduce(
      (acc, range: RelativeDateRange) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        acc[range.future ? GROUPS.FUTURE : GROUPS.PAST].push(range);
        return acc;
      },
      { [GROUPS.PAST]: [], [GROUPS.FUTURE]: [] }
    );

    const futureOrPastChanged = future !== prevState.future || past !== prevState.past;
    return {
      showCustomForm: prevState.showCustomForm,
      currentRange: newRange as RelativeDateRange,
      groupedRanges: newGroupedRanges,
      currentGroup: getCurrentGroupFromProps(nextProps),
      future: futureOrPastChanged ? prevState.future : nextProps.future,
      past: futureOrPastChanged ? prevState.past : nextProps.past,
    };
  }

  handleTogglingPastRanges = (): void => {
    const { onChange } = this.props;
    const { currentRange, currentGroup } = this.state;
    this.setState({ currentGroup: currentGroup === GROUPS.PAST ? GROUPS.FUTURE : GROUPS.PAST }, () => {
      if (currentRange) {
        onChange({ ...currentRange, key: undefined, future: currentGroup === GROUPS.FUTURE });
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
    onChange({ ...setFuture(currentGroup === GROUPS.FUTURE, value), key: undefined });
  };

  renderRanges = (ranges: DateRange[]): React.ReactNode => {
    if (!ranges || ranges.length === 0) return null;
    const { currentRange } = this.state;
    const { onChange, intl, value } = this.props;
    return ranges.map((range) => (
      <Range
        key={range.key || range.id}
        onClick={(): void => {
          onChange(range);
        }}
        type={
          (currentRange && currentRange.key === range.key && value.type === CONST.RELATIVE) ||
          (isAbsolute(currentRange) && range.key === 'ALL_TIME')
            ? 'primary'
            : undefined
        }
      >
        {range.translationKey ? intl.formatMessage({ id: range.translationKey }) : range.key}
      </Range>
    ));
  };

  renderRangesDropdown = (ranges: DateRange[]): React.ReactNode => {
    if (!ranges || ranges.length === 0) return null;
    const { currentRange } = this.state;
    const { onChange, intl } = this.props;
    const containsCurrentRange = currentRange && !!find((range) => range.key === currentRange.key, ranges);
    const overlay = (
      <Menu
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        selectedKeys={currentRange ? [currentRange.key] : []}
        onClick={({ key }): void => onChange(find((range) => range.key === key, ranges))}
      >
        {ranges.map((range) => (
          <Menu.Item key={range.key || range.id}>
            {range.translationKey ? intl.formatMessage({ id: range.translationKey }) : range.key}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown overlay={overlay}>
        <Range
          type={containsCurrentRange ? 'primary' : undefined}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {currentRange &&
            intl.formatMessage({ id: containsCurrentRange ? currentRange.translationKey : 'SNRS.DATE.MORE' })}
          <Icon name="angle-down-s" style={{ margin: '-2px -8px -2px 0' }} />
        </Range>
      </Dropdown>
    );
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
    const { intl } = this.props;
    const { currentRange, currentGroup } = this.state;
    const { offset, duration } = currentRange;
    return (
      <CustomForm>
        <div>
          <Title>
            {intl.formatMessage({ id: currentGroup === GROUPS.PAST ? 'SNRS.DATE.LAST' : 'SNRS.DATE.NEXT' })}
          </Title>
          <InputSelectGroup>
            <InputNumber
              min={1}
              max={CONST.RELATIVE_DURATION_MAX}
              precision={0}
              step={1}
              value={duration.value}
              onBlur={({ target: { value } }): void => {
                !value && this.handleDurationValueChange(1);
              }}
              onChange={this.handleDurationValueChange}
            />
            <Select
              value={duration.type}
              onChange={(type): void => this.handleChange(setDurationType(type, currentRange))}
            >
              {CONST.RELATIVE_TYPES.map((type) => (
                <Select.Option key={type} value={type}>
                  {intl.formatMessage({ id: `SNRS.DATE.${type.toUpperCase()}` })}
                </Select.Option>
              ))}
            </Select>
          </InputSelectGroup>
        </div>
        <div>
          <Title>
            {intl.formatMessage({ id: currentGroup === GROUPS.PAST ? 'SNRS.DATE.BEFORE' : 'SNRS.DATE.AFTER' })}
          </Title>
          <InputSelectGroup>
            <InputNumber
              min={0}
              max={CONST.RELATIVE_OFFSET_MAX}
              precision={0}
              step={1}
              value={offset.value}
              onBlur={({ target: { value } }): void => {
                !value && this.handleOffsetValueChange(0);
              }}
              onChange={this.handleOffsetValueChange}
            />
            <Select value={offset.type} onChange={(type): void => this.handleChange(setOffsetType(type, currentRange))}>
              {CONST.RELATIVE_TYPES.map((type) => (
                <Select.Option key={type} value={type}>
                  {intl.formatMessage({ id: `SNRS.DATE.${type.toUpperCase()}` })}
                </Select.Option>
              ))}
            </Select>
          </InputSelectGroup>
        </div>
      </CustomForm>
    );
  };

  render(): React.ReactNode {
    const { intl } = this.props;
    const { groupedRanges, currentGroup, showCustomForm, future, past, currentRange } = this.state;
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
      <Container>
        <Header>
          <Title>{intl.formatMessage({ id: 'SNRS.DATE.RELATIVE_DATE_RANGE' })}</Title>
          <Help>{/* <Tooltip title={I18n.t('date.help')}>{I18n.t('date.help')}</Tooltip> */}</Help>
        </Header>
        <Ranges>
          {future && past && (
            <Range key="TOGGLE" onClick={this.handleTogglingPastRanges} style={{ width: 40 }}>
              <Icon
                name={currentGroup === GROUPS.PAST ? 'arrow-left-m' : 'arrow-right-m'}
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  margin: 'auto',
                  left: 0,
                  right: 0,
                }}
              />
            </Range>
          )}
          <Range
            key="CUSTOM"
            onClick={this.handleCustomClick}
            type={currentRange && !currentRange.key ? 'primary' : undefined}
          >
            {intl.formatMessage({ id: 'SNRS.DATE.CUSTOM' })}
          </Range>
          {this.renderRanges(ranges.visible)}
          {this.renderRangesDropdown(ranges.hidden)}
        </Ranges>
        {showCustomForm && currentRange && !isAbsolute(currentRange) && this.renderCustomRangeForm()}
      </Container>
    );
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
export default injectIntl(RelativeRangePicker);
