import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';

import TimeWindow from '../../TimeWindow/TimeWindow';
import InlineDropdown from '../../InlineCollapse/InlineCollapse';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import Collapse from "../../Collapse/Collapse";
import {
  Wrapper,
  DropdownLabel,
  DropdownHeader,
  DropdownDeleteBtn,
  AddContainer,
  AddButton,
  EditBtn,
} from './MonthlyFilter.styles';
import { MONTHLY_TYPES, MONTH_DAYS, PERIODS, PERIODS_TYPE, MAX_RULES_ALLOWED, defaultId } from '../constants';

class MonthlyFilter extends React.PureComponent {
  state = {
    visible: {
      [defaultId]: true,
    },
  };
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func,
  };

  componentDidMount() {
    this.props.value.length && this.handleCollapse(this.props.value[0].id);
  }

  setData = definition => this.props.onChange(definition);

  handleAddRow = () => {
    const id = Math.random();
    this.setData([
      ...this.props.value,
      { period: MONTHLY_TYPES.DAY_OF_MONTH, periodType: PERIODS_TYPE[0].value, definition: {}, id },
    ]);
    this.handleCollapse(id);
  };

  handleRemoveRow = (e, index) => {
    e.stopPropagation();
    const result = this.props.value.filter((item, key) => key !== index);
    this.handleRemoveRowCollapse(this.props.value[index].id);
    this.setData([...result]);
  };

  handleRemoveRowCollapse = deletedId => {
    const items = this.props.value;
    const itemKey = items.findIndex(item => item.id === deletedId);
    const next = items[itemKey + 1];
    const prev = items[itemKey - 1];
    this.state.visible[deletedId] && (next || prev) && this.handleCollapse(next ? next.id : prev.id);
  };

  handleTypeChange = (value, index) => {
    const data = [...this.props.value];
    data[index] = {
      ...data[index],
      period: value,
      definition: {},
    };
    this.setData(data);
  };

  handlePeriodTypeChange = (value, index) => {
    const data = [...this.props.value];
    data[index] = {
      ...data[index],
      periodType: value,
    };
    this.setData(data);
  };

  handleDefinitionChange = (definition, index) => {
    const data = [...this.props.value];
    data[index] = { ...data[index], definition };
    return this.setData(data);
  };

  dayWeekFormatter = (index, long) => {
    const { intl } = this.props;
    const weekStartIndex = Math.floor(index / 7);
    const dayOfWeek = index - weekStartIndex * 7;
    const weekday = intl.formatMessage({ id: `SNRS.DATE.WEEKDAYS_LONG.${dayOfWeek}` });
    const nthWeek = intl.formatMessage({
      id: `SNRS.NTH.${weekStartIndex === 5 ? 'LAST' : weekStartIndex + 1}`,
    });
    return long ? `${nthWeek} ${weekday}` : intl.formatMessage({ id: `SNRS.DATE.WEEKDAYS.${dayOfWeek}` });
  };

  dayMonthFormatter = (i, long) => {
    const locale = this.props.intl.locale.substring(0, 2);
    return long
      ? this.props.intl.formatMessage({ id: 'SNRS.DATE.NTH_DAY_OF_MONTH' }, { nth: MONTH_DAYS(locale)[i] })
      : MONTH_DAYS(locale)[i];
  };

  dayTemplate = index => {
    const weekStartIndex = Math.floor(index / 7);
    return { week: weekStartIndex, day: index - weekStartIndex * 7 };
  };

  getTimeWindowSettings = item => {
    const settings = {
      [MONTHLY_TYPES.DAY_OF_MONTH]: {
        numberOfDays: 31,
        reverseGroup: 1,
        inverted: item.periodType === 'ending',
        dayTemplate: dayOfMonth => ({ day: dayOfMonth }),
        dayFormatter: this.dayMonthFormatter,
      },
      [MONTHLY_TYPES.DAY_OF_WEEK]: {
        numberOfDays: 7 * 5,
        reverseGroup: 7,
        dayTemplate: this.dayTemplate,
        dayFormatter: this.dayWeekFormatter,
        labelInverted: item.periodType === 'ending',
        inverted: item.periodType === 'ending',
        rowLabelFormatter: rowIndex =>
          this.props.intl.formatMessage({
            id: `SNRS.NTH.${rowIndex === 0 && item.periodType === 'ending' ? 'LAST' : rowIndex + 1}`,
          }),
      },
    };
    return settings[item.period];
  };

  handleCollapse = id => {
    const visible = {};
    for (let i in this.state.visible) {
      visible[i.id] = !this.state.visible[i];
    }
    visible[id] = true;
    this.setState({
      visible,
    });
  };

  render() {
    return (
      <Fragment>
        {this.props.value.map((item, key) => (
          <Collapse
            hideArrow
            defaultCollapsed
            controlled
            collapsed={!this.state.visible[item.id]}
            onCollapseChange={() => this.handleCollapse(item.id)}
            key={item.id}
            header={
              <DropdownHeader className={this.state.visible[item.id] && 'dropdown-header-visible'}>
                <Fragment>
                  <DropdownLabel>
                    <b>
                      <FormattedMessage
                        id="SNRS.MONTHLY-PICKER.RULE"
                        values={{
                          value: key + 1,
                        }}
                      />
                    </b>{' '}
                    <FormattedMessage id="SNRS.MONTHLY-PICKER.DAYS-OF" />
                  </DropdownLabel>
                  <InlineDropdown
                    options={PERIODS}
                    onChange={({ value }) => this.handleTypeChange(value, key)}
                    value={item.period}
                  />
                  <DropdownLabel>
                    <FormattedMessage id="SNRS.MONTHLY-PICKER.COUNTED-FROM" />
                  </DropdownLabel>
                  <InlineDropdown
                    options={PERIODS_TYPE}
                    onChange={({ value }) => this.handlePeriodTypeChange(value, key)}
                    value={item.periodType}
                  />
                </Fragment>
                <EditBtn>
                  <Icon name="edit-s" size={25} />
                  <FormattedMessage id="SNRS.MANAGEABLE-LIST.EDIT" />
                </EditBtn>
                <Tooltip title={this.props.intl.formatMessage({ id: 'SNRS.MANAGEABLE-LIST.REMOVE' })}>
                  <DropdownDeleteBtn onClick={e => this.handleRemoveRow(e, key)}>
                    <Icon name="close-m" size={15} />
                  </DropdownDeleteBtn>
                </Tooltip>
              </DropdownHeader>
            }
          >
            <Wrapper>
              <TimeWindow
                key={`${item.period}_${key}`}
                showSelectAll
                invertibleTime
                numberOfDaysPerRow={7}
                days={item.definition}
                onChange={definition => this.handleDefinitionChange(definition, key)}
                timeMarks={{}}
                {...this.getTimeWindowSettings(item)}
              />
            </Wrapper>
          </Collapse>
        ))}
        <AddContainer>
          {this.props.value.length < MAX_RULES_ALLOWED && (
            <AddButton onClick={this.handleAddRow}>
              <Icon name="add-3-m" size={25} />
              <span>
                <FormattedMessage id="SNRS.MONTHLY-PICKER.ADD-RULE" />
              </span>
            </AddButton>
          )}
        </AddContainer>
      </Fragment>
    );
  }
}

export default injectIntl(MonthlyFilter);
