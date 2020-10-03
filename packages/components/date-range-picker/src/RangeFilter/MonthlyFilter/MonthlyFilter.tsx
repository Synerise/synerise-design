import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { CloseM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import { Tag, TagShape } from '@synerise/ds-tags';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';
import { Month, MonthlyFilterProps } from './MonthlyFilter.types';
import { MONTHLY_TYPES, MONTH_DAYS, PERIODS, PERIODS_TYPE, MAX_RULES_ALLOWED, defaultId } from '../constants';
import * as S from './MonthlyFilter.styles';
import TimeWindow from '../TimeWindow/TimeWindow';

class MonthlyFilter extends React.PureComponent<MonthlyFilterProps> {
  state = {
    visible: {
      [defaultId]: true,
    },
  };

  componentDidMount(): void {
    const { value } = this.props;
    value.length && this.handleCollapse(value[0].id);
  }

  setData = (definition: string | object): void => {
    const { onChange } = this.props;
    return onChange(definition);
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

  handleRemoveRow = (e: Event, index: React.ReactText): void => {
    const { value } = this.props;
    e.stopPropagation();
    const result = value.filter((item, key) => key !== index);
    this.handleRemoveRowCollapse(value[index].id);
    this.setData([...result]);
  };

  handleRemoveRowCollapse = (deletedId: number): void => {
    const { value } = this.props;
    const { visible } = this.state;
    const itemKey = value.findIndex(item => item.id === deletedId);
    const next = value[itemKey + 1];
    const prev = value[itemKey - 1];
    visible[deletedId] && (next || prev) && this.handleCollapse(next ? next.id : prev.id);
  };

  handleTypeChange = (val: string, index: number): void => {
    const { value } = this.props;
    const data = [...value];

    data[index] = {
      ...data[index],
      period: val,
      definition: {},
    };
    this.setData(data);
  };

  handlePeriodTypeChange = (val: string, index: number): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = {
      ...data[index],
      periodType: val,
    };
    this.setData(data);
  };

  handleDefinitionChange = (definition: string, index: number): void => {
    const { value } = this.props;
    const data = [...value];
    data[index] = { ...data[index], definition };
    this.setData(data);
  };

  dayWeekFormatter = (index: number, long: boolean): string => {
    const { intl } = this.props;
    const weekStartIndex = Math.floor(index / 7);
    const dayOfWeek = index - weekStartIndex * 7;
    const weekday = intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.${dayOfWeek + 1}` });
    const nthWeek = intl.formatMessage({
      id: `DS.DATE-RANGE-PICKER.NTH.${weekStartIndex === 5 ? 'LAST' : weekStartIndex + 1}`,
    });
    return long
      ? `${nthWeek} ${weekday}`
      : intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayOfWeek}` });
  };

  dayMonthFormatter = (i: number, long: boolean): string => {
    const { intl } = this.props;

    const locale = intl.locale.substring(0, 2);
    return long
      ? intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.NTH_DAY_OF_MONTH' }, { nth: MONTH_DAYS(locale)[i] })
      : MONTH_DAYS(locale)[i];
  };

  dayTemplate = (index: number): { week: number; day: number } => {
    const weekStartIndex = Math.floor(index / 7);
    return { week: weekStartIndex, day: index - weekStartIndex * 7 };
  };

  getTimeWindowSettings = (item: Month) => {
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
            id: `DS.DATE-RANGE-PICKER.NTH.${rowIndex + 1}`,
          }),
      },
    };
    return settings[item.period];
  };

  handleCollapse = (id: React.ReactText) => {
    const { visible } = this.state;
    const updatedVisible = {};
    for (const i in visible) {
      updatedVisible[i] = false;
    }
    updatedVisible[id] = true;
    this.setState({
      visible: updatedVisible,
    });
  };

  render(): JSX.Element {
    const { value, intl } = this.props;
    const { visible } = this.state;
    const data = [...value];
    return (
      <S.MonthlyFilterWrapper>
        {data.map((item, key) => (
          <ContentItem
            onExpand={(id) => this.handleCollapse(id)}
            expanded={visible[item.id]}
            item={{
              tag: (
                <Tag
                  name={String(key + 1)}
                  shape={TagShape.SINGLE_CHARACTER_ROUND}
                  color={theme.palette['grey-100']}
                  textColor={theme.palette['grey-500']}
                />
              ),
              id: item.id,
              name: (
                <S.DropdownHeader className={visible[item.id] && 'dropdown-header-visible'}>
                  <S.DropdownLabel>
                    <FormattedMessage
                      id="DS.DATE-RANGE-PICKER.RULE"
                      values={{
                        value: key + 1,
                      }}
                    />{' '}
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.DAYS-OF" />
                  </S.DropdownLabel>
                  <S.Select
                    expanded={false}
                    placeholder={intl.formatMessage({ id: PERIODS[0].translationKey })}
                    input={{
                      name: 'period',
                      maxLength: 120,
                    }}
                    dataSource={PERIODS.map(i => ({
                      checked: data[key]?.period === i.value,
                      text: intl.formatMessage({ id: i.name as string }),
                      onSelect: (): void => {
                        this.handleTypeChange(i.value as string, key);
                      },
                    }))}
                    size="small"
                  />

                  <S.DropdownLabel>
                    <FormattedMessage id="DS.DATE-RANGE-PICKER.COUNTED-FROM" />
                  </S.DropdownLabel>
                  <S.Select
                    expanded={false}
                    placeholder={intl.formatMessage({ id: PERIODS_TYPE[0].translationKey })}
                    input={{
                      name: 'period-type',
                      maxLength: 120,
                    }}
                    dataSource={PERIODS_TYPE.map(i => ({
                      checked: data[key]?.periodType === i.value,

                      text: intl.formatMessage({ id: i.translationKey as string }),
                      onSelect: (): void => {
                        this.handlePeriodTypeChange(i.value as string, key);
                      },
                    }))}
                    size="small"
                  />
                </S.DropdownHeader>
              ),
              content: visible[item.id] ? (
                <S.ContentWrapper>
                  <TimeWindow
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item.period}_${key}`}
                    showSelectAll
                    invertibleTime
                    numberOfDaysPerRow={7}
                    days={item.definition}
                    onChange={(definition): void => this.handleDefinitionChange(definition, key)}
                    timeMarks={{}}
                    {...this.getTimeWindowSettings(item)}
                  />
                </S.ContentWrapper>
              ) : null,
            }}
            headerSuffix={
              <Tooltip title={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.REMOVE' })}>
                <S.DropdownDeleteBtn onClick={e => this.handleRemoveRow(e, key)}>
                  <Icon component={<CloseM />} size={15} />
                </S.DropdownDeleteBtn>
              </Tooltip>
            }
            texts={{}}
          />
        ))}
        <S.AddContainer>
          {value.length < MAX_RULES_ALLOWED && (
            <Button.Creator
              label={<FormattedMessage id="DS.DATE-RANGE-PICKER.ADD-RULE" />}
              onClick={this.handleAddRow}
              block
            />
          )}
        </S.AddContainer>
      </S.MonthlyFilterWrapper>
    );
  }
}

export default injectIntl(MonthlyFilter);
