import React from 'react';
import PropTypes from 'prop-types';
import lensPath from 'ramda/src/lensPath';
import set from 'ramda/src/set';
import find from 'ramda/src/find';
import is from 'ramda/src/is';
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
import getValueForRelativeRange from "../dateUtils/getValueForRelativeRange";

const setOffsetType = set(lensPath(['offset', 'type']));
const setOffsetValue = (value, currentRange) =>
  set(lensPath(['offset', 'value']))(
    value === '' ? null : is(Number, value) && value >= 0 ? Math.round(value) : 0,
    currentRange
  );
const setDurationType = set(lensPath(['duration', 'type']));
const setDurationValue = (value, currentRange) =>
  set(lensPath(['duration', 'value']))(
    value === '' ? null : is(Number, value) && value >= 1 ? Math.round(value) : 1,
    currentRange
  );
const setFuture = set(lensPath(['future']));

const GROUPS = {
  PAST: 'PAST',
  FUTURE: 'FUTURE',
};

const getDefaultCustomRange = currentGroup => ({
  type: CONST.RELATIVE,
  from: null,
  to: null,
  future: currentGroup === GROUPS.FUTURE,
  offset: { type: 'DAYS', value: 0 },
  duration: { type: 'DAYS', value: 30 },
});

const isAbsolute = value => value.type === CONST.ABSOLUTE && !value.from && !value.to;

function getCurrentGroupFromProps({ future, past }) {
  if (future && past) {
    return GROUPS.PAST;
  } else if (!future && past) {
    return GROUPS.PAST;
  } else if (future && !past) {
    return GROUPS.FUTURE;
  } else {
    return null;
  }
}

class RelativeRangePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentGroup: getCurrentGroupFromProps(props),
      future: props.future,
      past: props.past,
      showCustomForm: true,
    };
  }

  static defaultProps = {
    ranges: CONST.RELATIVE_PRESETS,
    future: false,
    past: true,
  };

  static propTypes = {
    ranges: PropTypes.arrayOf(PropTypes.object).isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    future: PropTypes.bool.isRequired,
    past: PropTypes.bool.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { ranges, value, future, past } = nextProps;
    const state = {};
    const currentRange =
      value && (value.type === CONST.RELATIVE || isAbsolute(value)) ? getValueForRelativeRange(value) : ranges[0];
    state.currentRange = currentRange;
    state.groupedRanges = ranges.reduce(
      (acc, range) => {
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

  togglePastRanges = () => {
    const { onChange } = this.props;
    const { currentRange, currentGroup } = this.state;
    this.setState({ currentGroup: currentGroup === GROUPS.PAST ? GROUPS.FUTURE : GROUPS.PAST }, () => {
      if (currentRange) {
        onChange({ ...currentRange, key: undefined, future: this.state.currentGroup === GROUPS.FUTURE });
      }
    });
  };

  handleCustomClick = () => {
    const { onChange } = this.props;
    const { currentGroup } = this.state;
    const sourceRange = getDefaultCustomRange(currentGroup);
    onChange({ ...sourceRange, key: undefined });
  };

  handleChange = value => {
    const { currentGroup } = this.state;
    const { onChange } = this.props;
    onChange({ ...setFuture(currentGroup === GROUPS.FUTURE, value), key: undefined });
  };

  renderRanges = ranges => {
    if (!ranges || ranges.length === 0) return null;
    const { currentRange } = this.state;
    const { onChange, intl, value } = this.props;
    return ranges.map(range => (
      <Range
        key={range.key || range.id}
        onClick={() => {
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

  renderRangesDropdown = ranges => {
    if (!ranges || ranges.length === 0) return null;
    const { currentRange } = this.state;
    const { onChange, intl } = this.props;
    const containsCurrentRange = currentRange && !!find(range => range.key === currentRange.key, ranges);
    const overlay = (
      <Menu
        selectedKeys={currentRange ? [currentRange.key] : []}
        onClick={({ key }) => onChange(find(range => range.key === key, ranges))}
      >
        {ranges.map(range => (
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
          {intl.formatMessage({ id: containsCurrentRange ? currentRange.translationKey : 'SNRS.DATE.MORE' })}
          <Icon name="angle-down-s" style={{ margin: '-2px -8px -2px 0' }} />
        </Range>
      </Dropdown>
    );
  };

  onOffsetValueChange = value => this.handleChange(setOffsetValue(value, this.state.currentRange));

  onDurationValueChange = value => this.handleChange(setDurationValue(value, this.state.currentRange));

  renderCustomRangeForm = () => {
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
              onBlur={({ target: { value } }) => !value && this.onDurationValueChange(1)}
              onChange={this.onDurationValueChange}
            />
            <Select value={duration.type} onChange={type => this.handleChange(setDurationType(type, currentRange))}>
              {CONST.RELATIVE_TYPES.map(type => (
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
              onBlur={({ target: { value } }) => !value && this.onOffsetValueChange(0)}
              onChange={this.onOffsetValueChange}
            />
            <Select value={offset.type} onChange={type => this.handleChange(setOffsetType(type, currentRange))}>
              {CONST.RELATIVE_TYPES.map(type => (
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

  render() {
    const { intl } = this.props;
    const { groupedRanges, currentGroup, showCustomForm, future, past, currentRange } = this.state;
    if (!currentGroup) return null;
    const ranges = groupedRanges[currentGroup].reduce(
      (acc, range, index) => {
        acc[index > 2 ? 'hidden' : 'visible'].push(range);
        return acc;
      },
      { visible: [], hidden: [] }
    );
    return (
      <Container>
        <Header>
          <Title>{intl.formatMessage({ id: 'SNRS.DATE.RELATIVE_DATE_RANGE' })}</Title>
          <Help>{/* <Tooltip title={I18n.t('date.help')}>{I18n.t('date.help')}</Tooltip> */}</Help>
        </Header>
        <Ranges>
          {future && past && (
            <Range key="TOGGLE" onClick={this.togglePastRanges} style={{ width: 40 }}>
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
          <Range key="CUSTOM" onClick={this.handleCustomClick} type={!currentRange.key ? 'primary' : undefined}>
            {intl.formatMessage({ id: 'SNRS.DATE.CUSTOM' })}
          </Range>
          {this.renderRanges(ranges.visible)}
          {this.renderRangesDropdown(ranges.hidden)}
        </Ranges>
        {showCustomForm && !isAbsolute(currentRange) && this.renderCustomRangeForm()}
      </Container>
    );
  }
}

export default injectIntl(RelativeRangePicker);
