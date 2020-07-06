import * as React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { Days } from 'date.types';
import { TimeWindow } from '../../TimeWindow/TimeWindow';
import InlineDropdown from '../../InlineCollapse/InlineCollapse';
import Collapse from '../../Collapse/Collapse';
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
import { State, Props, Period } from './MonthlyFilter.types';

class MonthlyFilter extends React.PureComponent<Props, State> {
  state = {
    visible: {
      [defaultId]: true,
    },
  };

  componentDidMount(): void {
    const { value } = this.props;
    value.length && this.handleCollapse(value[0].id);
  }

  setData = (definition: Period[]): void => {
    const { onChange } = this.props;
    onChange(definition);
  };

  handleAddRow = (): void => {
    const id = Math.random();
    const { value } = this.props;
    this.setData([
      ...value,
      { period: MONTHLY_TYPES.DAY_OF_MONTH, periodType: PERIODS_TYPE[0].value, definition: {}, id },
    ]);
    this.handleCollapse(id);
  };

  handleRemoveRow = (e: React.MouseEvent<HTMLElement>, index: number): void => {
    e.stopPropagation();
    const { value } = this.props;
    const result = value.filter((item: Period, key: React.ReactText) => key !== index);
    this.handleRemoveRowCollapse(value[index].id);
    this.setData([...result]);
  };

  handleRemoveRowCollapse = (deletedId: React.ReactText): void => {
    const { value: items } = this.props;
    const { visible } = this.state;
    const itemKey = items.findIndex((item) => item.id === deletedId);
    const next = items[itemKey + 1];
    const prev = items[itemKey - 1];
    visible[deletedId] && (next || prev) && this.handleCollapse(next ? next.id : prev.id);
  };

  handleTypeChange = (newValue: string, index: React.ReactText): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = {
      ...data[index],
      period: newValue,
      definition: {},
    };
    this.setData(data);
  };

  handlePeriodTypeChange = (newValue: string, index: React.ReactText): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = {
      ...data[index],
      periodType: newValue,
    };
    this.setData(data);
  };

  handleDefinitionChange = (definition: Days, index: React.ReactText): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = { ...data[index], definition };
    return this.setData(data);
  };

  dayWeekFormatter = (index: number, long: boolean): string => {
    const { intl } = this.props;
    const weekStartIndex = Math.floor(index / 7);
    const dayOfWeek = index - weekStartIndex * 7;
    const weekday = intl.formatMessage({ id: `SNRS.DATE.WEEKDAYS_LONG.${dayOfWeek}` });
    const nthWeek = intl.formatMessage({
      id: `SNRS.NTH.${weekStartIndex === 5 ? 'LAST' : weekStartIndex + 1}`,
    });
    return long ? `${nthWeek} ${weekday}` : intl.formatMessage({ id: `SNRS.DATE.WEEKDAYS.${dayOfWeek}` });
  };

  dayMonthFormatter = (i: React.ReactText, long: boolean): string => {
    const { intl } = this.props;
    const locale = intl.locale.substring(0, 2);
    return long
      ? intl.formatMessage({ id: 'SNRS.DATE.NTH_DAY_OF_MONTH' }, { nth: MONTH_DAYS(locale)[i] })
      : MONTH_DAYS(locale)[i];
  };

  dayTemplate = (index: number): object => {
    const weekStartIndex = Math.floor(index / 7);
    return { week: weekStartIndex, day: index - weekStartIndex * 7 };
  };

  getTimeWindowSettings = (item: Period): object => {
    const { intl } = this.props;
    const settings = {
      [MONTHLY_TYPES.DAY_OF_MONTH]: {
        numberOfDays: 31,
        reverseGroup: 1,
        inverted: item.periodType === 'ending',
        dayTemplate: (dayOfMonth: number): { day: number } => ({ day: dayOfMonth }),
        dayFormatter: this.dayMonthFormatter,
      },
      [MONTHLY_TYPES.DAY_OF_WEEK]: {
        numberOfDays: 7 * 5,
        reverseGroup: 7,
        dayTemplate: this.dayTemplate,
        dayFormatter: this.dayWeekFormatter,
        labelInverted: item.periodType === 'ending',
        inverted: item.periodType === 'ending',
        rowLabelFormatter: (rowIndex: number): string =>
          intl.formatMessage({
            id: `SNRS.NTH.${rowIndex === 0 && item.periodType === 'ending' ? 'LAST' : rowIndex + 1}`,
          }),
      },
    };
    return settings[item.period];
  };

  handleCollapse = (id: React.ReactText): void => {
    const updatedVisible = {};
    const { visible } = this.state;
    const keys = Object.keys(visible);
    for (let i = 0; i < keys.length; i += 1) {
      updatedVisible[keys[i]] = !visible[keys[i]];
    }
    updatedVisible[id] = true;
    this.setState({
      visible: updatedVisible,
    });
  };

  render(): JSX.Element {
    const { value, intl } = this.props;
    const { visible } = this.state;
    return (
      <>
        {value.map(
          (item, key: number): React.ReactNode => (
            <Collapse
              hideArrow
              defaultCollapsed
              controlled
              collapsed={!visible[item.id]}
              onCollapseChange={(): void => this.handleCollapse(item.id)}
              key={item.id}
              header={
                <DropdownHeader className={String(visible[item.id]) && 'dropdown-header-visible'}>
                  <>
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
                      onChange={({ value: val }: { value: string }): void => this.handleTypeChange(val, key)}
                      value={item.period}
                    />
                    <DropdownLabel>
                      <FormattedMessage id="SNRS.MONTHLY-PICKER.COUNTED-FROM" />
                    </DropdownLabel>
                    <InlineDropdown
                      options={PERIODS_TYPE}
                      onChange={({ value: val }: { value: string }): void => this.handlePeriodTypeChange(val, key)}
                      value={item.periodType}
                    />
                  </>
                  <EditBtn>
                    <Icon name="edit-s" size={25} />
                    <FormattedMessage id="SNRS.MANAGEABLE-LIST.EDIT" />
                  </EditBtn>
                  <Tooltip title={intl.formatMessage({ id: 'SNRS.MANAGEABLE-LIST.REMOVE' })}>
                    <DropdownDeleteBtn onClick={(e): void => this.handleRemoveRow(e, key)}>
                      <Icon name="close-m" size={15} />
                    </DropdownDeleteBtn>
                  </Tooltip>
                </DropdownHeader>
              }
            >
              <Wrapper>
                <TimeWindow
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${item.period}_${key}`}
                  showSelectAll
                  invertibleTime
                  numberOfDaysPerRow={7}
                  days={item.definition}
                  onChange={(definition: Days): void => this.handleDefinitionChange(definition, key)}
                  timeMarks={{}}
                  {...this.getTimeWindowSettings(item)}
                />
              </Wrapper>
            </Collapse>
          )
        )}
        <AddContainer>
          {value.length < MAX_RULES_ALLOWED && (
            <AddButton onClick={this.handleAddRow}>
              <Icon name="add-3-m" size={25} />
              <span>
                <FormattedMessage id="SNRS.MONTHLY-PICKER.ADD-RULE" />
              </span>
            </AddButton>
          )}
        </AddContainer>
      </>
    );
  }
}

export default injectIntl(MonthlyFilter);
